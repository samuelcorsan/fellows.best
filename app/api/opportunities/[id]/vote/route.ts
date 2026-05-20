import { NextResponse, type NextRequest } from "next/server";
import { MongoClient, ObjectId, type Document } from "mongodb";

export const runtime = "nodejs";
export const maxDuration = 10;

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

function buildFilter(id: string): Document {
  const filters: Document[] = [{ id }];
  if (ObjectId.isValid(id)) filters.push({ _id: new ObjectId(id) });
  return { $or: filters };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as {
      voterId?: string;
      action?: "up" | "down";
    };

    const voterId = String(body.voterId || "").trim();
    if (!voterId || voterId.length > 128) {
      return NextResponse.json({ error: "Invalid voter id" }, { status: 400 });
    }

    const action = body.action === "down" ? "down" : "up";
    const collection = await getCollection();
    const filter = buildFilter(id);

    const update: Document =
      action === "up"
        ? { $addToSet: { voters: voterId } }
        : { $pull: { voters: voterId } };

    const result = await collection.findOneAndUpdate(filter, update, {
      returnDocument: "after",
      projection: { voters: 1, votes: 1 },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }

    const voters = Array.isArray(result.voters)
      ? (result.voters as string[])
      : [];
    const votes = voters.length;

    return NextResponse.json({
      votes,
      voted: voters.includes(voterId),
    });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
