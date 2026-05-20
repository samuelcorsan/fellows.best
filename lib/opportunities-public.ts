import type { Document } from "mongodb";
import type { Opportunity } from "@/lib/data";
import {
  buildIdFilter,
  getOpportunitiesCollection,
} from "@/lib/opportunity-admin";

function normalizeDate(
  value: unknown
): Opportunity["closeDate"] | Opportunity["openDate"] {
  if (value === undefined || value === null) return null;
  if (value === "closed") return "closed";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function mapPublicOpportunity(doc: Document): Opportunity {
  const {
    _id,
    id,
    name = "",
    logoUrl = "",
    shareImageUrl,
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
    voters,
    votes: _votes,
    ...rest
  } = doc as Record<string, unknown>;
  void _votes;
  const voterList = Array.isArray(voters) ? (voters as string[]) : [];

  return {
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
    votes: voterList.length,
    ...rest,
  };
}

export async function fetchAllOpportunities(): Promise<Opportunity[]> {
  const collection = await getOpportunitiesCollection();
  const documents = await collection.find({}).toArray();
  return documents.map(mapPublicOpportunity);
}

export async function fetchOpportunityById(
  id: string
): Promise<Opportunity | null> {
  const collection = await getOpportunitiesCollection();
  const document = await collection.findOne(buildIdFilter(id));
  if (!document) return null;
  return mapPublicOpportunity(document);
}

export function isOpportunityOpen(o: Opportunity): boolean {
  if (o.closeDate === "closed") return false;
  if (!o.closeDate) return true;
  const t = new Date(o.closeDate).getTime();
  if (Number.isNaN(t)) return true;
  return t >= Date.now();
}
