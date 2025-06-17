"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/SearchInput";
import { FilterPanel, FilterOptions } from "@/components/FilterPanel";
import { OpportunityCard } from "@/components/OpportunityCard";
import { mockOpportunities } from "@/lib/data";
import { useDebounce } from "@/hooks/useDebounce";

export default function BrowsePage() {
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

  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = mockOpportunities.filter((opportunity) => {
      // Search filter
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

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(opportunity.category);

      // Region and country filter
      const matchesRegion =
        filters.regions.length === 0 ||
        filters.regions.includes(opportunity.region) ||
        (opportunity.country && filters.regions.includes(opportunity.country));

      // Tags filter
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => opportunity.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesRegion && matchesTags;
    });

    // Sort
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

    return filtered;
  }, [debouncedSearchQuery, filters, sortBy]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Browse Opportunities
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover {mockOpportunities.length} fellowships, grants, and more
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, description, or organizer..."
              />
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

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredAndSortedOpportunities.length} opportunities found
            </p>
          </div>

          {/* Opportunities Grid/List */}
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
          )}
        </div>
      </div>
    </div>
  );
}
