import { distributeEvenly } from "@/lib/landing-utils";
import type { Opportunity } from "@/lib/data";

export async function getCarouselData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const response = await fetch(`${baseUrl}/api/opportunities`, {
    cache: "no-store",
  });

  const opportunities: Opportunity[] = response.ok
    ? ((await response.json()) as Opportunity[]).filter(
        (opp) => opp.closeDate !== "closed"
      )
    : [];
  const distributed = distributeEvenly(opportunities);
  const midpoint = Math.floor(distributed.length / 2);

  return {
    carousel1Data: distributed.slice(0, midpoint),
    carousel2Data: distributed.slice(midpoint),
  };
}
