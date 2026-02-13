import { NextRequest, NextResponse } from "next/server";
import FirecrawlApp from "@mendable/firecrawl-js";
import OpenAI from "openai";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

const LLM_MODEL = "kimi-k2-thinking-turbo";
const GROQ_FALLBACK_MODEL = "moonshotai/kimi-k2-instruct-0905";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const openai = new OpenAI({
  baseURL: "https://internal.llmapi.ai/v1",
  apiKey: process.env.LLM_API_KEY,
});

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // 1. Search with Firecrawl
    const searchResponse = await firecrawl.search(query, {
      limit: 1,
      scrapeOptions: {
        formats: ["markdown"],
      },
    });

    if (!searchResponse.web || searchResponse.web.length === 0) {
      return NextResponse.json({ error: "No results found" }, { status: 404 });
    }

    const firstResult = searchResponse.web[0];
    // @ts-ignore - The types say SearchResultWeb | Document, and we know it should have markdown due to scrapeOptions
    const markdown = firstResult.markdown;

    if (!markdown) {
       return NextResponse.json({ error: "Failed to scrape content" }, { status: 500 });
    }

    const chatParams = {
      messages: [
        {
          role: "system" as const,
          content: `You are an assistant that extracts opportunity details from markdown content into a specific JSON format.
          
          Extract the following fields:
          - name: string (Name of the opportunity)
          - organizer: string (Organization name)
          - description: string (Short description, 1-2 sentences)
          - fullDescription: string (Detailed description)
          - openDate: string (YYYY-MM-DD format, or empty if unknown)
          - closeDate: string (YYYY-MM-DD format, or empty if unknown)
          - category: string (Must be one of: "fellowship", "accelerator", "incubator", "venture_capital", "grant", "residency", "competition", "research", "developer_program". Default to "fellowship" if unsure)
          - region: string (e.g., "Global", "US", "Europe")
          - country: string (Specific country if applicable, or same as region)
          - eligibility: string (Who can apply?)
          - applyLink: string (URL to apply, try to find the direct application link or the main page url if not found)
          - tags: string[] (Array of keywords)
          - benefits: string[] (List of benefits)

          Do NOT include 'logo' or 'share_url'.
          Return ONLY the JSON object. No markdown formatting.
          `
        },
        {
          role: "user" as const,
          content: `Extract opportunity details from this markdown:\n\n${markdown}`
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" as const }
    };

    let completion;
    try {
      completion = await openai.chat.completions.create({
        ...chatParams,
        model: LLM_MODEL,
      });
    } catch (llmError) {
      if (process.env.GROQ_API_KEY) {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        completion = await groq.chat.completions.create({
          ...chatParams,
          model: GROQ_FALLBACK_MODEL,
        });
      } else {
        throw llmError;
      }
    }

    const jsonContent = completion.choices[0]?.message?.content;

    if (!jsonContent) {
      throw new Error("Failed to generate JSON from LLM");
    }

    const data = JSON.parse(jsonContent);

    return NextResponse.json({ data });

  } catch (error) {
    console.error("Search/Scrape error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

