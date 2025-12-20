"use client";

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  Grid,
  List,
  Loader2,
  Sparkles,
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
import { filterOpportunities, type Opportunity } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "@/components/global/sign-in-dialog";
import { toast } from "sonner";

function BrowsePageContent() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") || ""
  );
  const [showOpenOnly, setShowOpenOnly] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiFilteredOpportunities, setAiFilteredOpportunities] = useState<Opportunity[]>([]);
  const [isAiFiltering, setIsAiFiltering] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    regions: [],
    tags: [],
    fundingAmount: { min: 0, max: 2000000 },
    equityPercentage: { min: 0, max: 20 },
    duration: { min: 0, max: 52, unit: "weeks" },
  });

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [sortBy, setSortBy] = useState<"deadline" | "name" | "category">(
    "deadline"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch("/api/opportunities");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const active = data.filter(
              (opp: Opportunity) => opp.closeDate !== "closed"
            );
            console.log(
              `Loaded ${active.length} active opportunities from API`
            );
            setOpportunities(active);
          } else {
            console.error("API returned non-array data:", data);
            setOpportunities([]);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error(
            "API error:",
            response.status,
            response.statusText,
            errorData
          );
          setOpportunities([]);
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setOpportunities([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOpportunities();
  }, []);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    async function filterWithAI() {
      if (!debouncedSearchQuery.trim()) {
        setAiFilteredOpportunities([]);
        setIsAiFiltering(false);
        return;
      }

      if (opportunities.length === 0) {
        return;
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const currentDate = new Date();
      const opportunitiesToFilter = showOpenOnly
        ? opportunities.filter((opp) => {
            if (opp.closeDate === "closed") return false;
            const isOpen =
              !opp.closeDate || new Date(opp.closeDate) > currentDate;
            return isOpen;
          })
        : opportunities;

      if (opportunitiesToFilter.length === 0) {
        setAiFilteredOpportunities([]);
        setIsAiFiltering(false);
        return;
      }

      setIsAiFiltering(true);
      
      const timeoutId = setTimeout(() => {
        if (!abortController.signal.aborted) {
          abortController.abort();
          setAiFilteredOpportunities([]);
          setIsAiFiltering(false);
          toast.info("No results found");
        }
      }, 5000);

      try {
        const response = await fetch("/api/opportunities/ai-filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: debouncedSearchQuery,
            opportunities: opportunitiesToFilter,
          }),
          signal: abortController.signal,
        });

        clearTimeout(timeoutId);

        if (abortController.signal.aborted) {
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            if (data.length === 0) {
              toast.info("No results found");
            }
            setAiFilteredOpportunities(data);
          } else {
            console.error("AI filter returned non-array data:", data);
            setAiFilteredOpportunities([]);
            toast.info("No results found");
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("AI filter error:", response.status, errorData);
          setAiFilteredOpportunities([]);
          toast.info("No results found");
        }
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error filtering with AI:", error);
        setAiFilteredOpportunities([]);
        toast.info("No results found");
      } finally {
        if (!abortController.signal.aborted) {
          setIsAiFiltering(false);
        }
      }
    }

    filterWithAI();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchQuery, opportunities, showOpenOnly]);

  const filteredAndSortedOpportunities = useMemo(() => {
    if (isLoading) return [];
    const currentDate = new Date();

    let filtered: Opportunity[];

    if (debouncedSearchQuery.trim() && aiFilteredOpportunities.length > 0) {
      filtered = aiFilteredOpportunities;
    } else if (debouncedSearchQuery.trim() && isAiFiltering) {
      return [];
    } else {
      filtered = opportunities.filter((opportunity) => {
        if (showOpenOnly) {
          const isOpen =
            !opportunity.closeDate ||
            new Date(opportunity.closeDate) > currentDate;
          if (!isOpen) return false;
        }
        return true;
      });
    }

    filtered = filtered.filter((opportunity) => {
      if (showOpenOnly) {
        const isOpen =
          !opportunity.closeDate ||
          new Date(opportunity.closeDate) > currentDate;
        if (!isOpen) return false;
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
  }, [
    debouncedSearchQuery,
    filters,
    sortBy,
    session,
    showOpenOnly,
    opportunities,
    isLoading,
    aiFilteredOpportunities,
    isAiFiltering,
  ]);

  const handleItemClick = useCallback(
    (opportunity: any) => {
      window.location.href = `/opportunity/${opportunity.id}?from=browse`;
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setAiFilteredOpportunities([]);
    setShowOpenOnly(true);
    handleFiltersChange({
      categories: [],
      regions: [],
      tags: [],
      fundingAmount: { min: 0, max: 2000000 },
      equityPercentage: { min: 0, max: 20 },
      duration: { min: 0, max: 52, unit: "weeks" },
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
                    placeholder="Search for opportunities..."
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={showOpenOnly ? "open" : "all"}
                  onValueChange={(value) => setShowOpenOnly(value === "open")}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open only</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
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
                </div>
              </div>
            </div>


            {isLoading ? (
              <div className="text-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Loading opportunities...</p>
              </div>
            ) : debouncedSearchQuery.trim() && isAiFiltering ? (
              <div className="text-center py-24">
                <div className="relative inline-block mb-6">
                  <Sparkles className="h-16 w-16 animate-pulse text-purple-500 mx-auto" />
                  <Loader2 className="h-12 w-12 animate-spin text-purple-500 absolute top-2 left-2" />
                </div>
                <p className="text-lg text-muted-foreground font-medium">Filtering with AI...</p>
              </div>
            ) : filteredAndSortedOpportunities.length === 0 ? (
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

function BrowsePageFallback() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Browse Opportunities
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover fellowships, grants, and more
        </p>
      </div>
      <div className="text-center py-8">Loading...</div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<BrowsePageFallback />}>
      <BrowsePageContent />
    </Suspense>
  );
}
