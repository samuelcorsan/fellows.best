import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BrowsePageContent } from "../browse/page";

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

  if (!normalizedCategory) {
    redirect("/browse");
  }

  return (
    <Suspense fallback={<CategoryPageFallback />}>
      <BrowsePageContent initialCategory={normalizedCategory} />
    </Suspense>
  );
}
