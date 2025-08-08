import { fellowshipOpportunities } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

// Pre-computed at module load time (once)
const distributed = distributeEvenly(fellowshipOpportunities);
const midpoint = Math.floor(distributed.length / 2);

export const carousel1Data = distributed.slice(0, midpoint);
export const carousel2Data = distributed.slice(midpoint);