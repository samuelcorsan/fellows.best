"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "@/components/global/sign-in-dialog";

export interface FilterOptions {
  categories: string[];
  regions: string[];
  tags: string[];
  fundingAmount: {
    min: number;
    max: number;
  };
  equityPercentage: {
    min: number;
    max: number;
  };
  duration: {
    min: number;
    max: number;
    unit: "weeks" | "months" | "years";
  };
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
  "incubator",
  "venture_capital",
  "grant",
  "residency",
  "competition",
  "research",
  "developer_program",
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
  const [isSignInOpen, setIsSignInOpen] = useState(false);
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

  const handleFundingAmountChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      fundingAmount: { min: values[0], max: values[1] },
    });
  };

  const handleEquityPercentageChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      equityPercentage: { min: values[0], max: values[1] },
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      regions: [],
      tags: [],
      fundingAmount: { min: 0, max: 2000000 },
      equityPercentage: { min: 0, max: 20 },
      duration: { min: 0, max: 52, unit: "weeks" },
    });
  };

  const totalActiveFilters =
    filters.categories.length +
    filters.regions.length +
    filters.tags.length +
    (filters.fundingAmount.min > 0 || filters.fundingAmount.max < 2000000
      ? 1
      : 0) +
    (filters.equityPercentage.min > 0 || filters.equityPercentage.max < 20
      ? 1
      : 0) +
    (filters.duration.min > 0 ||
    (filters.duration.unit === "weeks" && filters.duration.max < 52) ||
    (filters.duration.unit === "months" && filters.duration.max < 12) ||
    (filters.duration.unit === "years" && filters.duration.max < 5)
      ? 1
      : 0);

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
              <p className="text-muted-foreground mb-4">
                Sign in to unlock powerful filtering options
              </p>
              <Button onClick={() => setIsSignInOpen(true)}>Get Started</Button>
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
              <Label className="text-sm font-medium mb-3 block">
                Funding Amount (USD)
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[filters.fundingAmount.min, filters.fundingAmount.max]}
                  onValueChange={handleFundingAmountChange}
                  max={2000000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${filters.fundingAmount.min.toLocaleString()}</span>
                  <span>${filters.fundingAmount.max.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium mb-3 block">
                Equity Percentage (%)
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[
                    filters.equityPercentage.min,
                    filters.equityPercentage.max,
                  ]}
                  onValueChange={handleEquityPercentageChange}
                  max={20}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{filters.equityPercentage.min}%</span>
                  <span>{filters.equityPercentage.max}%</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium mb-3 block">
                Duration ({filters.duration.unit})
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[filters.duration.min, filters.duration.max]}
                  onValueChange={(values) =>
                    onFiltersChange({
                      ...filters,
                      duration: {
                        ...filters.duration,
                        min: values[0],
                        max: values[1],
                      },
                    })
                  }
                  max={
                    filters.duration.unit === "weeks"
                      ? 52
                      : filters.duration.unit === "months"
                        ? 12
                        : 5
                  }
                  min={0}
                  step={filters.duration.unit === "weeks" ? 1 : 0.5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {filters.duration.min} {filters.duration.unit}
                  </span>
                  <span>
                    {filters.duration.max} {filters.duration.unit}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["weeks", "months", "years"] as const).map((unit) => (
                    <Button
                      key={unit}
                      variant={
                        filters.duration.unit === unit ? "default" : "outline"
                      }
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          duration: {
                            min: 0,
                            max:
                              unit === "weeks"
                                ? 52
                                : unit === "months"
                                  ? 12
                                  : 5,
                            unit,
                          },
                        })
                      }
                    >
                      {unit}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

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

      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </>
  );
}
