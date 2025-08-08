import { HeroSection } from "./hero-section";
import { LoadingSkeletonCarousel } from "./loading-skeleton-carousel";
import { ViewAllOpportunitiesSection } from "./view-all-opportunities-section";
import { WhatYouGetSection } from "./what-you-get";

export function LoadingHomePage() {
  return (
    <div className="space-y-8 py-12">
      <HeroSection />
      <LoadingSkeletonCarousel />
      <ViewAllOpportunitiesSection />
      <WhatYouGetSection />
    </div>
  );
}