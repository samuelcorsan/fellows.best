import { MongoClient, type Document } from "mongodb";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

if (!uri) {
  console.error("❌ MONGODB_URI environment variable is not set");
  process.exit(1);
}

if (!collectionName) {
  console.error("❌ MONGODB_COLLECTION environment variable is not set");
  process.exit(1);
}

async function setupTextIndex() {
  let client: MongoClient | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = new MongoClient(uri!);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = dbName ? client.db(dbName) : client.db();
    const collection = db.collection<Document>(collectionName!);

    console.log(`📋 Setting up text index on collection: ${collectionName}`);

    // Check if text index already exists
    const indexes = await collection.indexes();
    const textIndexExists = indexes.some(
      (index) =>
        index.key && typeof index.key === "object" && "$**" in index.key
    );

    if (textIndexExists) {
      console.log("ℹ️  Text index already exists. Dropping existing index...");
      try {
        await collection.dropIndex("$**_text");
      } catch (error) {
        // Index might have a different name, try to drop all text indexes
        const textIndexes = indexes.filter(
          (index) =>
            index.key &&
            typeof index.key === "object" &&
            Object.keys(index.key).some((key) => key.includes("text"))
        );
        for (const index of textIndexes) {
          if (index.name) {
            try {
              await collection.dropIndex(index.name);
            } catch (e) {
              // Ignore errors when dropping indexes
            }
          }
        }
      }
    }

    // Create compound text index on all searchable fields
    console.log("🔨 Creating text index on searchable fields...");
    await collection.createIndex(
      {
        name: "text",
        description: "text",
        fullDescription: "text",
        tags: "text",
        category: "text",
        region: "text",
        organizer: "text",
        eligibility: "text",
        benefits: "text",
      },
      {
        name: "search_text_index",
        default_language: "english",
      }
    );

    console.log("✅ Text index created successfully!");
    console.log("\n📝 Index details:");
    console.log(
      "   - Fields: name, description, fullDescription, tags, category, region, organizer, eligibility, benefits"
    );
    console.log("   - Language: english");
    console.log("   - Name: search_text_index");
    console.log(
      "\n✨ You can now use MongoDB $text search in your application!"
    );
  } catch (error) {
    console.error("❌ Error setting up text index:", error);
    if (error instanceof Error) {
      console.error("   Details:", error.message);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("\n🔌 Disconnected from MongoDB");
    }
  }
}

setupTextIndex();
