"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowUpDown, Grid, List, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchInput } from "@/components/global/search-input";
import { FilterPanel, FilterOptions } from "@/components/filters/filter-panel";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { mockOpportunities } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { AIInputDialog } from "@/components/ai/input-dialog";
import { AIResponseDialog } from "@/components/ai/response-dialog";
import { AILoadingCard } from "@/components/ai/loading-card";
import { AiResponse } from "@/lib/types";

export default function BrowsePage() {
  const { data: session } = authClient.useSession();
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [aiResponse]);

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      toast.success("Signed in successfully");
      setIsSignInOpen(false);
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

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
    let filtered = mockOpportunities.filter((opportunity) => {
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAIInputOpen(true)}
                  className="shrink-0"
                >
                  <Lightbulb className="h-5 w-5" />
                </Button>
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
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredAndSortedOpportunities.length} opportunities found
                {!session && " (showing 4 of " + mockOpportunities.length + ")"}
              </p>
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

      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Welcome to ddfellows
            </DialogTitle>
            <DialogDescription className="text-center">
              Continue with Google to access more fellowships
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 justify-center py-6">
            <Button
              variant="outline"
              className="w-full max-w-sm h-12 font-medium"
              onClick={handleGoogleSignIn}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
