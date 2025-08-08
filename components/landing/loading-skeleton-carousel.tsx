interface SkeletonCarouselRowProps {
  direction: "left" | "right";
  rowKey: string;
}

function SkeletonCarouselRow({ direction, rowKey }: SkeletonCarouselRowProps) {
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div
        className={`flex min-w-full shrink-0 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4 w-max flex-nowrap ${
          direction === "right" ? "animate-scroll-reverse" : "animate-scroll"
        }`}
        style={{ animationDuration: "80s" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`skeleton-${rowKey}-${i}`}
            className="w-[280px] sm:w-[320px] lg:w-[350px] h-[280px] sm:h-[320px] shrink-0 bg-card border rounded-lg flex flex-col animate-pulse"
          >
            <div className="p-6 flex-grow">
              <div className="flex items-start space-x-4">
                <div className="w-[60px] h-[60px] bg-muted rounded-lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="h-5 bg-muted rounded w-3/4 mb-1" />
                      <div className="h-4 bg-muted rounded w-full mb-1" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                    <div className="h-8 bg-muted rounded-full w-20 ml-2" />
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted rounded w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 bg-muted rounded-full w-16" />
                      <div className="h-6 bg-muted rounded-full w-20" />
                      <div className="h-6 bg-muted rounded-full w-14" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-muted/50">
              <div className="h-10 bg-muted rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingSkeletonCarousel() {
  return (
    <div className="space-y-2 sm:space-y-4">
      <SkeletonCarouselRow direction="right" rowKey="1" />
      <SkeletonCarouselRow direction="left" rowKey="2" />
    </div>
  );
}