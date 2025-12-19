import { MongoClient, type Db, type Document, type Collection } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const defaultCollection = process.env.MONGODB_COLLECTION || "opportunities";

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = globalThis as GlobalWithMongo;
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return dbName ? client.db(dbName) : client.db();
}

export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const db = await getDatabase();
  return db.collection<T>(name);
}

export async function getOpportunitiesCollection(): Promise<Collection<Document>> {
  return getCollection<Document>(defaultCollection);
}
