import { Groq } from "groq-sdk";
import { mockOpportunities } from "@/lib/data";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Optimize data sent to AI by only including necessary fields
const opportunitiesForAI = mockOpportunities.map((opp) => ({
  id: opp.id,
  name: opp.name,
  description: opp.description,
  category: opp.category,
  eligibility: opp.eligibility,
}));

const SYSTEM_PROMPT = `You are a fellowship matching assistant. Your primary goal is to find the most relevant opportunities based on the user's location, background, and interests. Analyze the user's situation and return a JSON response matching this EXACT format:

{
  "recommendations": [
    {
      "id": "exact-id-from-opportunities",
      "matchScore": number between 0-100,
      "reason": "One sentence explaining why this is a good match"
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Response MUST be valid JSON
2. ONLY use fellowship IDs from the provided opportunities
3. matchScore must be number 0-100
4. Include max 3 best matches (score > 70)
5. Sort by matchScore descending
6. NO additional text or explanation outside JSON
7. NO markdown or formatting
8. If no good matches found, return empty recommendations array

MATCHING PRIORITIES (in order):
1. Location Match: Strongly prioritize opportunities in the user's mentioned location/region
   - If user mentions a city/region, prioritize opportunities there
   - Only suggest international opportunities if explicitly relevant to user's goals
   - Reduce match score by 30-50 points for location mismatches

2. Eligibility Match:
   - Ensure user meets basic eligibility criteria mentioned
   - If eligibility unclear, prioritize more inclusive opportunities
   - Reduce match score if eligibility requirements might not be met

3. Interest/Background Match:
   - Match opportunity category with user's mentioned interests/background
   - Consider the opportunity description and how it aligns with user's goals
   - Reduce match score for weak interest alignment

4. General Guidelines:
   - Be conservative with match scores - only give high scores (>85) for very strong matches
   - Include specific reasons why each match is relevant to the user's situation
   - If user provides limited information, focus on matching what is known
   - Better to return fewer, more relevant matches than many weak matches`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            SYSTEM_PROMPT +
            `\n\nAvailable opportunities: ${JSON.stringify(opportunitiesForAI)}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
      max_tokens: 1024,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    try {
      const parsedResponse = JSON.parse(aiResponse);

      if (!Array.isArray(parsedResponse.recommendations)) {
        throw new Error("Invalid response structure");
      }

      const recommendationsWithDetails = parsedResponse.recommendations
        .filter((rec: any) => {
          if (!rec.id || typeof rec.matchScore !== "number" || !rec.reason) {
            return false;
          }
          const fellowship = mockOpportunities.find((opp) => opp.id === rec.id);
          return fellowship !== undefined;
        })
        .map((rec: any) => ({
          ...rec,
          ...mockOpportunities.find((opp) => opp.id === rec.id),
        }))
        .sort((a: any, b: any) => b.matchScore - a.matchScore)
        .slice(0, 3);

      // Add caching headers to prevent unnecessary revalidation
      return new NextResponse(
        JSON.stringify({ recommendations: recommendationsWithDetails }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.error("Raw AI response:", aiResponse);
      return NextResponse.json(
        { error: "Failed to parse AI recommendations" },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in AI matching:", error);
    return NextResponse.json(
      { error: "Failed to process AI matching request" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
