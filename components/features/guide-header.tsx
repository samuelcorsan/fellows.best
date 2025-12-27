import { Badge } from "@/components/ui/badge";
import { MapPin, Tag, DollarSign } from "lucide-react";
import type { GuideConfig } from "@/lib/guide-generator";

const CATEGORY_NAMES: Record<string, string> = {
  accelerator: "Accelerator",
  fellowship: "Fellowship",
  incubator: "Incubator",
  venture_capital: "Venture Capital",
  grant: "Grant",
  residency: "Residency",
  competition: "Competition",
  research: "Research",
  developer_program: "Developer Program",
};

interface GuideHeaderProps {
  config: GuideConfig;
  overview: string;
}

function formatFundingRange(fundingAmount?: { min: number; max: number }): string {
  if (!fundingAmount) return "";
  
  const { min, max } = fundingAmount;
  
  if (max === Infinity || max >= 2000000) {
    return min === 0 ? "Any amount" : `$${min.toLocaleString()}+`;
  }
  
  if (min === 0) {
    return `Under $${max.toLocaleString()}`;
  }
  
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

export function GuideHeader({ config, overview }: GuideHeaderProps) {
  const { filters } = config;
  
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6 mb-8">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              {config.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {overview}
            </p>
          </div>

          {/* Active Filters */}
          {(filters.categories?.length ||
            filters.regions?.length ||
            filters.tags?.length ||
            filters.fundingAmount) && (
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.categories?.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs px-2.5 py-1"
                >
                  <Tag className="h-3 w-3 mr-1.5" />
                  {CATEGORY_NAMES[category] || category}
                </Badge>
              ))}
              
              {filters.regions?.map((region) => (
                <Badge
                  key={region}
                  variant="secondary"
                  className="text-xs px-2.5 py-1"
                >
                  <MapPin className="h-3 w-3 mr-1.5" />
                  {region}
                </Badge>
              ))}
              
              {filters.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs px-2.5 py-1"
                >
                  {tag}
                </Badge>
              ))}
              
              {filters.fundingAmount && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2.5 py-1"
                >
                  <DollarSign className="h-3 w-3 mr-1.5" />
                  {formatFundingRange(filters.fundingAmount)}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

