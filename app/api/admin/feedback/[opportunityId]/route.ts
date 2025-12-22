import { auth } from "@/lib/auth";
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

type RouteParams = {
  params: Promise<{ opportunityId: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { opportunityId } = await params;

    const collection = await getFeedbackCollection();
    const documents = await collection
      .find({ opportunityId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      feedback: documents.map((doc) => ({
        id: doc._id.toString(),
        message: doc.message,
        section: doc.section,
        opportunity_id: doc.opportunityId,
        issues: doc.issues || null,
        suggestion: doc.suggestion || null,
        created_at: doc.createdAt,
        user: doc.user || {
          id: doc.userId,
          name: null,
          email: null,
          image: null,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

