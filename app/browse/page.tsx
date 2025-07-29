"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, Grid, List, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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
import { fellowshipOpportunities } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { SignInDialog } from "@/components/global/sign-in-dialog";
import { AIInputDialog } from "@/components/ai/input-dialog";
import { AIResponseDialog } from "@/components/ai/response-dialog";
import { AILoadingCard } from "@/components/ai/loading-card";
import { AiResponse } from "@/lib/types";

export default function BrowsePage() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAIInputOpen, setIsAIInputOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    regions: [],
    tags: [],
  });
  const [sortBy, setSortBy] = useState<"deadline" | "name" | "category">(
    "deadline"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">(() => {
    const viewParam = searchParams.get('view');
    return viewParam === 'timeline' ? 'timeline' : 'grid';
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const timelineRef = useRef<TimelineRef>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [aiResponse]);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) {
      toast.error("Please enter your situation first");
      return;
    }

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch("/api/ai-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI recommendations");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAiResponse(data);
      setAiQuery("");
    } catch (error) {
      console.error("Error getting AI recommendations:", error);
      toast.error("Failed to get recommendations. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const closeAiDialog = () => {
    setIsAIInputOpen(false);
    setAiQuery("");
  };

  const filteredAndSortedOpportunities = useMemo(() => {
    const currentDate = new Date();

    let filtered = fellowshipOpportunities.filter((opportunity) => {
      const isOpen =
        !opportunity.closeDate || new Date(opportunity.closeDate) > currentDate;
      if (!isOpen) return false;

      const matchesSearch =
        !debouncedSearchQuery ||
        opportunity.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        opportunity.organizer
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(opportunity.category);

      const matchesRegion =
        filters.regions.length === 0 ||
        filters.regions.includes(opportunity.region) ||
        (opportunity.country && filters.regions.includes(opportunity.country));

      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => opportunity.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesRegion && matchesTags;
    });

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
      filtered = filtered.slice(0, 4);
    }

    return filtered;
  }, [debouncedSearchQuery, filters, sortBy, session]);

  const handleItemClick = (opportunity: any) => {
    const fromParam = viewMode === 'timeline' ? 'timeline' : 'browse';
    window.location.href = `/opportunity/${opportunity.id}?from=${fromParam}`;
  };

  const handleScrollStateChange = (canLeft: boolean, canRight: boolean) => {
    setCanScrollLeft(canLeft);
    setCanScrollRight(canRight);
  };

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
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                {/* <Button
                  variant="outline"
                  onClick={() => {
                    if (!session) {
                      setIsSignInOpen(true);
                    } else {
                      setIsAIInputOpen(true);
                    }
                  }}
                  className="shrink-0 relative group"
                >
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-md transition-all duration-300 group-hover:blur-lg -z-10" />
                  <Lightbulb className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium ml-2">Ask AI</span>
                </Button> */}
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
              {session && (
                <p className="text-muted-foreground">
                  {filteredAndSortedOpportunities.length} opportunities found
                </p>
              )}
              {!session && <div />}
              
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
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ categories: [], regions: [], tags: [] });
                  }}
                >
                  Clear all filters
                </Button>
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
                      <h3 className="text-xl font-semibold mb-3">Timeline View Locked</h3>
                      <p className="text-muted-foreground mb-6">
                        Sign in to access the timeline view and visualize application deadlines across time.
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

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300 ${
          isAIInputOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAiDialog}
      />

      <AIInputDialog
        isOpen={isAIInputOpen}
        aiQuery={aiQuery}
        isLoading={isAiLoading}
        onQueryChange={setAiQuery}
        onSubmit={handleAiQuery}
        onClose={closeAiDialog}
      />

      <AIResponseDialog
        isOpen={isAIInputOpen}
        response={aiResponse}
        currentIndex={currentCardIndex}
        onIndexChange={setCurrentCardIndex}
      />

      <AILoadingCard isOpen={isAIInputOpen && isAiLoading} />

      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </>
  );
}
