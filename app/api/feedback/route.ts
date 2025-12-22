import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { MongoClient, type Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

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
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, section, opportunity_id, issues, suggestion } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.trim().length > 2000) {
      return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
    }

    // If opportunity_id is provided, section should be 'opportunity'
    const finalSection = opportunity_id ? "opportunity" : (section || "general");

    // Get user info from PostgreSQL (better-auth uses PostgreSQL)
    const pgClient = await pool.connect();
    let userInfo;
    try {
      const userResult = await pgClient.query(
        'SELECT id, name, email, image FROM "user" WHERE id = $1',
        [session.user.id]
      );
      userInfo = userResult.rows[0];
    } finally {
      pgClient.release();
    }

    // Store feedback in MongoDB with user info denormalized
    const collection = await getFeedbackCollection();
    const now = new Date();
    const result = await collection.insertOne({
      userId: session.user.id,
      message: message.trim(),
      section: finalSection,
      opportunityId: opportunity_id || null,
      // Structured feedback for opportunities
      issues: Array.isArray(issues) ? issues : null,
      suggestion: suggestion && typeof suggestion === "string" ? suggestion.trim() : null,
      user: {
        id: userInfo?.id || session.user.id,
        name: userInfo?.name || session.user.name || null,
        email: userInfo?.email || session.user.email || null,
        image: userInfo?.image || session.user.image || null,
      },
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