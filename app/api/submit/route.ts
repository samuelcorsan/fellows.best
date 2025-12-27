import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { MongoClient, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const suggestionsCollectionName = "suggestions";

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

async function getSuggestionsCollection() {
  const client = await getClient();
  const db = dbName ? client.db(dbName) : client.db();
  return db.collection<Document>(suggestionsCollectionName);
}

export async function POST(request: NextRequest) {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const body = await request.json();

    const { type } = body as { type?: string };

    const collection = await getSuggestionsCollection();

    if (type === "url") {
      const { url } = body as { url?: string };
      if (!url || typeof url !== "string") {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
      }

      await collection.insertOne({
        type: "url",
        url: url.trim(),
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json({ ok: true });
    }

    const {
      name,
      organizer,
      description,
      fullDescription,
      openDate,
      closeDate,
      category,
      region,
      eligibility,
      applyLink,
      tags,
      benefits,
    } = body as Record<string, unknown>;

    if (
      !name ||
      !organizer ||
      !description ||
      !fullDescription ||
      !openDate ||
      !closeDate ||
      !category ||
      !region ||
      !eligibility ||
      !applyLink
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await collection.insertOne({
      type: "full",
      name: String(name).trim(),
      organizer: String(organizer).trim(),
      description: String(description).trim(),
      fullDescription: String(fullDescription).trim(),
      openDate: String(openDate),
      closeDate: String(closeDate),
      category: String(category),
      region: String(region),
      eligibility: String(eligibility).trim(),
      applyLink: String(applyLink).trim(),
      tags: Array.isArray(tags) ? tags.map(String) : [],
      benefits: Array.isArray(benefits) ? benefits.map(String).filter(Boolean) : [],
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in /api/submit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
