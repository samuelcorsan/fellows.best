import { distributeEvenly } from "@/lib/landing-utils";
import type { Opportunity } from "@/lib/data";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

export async function getCarouselData() {
  let opportunities: Opportunity[] = [];
  try {
    const apiUrl = new URL("/api/opportunities", getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (response.ok) {
      opportunities = ((await response.json()) as Opportunity[]).filter(
        (opp) => opp.closeDate !== "closed"
      );
    }
  } catch (error) {
    console.error("Error fetching carousel data", error);
  }

  const distributed = distributeEvenly(opportunities);
  
  // Limit carousel items to improve performance (30 items per carousel = 60 total cards with clones)
  const maxItemsPerCarousel = 30;
  const totalItems = Math.min(distributed.length, maxItemsPerCarousel * 2);
  const limitedDistributed = distributed.slice(0, totalItems);
  
  const midpoint = Math.floor(limitedDistributed.length / 2);

  return {
    carousel1Data: limitedDistributed.slice(0, midpoint),
    carousel2Data: limitedDistributed.slice(midpoint),
  };
}
