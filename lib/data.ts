import { head, list } from "@vercel/blob";

const BLOB_KEY_LATEST = "fellows.json";
const BLOB_KEY_FALLBACK = "original-fellows.json";
const BLOB_PREFIX = "fellows_";

export interface Opportunity {
  id: string;
  name: string;
  logoUrl: string;
  shareImageUrl?: string;
  description: string;
  fullDescription: string;
  openDate: string | null;
  closeDate: string | null | "closed";
  tags: string[];
  category:
    | "accelerator"
    | "fellowship"
    | "grant"
    | "residency"
    | "competition"
    | "research";
  region: string;
  country: string | null;
  eligibility: string;
  applyLink: string;
  benefits: string[];
  organizer: string;
  duration?: {
    value: number;
    unit: "weeks" | "months" | "years";
  };
  funding?: {
    amount: number;
    currency: string;
    equityPercentage: number;
    fundingType: "equity-based" | "equity-free" | "mixed";
    isApproximate?: boolean;
  };
  applicationVideo?: string;
}

// Load fellows from Vercel Blob (uses latest file)
export async function loadFellowsFromBlob(): Promise<Opportunity[]> {
  try {
    // Try to load from latest file first
    try {
      const latestBlob = await head(BLOB_KEY_LATEST);
      if (latestBlob) {
        console.log(`Found latest blob: ${latestBlob.url}`);
        const response = await fetch(latestBlob.url);
        if (response.ok) {
          const text = await response.text();
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log(
              `Loaded ${parsed.length} opportunities from latest blob`
            );
            return parsed;
          } else {
            console.warn(
              "Latest blob exists but contains no valid opportunities"
            );
          }
        } else {
          console.warn(
            `Failed to fetch latest blob: ${response.status} ${response.statusText}`
          );
        }
      } else {
        console.log("No latest blob found, searching for dated files");
      }
    } catch (e) {
      console.log(
        "Error loading latest blob:",
        e instanceof Error ? e.message : String(e)
      );
      // Latest file doesn't exist, try fallback
    }

    // If latest file doesn't exist, try fallback to original-fellows.json
    try {
      const fallbackBlob = await head(BLOB_KEY_FALLBACK);
      if (fallbackBlob) {
        console.log(`Found fallback blob: ${fallbackBlob.url}`);
        const response = await fetch(fallbackBlob.url);
        if (response.ok) {
          const text = await response.text();
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log(
              `Loaded ${parsed.length} opportunities from fallback blob`
            );
            return parsed;
          } else {
            console.warn(
              "Fallback blob exists but contains no valid opportunities"
            );
          }
        } else {
          console.warn(
            `Failed to fetch fallback blob: ${response.status} ${response.statusText}`
          );
        }
      } else {
        console.log("No fallback blob found, searching for dated files");
      }
    } catch (e) {
      console.log(
        "Error loading fallback blob:",
        e instanceof Error ? e.message : String(e)
      );
      // Fallback file doesn't exist, try to find latest dated file
    }

    // If latest file and fallback don't exist, find the most recent dated file
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX });
      if (blobs && blobs.length > 0) {
        console.log(`Found ${blobs.length} dated blob(s)`);
        // Sort by uploadedAt (most recent first)
        const sorted = blobs.sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        const latestBlob = sorted[0];
        console.log(`Loading from dated blob: ${latestBlob.url}`);
        const response = await fetch(latestBlob.url);
        if (response.ok) {
          const text = await response.text();
          const parsed = JSON.parse(text);
          const opportunities = Array.isArray(parsed) ? parsed : [];
          console.log(
            `Loaded ${opportunities.length} opportunities from dated blob`
          );
          return opportunities;
        } else {
          console.warn(
            `Failed to fetch dated blob: ${response.status} ${response.statusText}`
          );
        }
      } else {
        console.warn(`No blobs found with prefix "${BLOB_PREFIX}"`);
      }
    } catch (e) {
      console.error(
        "Error listing or loading dated blobs:",
        e instanceof Error ? e.message : String(e)
      );
    }
  } catch (error) {
    console.error("Error loading fellows from Blob:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
  }
  console.warn("Returning empty array - no opportunities loaded");
  return [];
}

export async function getOpportunityById(
  id: string
): Promise<Opportunity | undefined> {
  const opportunities = await loadFellowsFromBlob();
  return opportunities.find((opp: Opportunity) => opp.id === id);
}

export async function getActiveOpportunities(): Promise<Opportunity[]> {
  const opportunities = await loadFellowsFromBlob();
  return opportunities.filter(
    (opportunity: Opportunity) => opportunity.closeDate !== "closed"
  );
}

export function getDaysUntilDeadline(closeDate: string): number {
  const now = new Date();
  const deadline = new Date(closeDate);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDeadlineUrgency(
  closeDate: string
): "safe" | "warning" | "urgent" {
  const days = getDaysUntilDeadline(closeDate);
  if (days <= 7) return "urgent";
  if (days <= 30) return "warning";
  return "safe";
}

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: {
    categories: string[];
    regions: string[];
    tags: string[];
    fundingAmount?: { min: number; max: number };
    equityPercentage?: { min: number; max: number };
    duration?: { min: number; max: number; unit: "weeks" | "months" | "years" };
  }
): Opportunity[] {
  return opportunities.filter((opp) => {
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(opp.category);

    const regionMatch =
      filters.regions.length === 0 || filters.regions.includes(opp.region);

    const tagMatch =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => opp.tags.includes(tag));

    const isDefaultFundingRange =
      !filters.fundingAmount ||
      (filters.fundingAmount.min === 0 &&
        filters.fundingAmount.max === 2000000);

    const fundingMatch =
      isDefaultFundingRange ||
      (opp.funding &&
        filters.fundingAmount &&
        opp.funding.amount >= filters.fundingAmount.min &&
        opp.funding.amount <= filters.fundingAmount.max);

    const isDefaultEquityRange =
      !filters.equityPercentage ||
      (filters.equityPercentage.min === 0 &&
        filters.equityPercentage.max === 20);

    const equityMatch =
      isDefaultEquityRange ||
      (opp.funding &&
        filters.equityPercentage &&
        opp.funding.equityPercentage >= filters.equityPercentage.min &&
        opp.funding.equityPercentage <= filters.equityPercentage.max);

    const isDefaultDurationRange =
      !filters.duration ||
      (filters.duration.min === 0 &&
        ((filters.duration.unit === "weeks" && filters.duration.max === 52) ||
          (filters.duration.unit === "months" && filters.duration.max === 12) ||
          (filters.duration.unit === "years" && filters.duration.max === 5)));

    const durationMatch =
      isDefaultDurationRange ||
      (opp.duration &&
        filters.duration &&
        (() => {
          let oppValueInFilterUnit = opp.duration.value;
          if (
            opp.duration.unit === "weeks" &&
            filters.duration.unit === "months"
          ) {
            oppValueInFilterUnit = opp.duration.value / 4.33;
          } else if (
            opp.duration.unit === "weeks" &&
            filters.duration.unit === "years"
          ) {
            oppValueInFilterUnit = opp.duration.value / 52;
          } else if (
            opp.duration.unit === "months" &&
            filters.duration.unit === "weeks"
          ) {
            oppValueInFilterUnit = opp.duration.value * 4.33;
          } else if (
            opp.duration.unit === "months" &&
            filters.duration.unit === "years"
          ) {
            oppValueInFilterUnit = opp.duration.value / 12;
          } else if (
            opp.duration.unit === "years" &&
            filters.duration.unit === "weeks"
          ) {
            oppValueInFilterUnit = opp.duration.value * 52;
          } else if (
            opp.duration.unit === "years" &&
            filters.duration.unit === "months"
          ) {
            oppValueInFilterUnit = opp.duration.value * 12;
          }
          return (
            oppValueInFilterUnit >= filters.duration.min &&
            oppValueInFilterUnit <= filters.duration.max
          );
        })());

    return (
      categoryMatch &&
      regionMatch &&
      tagMatch &&
      fundingMatch &&
      equityMatch &&
      durationMatch
    );
  });
}
