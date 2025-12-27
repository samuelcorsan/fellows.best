import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";
import { BrowsePageContent } from "../browse/page";
import { getGuideConfig } from "@/lib/guide-generator";
import { filterOpportunities, type Opportunity } from "@/lib/data";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { GuideContent } from "@/components/features/guide-content";

const VALID_CATEGORIES = [
  "accelerator",
  "fellowship",
  "incubator",
  "venture_capital",
  "grant",
  "residency",
  "competition",
  "research",
  "developer_program",
] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

// Map URL-friendly category names to actual category values
// Supports both kebab-case and snake_case for categories with underscores
const CATEGORY_URL_MAP: Record<string, ValidCategory> = {
  accelerator: "accelerator",
  fellowship: "fellowship",
  incubator: "incubator",
  "venture-capital": "venture_capital",
  venture_capital: "venture_capital",
  grant: "grant",
  residency: "residency",
  competition: "competition",
  research: "research",
  "developer-program": "developer_program",
  developer_program: "developer_program",
};

function normalizeCategory(category: string): ValidCategory | null {
  const normalized = category.toLowerCase().trim();
  return CATEGORY_URL_MAP[normalized] || null;
}

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

function CategoryPageFallback() {
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

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const normalizedCategory = normalizeCategory(category);

  // If it's a valid category, render category page
  if (normalizedCategory) {
    return (
      <Suspense fallback={<CategoryPageFallback />}>
        <BrowsePageContent initialCategory={normalizedCategory} />
      </Suspense>
    );
  }

  // If it's not a valid category, check if it's a guide slug
  let allOpportunities: Opportunity[] = [];
  try {
    const apiUrl = new URL("/api/opportunities", getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (response.ok) {
      allOpportunities = (await response.json()) as Opportunity[];
    }
  } catch (error) {
    console.error("Error fetching opportunities for guide check", error);
  }

  const config = getGuideConfig(category, allOpportunities);
  
  if (!config) {
    // Not a category or guide, redirect to browse
    redirect("/browse");
  }

  // Render guide content directly
  const currentDate = new Date();
  
  // Filter active opportunities
  const activeOpportunities = allOpportunities.filter(
    (opp) =>
      opp.closeDate !== "closed" &&
      (!opp.closeDate || new Date(opp.closeDate) > currentDate)
  );

  // Apply guide-specific filters
  const opportunities = filterOpportunities(activeOpportunities, {
    categories: config.filters.categories || [],
    regions: config.filters.regions || [],
    tags: config.filters.tags || [],
    fundingAmount: config.filters.fundingAmount || { min: 0, max: 2000000 },
    equityPercentage: { min: 0, max: 20 },
    duration: { min: 0, max: 52, unit: "weeks" },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <GuideContent config={config} opportunities={opportunities} />
    </div>
  );
}
