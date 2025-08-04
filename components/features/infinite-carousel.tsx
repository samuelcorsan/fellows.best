import { Opportunity } from "@/lib/data";
import { OpportunityCard } from "./opportunity-card";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
  opportunities: Opportunity[];
  direction?: "left" | "right";
  speed?: "normal" | "slow" | "fast";
  className?: string;
  from?: string;
}

export function InfiniteCarousel({
  opportunities,
  direction = "left",
  speed = "normal",
  className,
  from,
}: InfiniteCarouselProps) {
  const openOpportunities = opportunities.filter((opp) => {
    if (!opp.closeDate) return true;
    return new Date(opp.closeDate) > new Date();
  });

  return (
    <div
      className={cn(
        "w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4 w-max flex-nowrap",
          direction === "left" ? "animate-scroll" : "animate-scroll-reverse",
          speed === "slow" && "animation-duration-slow",
          speed === "fast" && "animation-duration-fast",
          "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration:
            speed === "normal" ? "40s" : speed === "slow" ? "80s" : "20s",
        }}
      >
        {openOpportunities.map((opportunity, idx) => (
          <div key={`${opportunity.id}-${idx}`} className="w-[280px] sm:w-[320px] lg:w-[350px] shrink-0">
            <OpportunityCard
              opportunity={opportunity}
              className="w-full"
              isCarousel
              from={from}
            />
          </div>
        ))}
        {openOpportunities.map((opportunity, idx) => (
          <div key={`${opportunity.id}-${idx}-clone`} className="w-[280px] sm:w-[320px] lg:w-[350px] shrink-0">
            <OpportunityCard
              opportunity={opportunity}
              className="w-full"
              isCarousel
              from={from}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
