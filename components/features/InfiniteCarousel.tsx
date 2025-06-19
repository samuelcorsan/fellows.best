import { Opportunity } from "@/lib/data";
import { OpportunityCard } from "./OpportunityCard";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  opportunities: Opportunity[];
  direction?: "left" | "right";
  speed?: "normal" | "slow" | "fast";
  className?: string;
}

export function InfiniteCarousel({
  opportunities,
  direction = "left",
  speed = "normal",
  className,
}: InfiniteCarouselProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          direction === "left" ? "animate-scroll" : "animate-scroll-reverse",
          speed === "slow" && "animation-duration-slow",
          speed === "fast" && "animation-duration-fast"
        )}
        style={{
          animationDuration:
            speed === "normal" ? "40s" : speed === "slow" ? "80s" : "20s",
        }}
      >
        {opportunities.map((opportunity, idx) => (
          <OpportunityCard
            key={`${opportunity.id}-${idx}`}
            opportunity={opportunity}
            className="w-[350px] shrink-0"
            isCarousel
          />
        ))}
        {opportunities.map((opportunity, idx) => (
          <OpportunityCard
            key={`${opportunity.id}-${idx}-clone`}
            opportunity={opportunity}
            className="w-[350px] shrink-0"
            isCarousel
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
