import { useState, useEffect, useMemo } from "react";
import { getActiveOpportunities } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

export function useDistributedCarousels() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { carousel1, carousel2 } = useMemo(() => {
    const distributed = distributeEvenly(getActiveOpportunities());
    const midpoint = Math.floor(distributed.length / 2);

    return {
      carousel1: distributed.slice(0, midpoint),
      carousel2: distributed.slice(midpoint),
    };
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return {
    isLoaded,
    carousel1,
    carousel2,
  };
}
