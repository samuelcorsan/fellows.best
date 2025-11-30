import { getActiveOpportunities } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

export async function getCarouselData() {
  const opportunities = await getActiveOpportunities();
  const distributed = distributeEvenly(opportunities);
  const midpoint = Math.floor(distributed.length / 2);

  return {
    carousel1Data: distributed.slice(0, midpoint),
    carousel2Data: distributed.slice(midpoint),
  };
}
