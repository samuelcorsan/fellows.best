import { Groq } from "groq-sdk";
import { mockOpportunities, SYSTEM_PROMPT } from "@/lib/data";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { kv } from "@vercel/kv";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const opportunitiesForAI = mockOpportunities.map((opp) => ({
  id: opp.id,
  name: opp.name,
  description: opp.description,
  category: opp.category,
  eligibility: opp.eligibility,
}));

const RATE_LIMIT = 10;
const WINDOW_SIZE = 60 * 1000;

async function isRateLimited(userId: string): Promise<boolean> {
  const now = Date.now();
  const key = `rate_limit:${userId}`;

  const current = await kv.get<{ count: number; timestamp: number }>(key);

  if (!current || now - current.timestamp > WINDOW_SIZE) {
    await kv.set(key, { count: 1, timestamp: now }, { ex: 60 });
    return false;
  }

  if (current.count >= RATE_LIMIT) {
    return true;
  }

  await kv.set(
    key,
    { count: current.count + 1, timestamp: current.timestamp },
    { ex: 60 }
  );
  return false;
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isLimited = await isRateLimited(session.user.id);
    if (isLimited) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

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
