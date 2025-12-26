import { MongoClient, type Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const feedbackCollectionName = "feedback";

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

async function getFeedbackCollection() {
  const client = await getClient();
  const db = dbName ? client.db(dbName) : client.db();
  return db.collection<Document>(feedbackCollectionName);
}

export async function POST(request: NextRequest) {
  try {
    const { message, section, opportunity_id, issues, suggestion } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.trim().length > 2000) {
      return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
    }

    // If opportunity_id is provided, section should be 'opportunity'
    const finalSection = opportunity_id ? "opportunity" : (section || "general");

    // Store feedback in MongoDB without user info (auth removed)
    const collection = await getFeedbackCollection();
    const now = new Date();
    const result = await collection.insertOne({
      userId: null,
      message: message.trim(),
      section: finalSection,
      opportunityId: opportunity_id || null,
      // Structured feedback for opportunities
      issues: Array.isArray(issues) ? issues : null,
      suggestion: suggestion && typeof suggestion === "string" ? suggestion.trim() : null,
      user: null,
      createdAt: now,
    });

    return NextResponse.json({ 
      success: true,
      feedback: {
        id: result.insertedId.toString(),
        created_at: now,
      }
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}