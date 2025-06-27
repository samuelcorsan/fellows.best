"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export interface FilterOptions {
  categories: string[];
  regions: string[];
  tags: string[];
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categoryOptions = [
  "accelerator",
  "fellowship",
  "grant",
  "residency",
  "competition",
  "research",
];

const tagGroups = {
  programType: {
    label: "Program Type",
    options: [
      "equity-free",
      "equity-based",
      "stipend",
      "mentorship",
      "funding",
    ],
  },
  stage: {
    label: "Stage",
    options: ["early-stage", "pre-seed", "seed-stage", "growth-stage"],
  },
  duration: {
    label: "Duration",
    options: ["short-term", "medium-term", "long-term"],
  },
};

const regionOptions = [
  {
    name: "Global",
    countries: [],
  },
  {
    name: "Europe",
    countries: [
      "Spain",
      "France",
      "Germany",
      "United Kingdom",
      "Switzerland",
      "Israel",
    ],
  },
  {
    name: "Asia",
    countries: ["Japan", "South Korea", "Singapore", "India", "China"],
  },
  {
    name: "North America",
    countries: ["United States", "Canada", "Mexico"],
  },
  {
    name: "South America",
    countries: ["Brazil", "Argentina", "Chile", "Colombia"],
  },
  {
    name: "Africa",
    countries: ["South Africa", "Nigeria", "Kenya", "Egypt"],
  },
  {
    name: "Middle East",
    countries: ["UAE", "Saudi Arabia", "Qatar"],
  },
  {
    name: "Oceania",
    countries: ["Australia", "New Zealand"],
  },
];

const tagOptions = [
  "remote",
  "equity-free",
  "mentorship",
  "funding",
  "research",
  "early-stage",
  "technical-support",
  "networking",
  "academic",
];

export function FilterPanel({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
}: FilterPanelProps) {
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const { data: session } = authClient.useSession();

  const toggleRegionExpanded = (region: string) => {
    setExpandedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    let newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter((r) => r !== region);

    // If unchecking a region, also remove its countries
    const regionData = regionOptions.find((r) => r.name === region);
    if (!checked && regionData?.countries) {
      newRegions = newRegions.filter((r) => !regionData.countries.includes(r));
    }

    onFiltersChange({ ...filters, regions: newRegions });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter((t) => t !== tag);

    onFiltersChange({ ...filters, tags: newTags });
  };

  const clearAllFilters = () => {
    onFiltersChange({ categories: [], regions: [], tags: [] });
  };

  const totalActiveFilters =
    filters.categories.length + filters.regions.length + filters.tags.length;

  return (
    <>
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalActiveFilters}
              </Badge>
            )}
          </span>
          {isOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
        </Button>
      </div>

      <div className={`lg:block ${isOpen ? "block" : "hidden"} relative`}>
        {!session && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-start justify-center pt-20">
            <div className="text-center p-4">
              <h3 className="font-semibold mb-2">
                Discover Your Perfect Fellowship
              </h3>
              <p className="text-muted-foreground">
                Sign in to unlock powerful filtering options
              </p>
            </div>
          </div>
        )}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {totalActiveFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Category</Label>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm capitalize cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium mb-3 block">Region</Label>
              <div className="space-y-2">
                {regionOptions.map((region) => (
                  <div key={region.name} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region.name}`}
                        checked={filters.regions.includes(region.name)}
                        onCheckedChange={(checked) =>
                          handleRegionChange(region.name, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`region-${region.name}`}
                        className="text-sm cursor-pointer flex items-center"
                      >
                        {region.name}
                        {region.countries.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-5 w-5 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleRegionExpanded(region.name);
                            }}
                          >
                            {expandedRegions.includes(region.name) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </Label>
                    </div>

                    {region.countries.length > 0 &&
                      expandedRegions.includes(region.name) && (
                        <div className="ml-6 space-y-2">
                          {region.countries.map((country) => (
                            <div
                              key={country}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`country-${country}`}
                                checked={filters.regions.includes(country)}
                                onCheckedChange={(checked) =>
                                  handleRegionChange(
                                    country,
                                    checked as boolean
                                  )
                                }
                              />
                              <Label
                                htmlFor={`country-${country}`}
                                className="text-sm cursor-pointer"
                              >
                                {country}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* New organized tag groups */}
            {Object.entries(tagGroups).map(([groupKey, group]) => (
              <div key={groupKey}>
                <Label className="text-sm font-medium mb-3 block">
                  {group.label}
                </Label>
                <div className="space-y-2">
                  {group.options.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={filters.tags.includes(tag)}
                        onCheckedChange={(checked) =>
                          handleTagChange(tag, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`tag-${tag}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {tag.replace(/-/g, " ")}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
