import { NextResponse } from "next/server";
import {
  MongoClient,
  ObjectId,
  type Document,
  type WithId,
  type Collection,
} from "mongodb";
import type { Opportunity } from "@/lib/data";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName =
  process.env.MONGODB_COLLECTION!;

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

const clientPromise =
  globalWithMongo._mongoClientPromise ??
  new MongoClient(uri).connect();

if (process.env.NODE_ENV === "development") {
  globalWithMongo._mongoClientPromise = clientPromise;
}

type OpportunityDocument = WithId<Opportunity & Document>;

async function getCollection(): Promise<Collection<Document>> {
  const client = await clientPromise;
  const db = dbName ? client.db(dbName) : client.db();
  return db.collection(collectionName);
}

function normalizeDate(
  value: unknown
): Opportunity["closeDate"] | Opportunity["openDate"] {
  if (value === undefined || value === null) return null;
  if (value === "closed") return "closed";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function mapOpportunity(doc: OpportunityDocument): Opportunity {
  const { _id, ...rest } = doc;

  return {
    ...rest,
    id: rest.id || (_id ? _id.toString() : ""),
    openDate: normalizeDate(rest.openDate),
    closeDate: normalizeDate(rest.closeDate),
  };
}

export async function getAllOpportunities(): Promise<Opportunity[]> {
  const collection = await getCollection();

  const documents = await collection
    .find({})
    .sort({ closeDate: 1 })
    .toArray();

  return documents.map((doc) => mapOpportunity(doc as OpportunityDocument));
}

export async function getActiveOpportunities(): Promise<Opportunity[]> {
  const opportunities = await getAllOpportunities();
  return opportunities.filter((opportunity) => opportunity.closeDate !== "closed");
}

export async function getOpportunityById(
  id: string
): Promise<Opportunity | undefined> {
  const collection = await getCollection();

  const filters: Record<string, unknown>[] = [{ id }];

  if (ObjectId.isValid(id)) {
    filters.push({ _id: new ObjectId(id) });
  }

  const document = await collection.findOne({ $or: filters });
  return document ? mapOpportunity(document as OpportunityDocument) : undefined;
}

export async function GET() {
  try {
    const opportunities = await getAllOpportunities();

    return NextResponse.json(opportunities, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
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
