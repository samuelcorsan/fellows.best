"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, SearchX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { InfiniteCarousel } from "@/components/features/infinite-carousel";
import { GuideHeader } from "./guide-header";
import { generateGuideContent } from "@/lib/guide-content-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GuideConfig } from "@/lib/guide-generator";
import type { Opportunity } from "@/lib/data";

interface GuideContentProps {
  config: GuideConfig;
  opportunities: Opportunity[];
}

type SortOption = "deadline" | "name" | "category";

export function GuideContent({ config, opportunities }: GuideContentProps) {
  const [sortBy, setSortBy] = useState<SortOption>("deadline");
  const guideContent = useMemo(
    () => generateGuideContent(config, opportunities),
    [config, opportunities]
  );

  const sortedOpportunities = useMemo(() => {
    const sorted = [...opportunities];
    
    sorted.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          if (!a.closeDate) return 1;
          if (!b.closeDate) return -1;
          return (
            new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [opportunities, sortBy]);

  // Prepare opportunities for carousel (shuffle for variety)
  const carouselOpportunities = useMemo(() => {
    const shuffled = [...opportunities].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, [opportunities]);

  return (
    <>
      <GuideHeader config={config} overview={guideContent.overview} />

      {/* Opportunities Carousel */}
      {carouselOpportunities.length > 0 && (
        <div className="py-8">
          <InfiniteCarousel
            opportunities={carouselOpportunities}
            direction="right"
            speed="slow"
            from="guide"
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Content Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What You'll Find */}
            {guideContent.whatYoullFind.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Find</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {guideContent.whatYoullFind.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {guideContent.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {guideContent.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            {guideContent.tips.length > 0 && (
              <Card className={guideContent.whatYoullFind.length > 0 && guideContent.benefits.length > 0 ? "md:col-span-2" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg">Application Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {guideContent.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {opportunities.length === 0 ? (
          <div className="text-center py-16">
            <SearchX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No opportunities found
            </h3>
            <p className="text-muted-foreground">
              No opportunities match the filters for this guide. Try exploring other guides or browse all opportunities.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sort Controls */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {sortedOpportunities.length}{" "}
                {sortedOpportunities.length === 1 ? "opportunity" : "opportunities"}
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Sort by Deadline</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="category">Sort by Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  from="guide"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

