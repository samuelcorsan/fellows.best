import { useState, useEffect } from "react";
import { getActiveOpportunities, type Opportunity } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

export function useDistributedCarousels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [carousel1, setCarousel1] = useState<Opportunity[]>([]);
  const [carousel2, setCarousel2] = useState<Opportunity[]>([]);

  useEffect(() => {
    async function loadCarousels() {
      const opportunities = await getActiveOpportunities();
      const distributed = distributeEvenly(opportunities);
      const midpoint = Math.floor(distributed.length / 2);
      setCarousel1(distributed.slice(0, midpoint));
      setCarousel2(distributed.slice(midpoint));
      setIsLoaded(true);
    }
    loadCarousels();
  }, []);

  return {
    isLoaded,
    carousel1,
    carousel2,
  };
}
