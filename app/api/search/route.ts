import {
  MongoClient,
  ObjectId,
  ServerApiVersion,
  type Document,
  type MongoClientOptions,
} from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { checkBotId } from "botid/server";
import type { Opportunity } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 10;

const SEARCH_MODE = process.env.NEXT_PUBLIC_SEARCH_MODE || "ai";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION!;

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(uri!);
    clientPromise = client.connect();
  }
  return clientPromise;
}

async function getCollection() {
  const client = await getClient();
  const db = dbName ? client.db(dbName) : client.db();
  return db.collection<Document>(collectionName);
}

function normalizeDate(
  value: unknown
): Opportunity["closeDate"] | Opportunity["openDate"] {
  if (value === undefined || value === null) return null;
  if (value === "closed") return "closed";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function mapOpportunity(doc: Document): Opportunity {
  const {
    _id,
    id,
    name = "",
    logoUrl = "",
    shareImageUrl,
    description = "",
    fullDescription = "",
    openDate,
    closeDate,
    tags = [],
    category = "fellowship",
    region = "",
    country = null,
    eligibility = "",
    applyLink = "",
    benefits = [],
    organizer = "",
    duration,
    funding,
    applicationVideo,
    ...rest
  } = doc as Record<string, unknown>;

  return {
    id: typeof id === "string" && id.length > 0 ? id : _id?.toString() || "",
    name: String(name),
    logoUrl: String(logoUrl),
    shareImageUrl: shareImageUrl ? String(shareImageUrl) : undefined,
    description: String(description),
    fullDescription: String(fullDescription || description),
    openDate: normalizeDate(openDate),
    closeDate: normalizeDate(closeDate),
    tags: Array.isArray(tags) ? (tags as string[]) : [],
    category: category as Opportunity["category"],
    region: String(region),
    country: country ? String(country) : null,
    eligibility: String(eligibility),
    applyLink: String(applyLink),
    benefits: Array.isArray(benefits) ? (benefits as string[]) : [],
    organizer: String(organizer),
    duration: duration as Opportunity["duration"],
    funding: funding as Opportunity["funding"],
    applicationVideo: applicationVideo ? String(applicationVideo) : undefined,
    ...rest,
  };
}

export async function GET(request: NextRequest) {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const collection = await getCollection();

    // Use MongoDB $text operator for text search
    const documents = await collection
      .find(
        { $text: { $search: query.trim() } },
        { projection: { score: { $meta: "textScore" } } }
      )
      .sort({ score: { $meta: "textScore" }, closeDate: 1 })
      .toArray();

    const opportunities = documents.map(mapOpportunity);

    return NextResponse.json(opportunities, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error searching opportunities:", error);

    // If text index doesn't exist, return helpful error
    if (error instanceof Error && error.message.includes("text index")) {
      return NextResponse.json(
        {
          error: "Text search index not found",
          details:
            "Please run the setup script to create the text index: npm run setup:text-index",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to search opportunities" },
      { status: 500 }
    );
  }
}
