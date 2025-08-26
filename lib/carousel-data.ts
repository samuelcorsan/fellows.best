import { getActiveOpportunities } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

const distributed = distributeEvenly(getActiveOpportunities());
const midpoint = Math.floor(distributed.length / 2);

export const carousel1Data = distributed.slice(0, midpoint);
export const carousel2Data = distributed.slice(midpoint);
