import { ObjectId, type Document, type WithId } from "mongodb";
import type { Opportunity } from "@/lib/data";
import { getOpportunitiesCollection } from "@/lib/mongodb";

type OpportunityDocument = WithId<Opportunity & Document>;

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
  const collection = await getOpportunitiesCollection();

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
  const collection = await getOpportunitiesCollection();

  const filters: Record<string, unknown>[] = [{ id }];

  if (ObjectId.isValid(id)) {
    filters.push({ _id: new ObjectId(id) });
  }

  const document = await collection.findOne({ $or: filters });
  return document ? mapOpportunity(document as OpportunityDocument) : undefined;
}
