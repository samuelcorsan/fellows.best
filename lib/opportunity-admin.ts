import {
  MongoClient,
  ObjectId,
  ServerApiVersion,
  type Document,
  type MongoClientOptions,
} from "mongodb";
import type { Opportunity } from "./data";

export type AdminOpportunity = Opportunity & {
  mongoId?: string;
  createdAt?: string;
  updatedAt?: string;
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

if (!collectionName) {
  throw new Error("MONGODB_COLLECTION is not set");
}

let clientPromise: Promise<MongoClient> | null = null;

function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(uri!);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getOpportunitiesCollection() {
  const client = await getClient();
  const db = dbName ? client.db(dbName) : client.db();
  return db.collection<Document>(collectionName!);
}

function normalizeDate(
  value: unknown
): Opportunity["closeDate"] | Opportunity["openDate"] {
  if (value === undefined || value === null) return null;
  if (value === "closed") return "closed";
  if (value instanceof Date) return value.toISOString();
  const strValue = String(value).trim();
  return strValue.length > 0 ? strValue : null;
}

function parseStringArray(
  value: unknown,
  separator: "," | "\n" = ","
): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const chosenSeparator = value.includes("\n") ? "\n" : separator;
    return value
      .split(chosenSeparator)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeOpportunityPayload(
  raw: Record<string, unknown>
): Omit<Opportunity, "id" | "logoUrl"> & { shareImageUrl?: string } {
  const name = String(raw.name ?? "").trim();
  const description = String(raw.description ?? "").trim();
  const fullDescription = String(
    raw.fullDescription ?? raw.description ?? ""
  ).trim();
  const organizer = String(raw.organizer ?? "").trim();
  const category = String(raw.category ?? "").trim() as Opportunity["category"];
  const region = String(raw.region ?? "").trim();
  const eligibility = String(raw.eligibility ?? "").trim();
  const applyLink = String(raw.applyLink ?? "").trim();
  const countryValue = raw.country ?? null;
  const applicationVideo = raw.applicationVideo
    ? String(raw.applicationVideo)
    : undefined;

  const missingFields = [
    { key: "name", value: name },
    { key: "description", value: description },
    { key: "fullDescription", value: fullDescription },
    { key: "organizer", value: organizer },
    { key: "category", value: category },
    { key: "region", value: region },
    { key: "eligibility", value: eligibility },
    { key: "applyLink", value: applyLink },
  ]
    .filter((field) => !field.value)
    .map((field) => field.key);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  return {
    name,
    description,
    fullDescription,
    organizer,
    category,
    region,
    eligibility,
    applyLink,
    openDate: normalizeDate(raw.openDate),
    closeDate: normalizeDate(raw.closeDate),
    tags: parseStringArray(raw.tags),
    benefits: parseStringArray(raw.benefits, "\n"),
    country:
      countryValue === null || countryValue === undefined
        ? null
        : String(countryValue),
    duration: raw.duration as Opportunity["duration"],
    funding: raw.funding as Opportunity["funding"],
    applicationVideo,
    shareImageUrl: raw.shareImageUrl
      ? String(raw.shareImageUrl)
      : undefined,
  };
}

export function mapOpportunityDocument(doc: Document): AdminOpportunity {
  const {
    _id,
    createdAt,
    updatedAt,
    shareImageUrl,
    ...rest
  } = doc as Record<string, unknown>;

  const {
    id,
    name = "",
    logoUrl = "",
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
    ...extras
  } = rest;

  const opportunity: AdminOpportunity = {
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
    mongoId: _id ? String(_id) : undefined,
    createdAt: createdAt ? String(createdAt) : undefined,
    updatedAt: updatedAt ? String(updatedAt) : undefined,
    ...extras,
  };

  return opportunity;
}

export function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

export function buildIdFilter(id: string) {
  const filters: Document[] = [{ id }];

  if (ObjectId.isValid(id)) {
    filters.push({ _id: new ObjectId(id) });
  }

  return { $or: filters };
}
