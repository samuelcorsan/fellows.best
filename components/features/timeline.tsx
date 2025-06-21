import { TimelineItem } from "./timeline-item";
import { Opportunity } from "@/lib/data";

interface TimelineProps {
  opportunities: Opportunity[];
  onItemClick: (opportunity: Opportunity) => void;
}

export function Timeline({ opportunities, onItemClick }: TimelineProps) {
  const sortedOpportunities = [...opportunities].sort((a, b) => {
    const dateA = a.closeDate
      ? new Date(a.closeDate).getTime()
      : Number.MAX_SAFE_INTEGER;
    const dateB = b.closeDate
      ? new Date(b.closeDate).getTime()
      : Number.MAX_SAFE_INTEGER;
    return dateA - dateB;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">Opportunity Timeline</h2>
        <p className="text-muted-foreground text-lg">
          Track upcoming deadlines chronologically
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20 rounded-full md:-translate-x-1/2"></div>

        <div className="space-y-8 md:space-y-16">
          {sortedOpportunities.map((opportunity, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={opportunity.id} className="relative">
                <div className="absolute md:left-1/2 left-6 -translate-x-1/2 -top-8 text-sm font-medium text-muted-foreground bg-background px-4">
                  {opportunity.closeDate
                    ? new Date(opportunity.closeDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "No deadline"}
                </div>

                <div className="flex md:hidden items-start space-x-6 pl-12">
                  <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center flex-shrink-0">
                    <div className="absolute h-8 w-8 animate-ping rounded-full bg-primary/20"></div>
                    <div className="relative h-6 w-6 rounded-full border-4 border-background bg-primary shadow-lg">
                      <div className="absolute inset-0 rounded-full bg-primary/20"></div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <TimelineItem
                      opportunity={opportunity}
                      onClick={() => onItemClick(opportunity)}
                      variant="mobile"
                    />
                  </div>
                </div>

                <div className="hidden md:flex items-start justify-center gap-6">
                  <div
                    className={`w-[calc(50%-3rem)] ${
                      isEven ? "block" : "invisible"
                    }`}
                  >
                    {isEven && (
                      <TimelineItem
                        opportunity={opportunity}
                        onClick={() => onItemClick(opportunity)}
                        variant="mobile"
                      />
                    )}
                  </div>

                  <div className="relative z-10 flex h-12 w-12 items-center justify-center flex-shrink-0">
                    <div className="absolute h-12 w-12 animate-ping rounded-full bg-primary/20"></div>
                    <div className="relative h-8 w-8 rounded-full border-4 border-background bg-primary shadow-lg">
                      <div className="absolute inset-0 rounded-full bg-primary/20"></div>
                    </div>
                  </div>

                  <div
                    className={`w-[calc(50%-3rem)] ${
                      !isEven ? "block" : "invisible"
                    }`}
                  >
                    {!isEven && (
                      <TimelineItem
                        opportunity={opportunity}
                        onClick={() => onItemClick(opportunity)}
                        variant="mobile"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
