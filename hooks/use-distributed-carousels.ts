import { useState, useEffect } from "react";
import { type Opportunity } from "@/lib/data";
import { distributeEvenly } from "@/lib/landing-utils";

export function useDistributedCarousels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [carousel1, setCarousel1] = useState<Opportunity[]>([]);
  const [carousel2, setCarousel2] = useState<Opportunity[]>([]);

  useEffect(() => {
    async function loadCarousels() {
      try {
        const response = await fetch("/api/opportunities");
        if (!response.ok) {
          throw new Error(
            `Failed to load opportunities: ${response.status} ${response.statusText}`
          );
        }

        const data = (await response.json()) as Opportunity[];
        const active = data.filter((opp) => opp.closeDate !== "closed");
        const distributed = distributeEvenly(active);
        const midpoint = Math.floor(distributed.length / 2);
        setCarousel1(distributed.slice(0, midpoint));
        setCarousel2(distributed.slice(midpoint));
      } catch (error) {
        console.error("Error loading carousel data", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadCarousels();
  }, []);

  return {
    isLoaded,
    carousel1,
    carousel2,
  };
}
