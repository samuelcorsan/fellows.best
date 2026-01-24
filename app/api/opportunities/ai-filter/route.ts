import { NextResponse, type NextRequest } from "next/server";
import Groq from "groq-sdk";
import type { Opportunity } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 15;

const SEARCH_MODE = process.env.NEXT_PUBLIC_SEARCH_MODE || "ai";

const MAX_REQUEST_SIZE = 2 * 1024 * 1024;
const GROQ_API_TIMEOUT = 8500;
const MAX_OPPORTUNITIES = 1000;

const TRUNCATE_LIMITS = {
  DESCRIPTION: 300,
  ELIGIBILITY: 200,
  BENEFIT: 100,
  MAX_BENEFITS: 5,
} as const;

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is not set");
}

function createTimeoutPromise(timeoutMs: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

export async function POST(request: NextRequest) {
  try {
    // If search mode is text, return error indicating text search should be used
    if (SEARCH_MODE === "text") {
      return NextResponse.json(
        {
          error:
            "AI search is disabled. Please use /api/search endpoint for text-based search.",
          mode: "text",
        },
        { status: 400 }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: "Request payload too large" },
        { status: 413 }
      );
    }

    const { query, opportunities } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query too long (max 500 characters)" },
        { status: 400 }
      );
    }

    if (!Array.isArray(opportunities)) {
      return NextResponse.json(
        { error: "Opportunities array is required" },
        { status: 400 }
      );
    }

    if (opportunities.length > MAX_OPPORTUNITIES) {
      return NextResponse.json(
        { error: `Too many opportunities (max ${MAX_OPPORTUNITIES})` },
        { status: 400 }
      );
    }

    if (opportunities.length === 0) {
      return NextResponse.json([]);
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const opportunitiesSummary = (opportunities as Opportunity[]).map((opp) => {
      const summary: {
        id: string;
        name: string;
        description: string;
        category: string;
        region: string;
        tags: string[];
        organizer: string;
        eligibility?: string;
        benefits?: string[];
        funding?: { amount: number; type: string };
        duration?: string;
      } = {
        id: opp.id,
        name: opp.name,
        description: opp.description.substring(0, TRUNCATE_LIMITS.DESCRIPTION),
        category: opp.category,
        region: opp.region,
        tags: opp.tags,
        organizer: opp.organizer,
      };

      if (opp.eligibility) {
        summary.eligibility = opp.eligibility.substring(
          0,
          TRUNCATE_LIMITS.ELIGIBILITY
        );
      }

      if (opp.benefits && opp.benefits.length > 0) {
        summary.benefits = opp.benefits
          .slice(0, TRUNCATE_LIMITS.MAX_BENEFITS)
          .map((b) => b.substring(0, TRUNCATE_LIMITS.BENEFIT));
      }

      if (opp.funding) {
        summary.funding = {
          amount: opp.funding.amount,
          type: opp.funding.fundingType,
        };
      }

      if (opp.duration) {
        summary.duration = `${opp.duration.value} ${opp.duration.unit}`;
      }

      return summary;
    });

    const groqPromise = groq.chat.completions.create({
      model: "moonshotai/kimi-k2-instruct-0905",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that filters opportunities based on user queries. Analyze the user's search query and return the IDs of opportunities that match their criteria. Consider all aspects: name, description, category, region, tags, organizer, eligibility, benefits, funding, and duration.",
        },
        {
          role: "user",
          content: `User query: "${query}"

Available opportunities:
${JSON.stringify(opportunitiesSummary)}

Return the IDs of opportunities that match the user's query. Be inclusive and match opportunities that are relevant to what the user is looking for.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "filtered_opportunities",
          schema: {
            type: "object",
            properties: {
              opportunity_ids: {
                type: "array",
                items: { type: "string" },
                description:
                  "Array of opportunity IDs that match the user's query",
              },
            },
            required: ["opportunity_ids"],
            additionalProperties: false,
          },
        },
      },
    });

    const response = await Promise.race([
      groqPromise,
      createTimeoutPromise(GROQ_API_TIMEOUT),
    ]);

    const result = JSON.parse(
      response.choices[0].message.content || '{"opportunity_ids": []}'
    );

    const filteredIds = new Set(result.opportunity_ids || []);
    const filteredOpportunities = (opportunities as Opportunity[]).filter(
      (opp) => filteredIds.has(opp.id)
    );

    return NextResponse.json(filteredOpportunities, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error filtering opportunities with AI:", error);
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
