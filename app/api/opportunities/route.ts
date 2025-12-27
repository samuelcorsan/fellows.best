import {
  MongoClient,
  ObjectId,
  type Document,
} from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import type { Opportunity } from "@/lib/data";

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
    applicationVideo: applicationVideo
      ? String(applicationVideo)
      : undefined,
    ...rest,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const collection = await getCollection();

    if (id) {
      const filters: Document[] = [{ id }];
      if (ObjectId.isValid(id)) {
        filters.push({ _id: new ObjectId(id) });
      }

      const document = await collection.findOne({ $or: filters });
      if (!document) {
        return NextResponse.json(
          { error: "Opportunity not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(mapOpportunity(document), {
        status: 200,
      });
    }

    const documents = await collection
      .find({})
      .sort({ closeDate: 1 })
      .toArray();

    const opportunities = documents.map(mapOpportunity);

      return NextResponse.json(opportunities, {
        status: 200,
      });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch opportunities", details: errorMessage },
      { status: 500 }
    );
  }
}
