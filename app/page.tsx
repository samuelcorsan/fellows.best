import { getCarouselData } from "@/lib/carousel-data";
import { HeroSection } from "@/components/landing/hero-section";
import { CarouselSection } from "@/components/landing/carousel-section";
import { ScrapingSection } from "@/components/landing/scraping-section";
import { ViewAllOpportunitiesSection } from "@/components/landing/view-all-opportunities-section";
import { WhatYouGetSection } from "@/components/landing/what-you-get";
import { ContributeSection } from "@/components/landing/contribute-section";

export default async function Home() {
  const { carousel1Data, carousel2Data } = await getCarouselData();
  
  return (
    <div className="space-y-8 pb-12">
      <div className="w-full rounded-none bg-gradient-to-r from-black via-neutral-900 to-neutral-800 px-4 py-3 text-red-400">
        <p className="text-center text-sm font-medium">
          Heads up: we&apos;re currently experiencing issues loading images. Thanks for
          your patience while we sort this out.
        </p>
      </div>
      <HeroSection />
      <CarouselSection
        distributedCarousel1={carousel1Data}
        distributedCarousel2={carousel2Data}
      />
      <ViewAllOpportunitiesSection />
      <WhatYouGetSection />
      <ScrapingSection />
      <ContributeSection />
    </div>
  );
}
