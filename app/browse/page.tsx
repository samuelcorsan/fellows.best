"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  Grid,
  List,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/global/search-input";
import { FilterPanel, FilterOptions } from "@/components/filters/filter-panel";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { Timeline, TimelineRef } from "@/components/features/timeline";
import { fellowshipOpportunities, filterOpportunities } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "@/components/global/sign-in-dialog";

function BrowsePageContent() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    regions: [],
    tags: [],
    fundingAmount: { min: 0, max: 2000000 },
    equityPercentage: { min: 0, max: 20 },
  });

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [sortBy, setSortBy] = useState<"deadline" | "name" | "category">(
    "deadline"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">(
    "grid"
  );

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "timeline") {
      setViewMode("timeline");
    }
  }, [searchParams]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const timelineRef = useRef<TimelineRef>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredAndSortedOpportunities = useMemo(() => {
    const currentDate = new Date();
    const searchQuery = debouncedSearchQuery.toLowerCase();

    let filtered = fellowshipOpportunities.filter((opportunity) => {
      const isOpen =
        !opportunity.closeDate || new Date(opportunity.closeDate) > currentDate;
      if (!isOpen) return false;

      if (searchQuery) {
        const matchesSearch =
          opportunity.name.toLowerCase().includes(searchQuery) ||
          opportunity.description.toLowerCase().includes(searchQuery) ||
          opportunity.organizer.toLowerCase().includes(searchQuery);
        if (!matchesSearch) return false;
      }

      return true;
    });

    filtered = filterOpportunities(filtered, filters);

    filtered.sort((a, b) => {
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

    if (!session) {
      filtered = filtered.slice(0, 6);
    }

    return filtered;
  }, [debouncedSearchQuery, filters, sortBy, session]);

  const handleItemClick = useCallback(
    (opportunity: any) => {
      const fromParam = viewMode === "timeline" ? "timeline" : "browse";
      window.location.href = `/opportunity/${opportunity.id}?from=${fromParam}`;
    },
    [viewMode]
  );

  const handleScrollStateChange = useCallback(
    (canLeft: boolean, canRight: boolean) => {
      setCanScrollLeft(canLeft);
      setCanScrollRight(canRight);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    handleFiltersChange({
      categories: [],
      regions: [],
      tags: [],
      fundingAmount: { min: 0, max: 2000000 },
      equityPercentage: { min: 0, max: 20 },
    });
  }, [handleFiltersChange]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Opportunities
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover fellowships, grants, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <div className="flex-1">
                  <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by name, description, or organizer..."
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(value: any) => setSortBy(value)}
                >
                  <SelectTrigger className="w-40">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "timeline" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("timeline")}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {viewMode === "timeline" && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => timelineRef.current?.scrollLeft()}
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => timelineRef.current?.scrollRight()}
                    disabled={!canScrollRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {filteredAndSortedOpportunities.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  No opportunities found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={handleClearFilters}>Clear all filters</Button>
              </div>
            ) : viewMode === "timeline" ? (
              <div className="relative">
                <div className={!session ? "blur-sm pointer-events-none" : ""}>
                  <Timeline
                    ref={timelineRef}
                    opportunities={filteredAndSortedOpportunities}
                    onItemClick={handleItemClick}
                    onScrollStateChange={handleScrollStateChange}
                  />
                </div>
                {!session && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <div className="text-center p-8 bg-card border rounded-lg shadow-lg max-w-md">
                      <h3 className="text-xl font-semibold mb-3">
                        Timeline View Locked
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Sign in to access the timeline view and visualize
                        application deadlines across time.
                      </p>
                      <Button onClick={() => setIsSignInOpen(true)} size="lg">
                        Sign in to View Timeline
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredAndSortedOpportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      variant={viewMode === "list" ? "default" : "default"}
                      from="browse"
                    />
                  ))}
                </div>
                {!session && (
                  <div className="mt-8 text-center p-6 border rounded-lg bg-muted/50">
                    <h3 className="text-xl font-semibold mb-2">
                      Want to see more opportunities?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Sign in to access all available fellowships and
                      opportunities
                    </p>
                    <Button onClick={() => setIsSignInOpen(true)}>
                      Sign in to view more
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </>
  );
}

export default function BrowsePage() {
  return <BrowsePageContent />;
}
