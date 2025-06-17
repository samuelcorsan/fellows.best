"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { normalizeRegion } from "@/lib/data";

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
  "fellowship",
  "accelerator",
  "grant",
  "hackathon",
  "internship",
  "competition",
];

const regionOptions = [
  "Global",
  "United States",
  "Europe",
  "Asia",
  "India",
  "Canada",
  "Australia",
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
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter((r) => r !== region);

    onFiltersChange({ ...filters, regions: newRegions });
  };

  const isRegionSelected = (region: string) => {
    return filters.regions.some((selectedRegion) => {
      // Check if either the exact region matches or if it's part of a compound region
      return (
        selectedRegion === region ||
        normalizeRegion(selectedRegion).includes(region)
      );
    });
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
      {/* Mobile filter toggle */}
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

      {/* Filter panel */}
      <div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
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
            {/* Categories */}
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

            {/* Regions */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Region</Label>
              <div className="space-y-2">
                {regionOptions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region}`}
                      checked={isRegionSelected(region)}
                      onCheckedChange={(checked) =>
                        handleRegionChange(region, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`region-${region}`}
                      className="text-sm cursor-pointer"
                    >
                      {region}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Tags</Label>
              <div className="space-y-2">
                {tagOptions.map((tag) => (
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
                      className="text-sm cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
