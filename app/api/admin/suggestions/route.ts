import { MongoClient, ObjectId, type Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending";

    const collection = await getSuggestionsCollection();
    const documents = await collection
      .find({ status })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      suggestions: documents.map((doc) => ({
        id: doc._id.toString(),
        type: doc.type,
        url: doc.url || null,
        name: doc.name || null,
        organizer: doc.organizer || null,
        description: doc.description || null,
        full_description: doc.fullDescription || null,
        open_date: doc.openDate || null,
        close_date: doc.closeDate || null,
        category: doc.category || null,
        region: doc.region || null,
        eligibility: doc.eligibility || null,
        apply_link: doc.applyLink || null,
        tags: doc.tags || [],
        benefits: doc.benefits || [],
        status: doc.status,
        created_at: doc.createdAt,
        updated_at: doc.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'accepted' or 'rejected'" },
        { status: 400 }
      );
    }

    const collection = await getSuggestionsCollection();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating suggestion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const collection = await getSuggestionsCollection();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

