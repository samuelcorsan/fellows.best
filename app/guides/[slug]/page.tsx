import { notFound } from "next/navigation";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { filterOpportunities, type Opportunity } from "@/lib/data";
import { getGuideConfig } from "@/lib/guide-generator";
import { Metadata } from "next";
import { GuideContent } from "@/components/features/guide-content";
import { generateGuideKeywords } from "@/lib/guide-content-generator";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch opportunities to generate guide config
  let opportunities: Opportunity[] = [];
  try {
    const apiUrl = new URL("/api/opportunities", getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (response.ok) {
      opportunities = (await response.json()) as Opportunity[];
    }
  } catch (error) {
    console.error("Error fetching opportunities for guide metadata", error);
  }

  const config = getGuideConfig(slug, opportunities);

  if (!config) {
    return {
      title: "Guide Not Found - fellows.best",
      description: "The requested guide could not be found.",
    };
  }

  const url = `https://fellows.best/guides/${slug}`;

  return {
    title: `${config.title} | fellows.best`,
    description: config.description,
    keywords: generateGuideKeywords(config),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${config.title} | fellows.best`,
      description: config.description,
      url,
      siteName: "fellows.best",
      type: "website",
      images: [
        {
          url: "https://cdn.fellows.best/og-image.jpg",
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | fellows.best`,
      description: config.description,
      images: ["https://cdn.fellows.best/og-image.jpg"],
    },
  };
}

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  
  // Fetch opportunities
  let allOpportunities: Opportunity[] = [];
  try {
    const apiUrl = new URL("/api/opportunities", getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (response.ok) {
      allOpportunities = (await response.json()) as Opportunity[];
    }
  } catch (error) {
    console.error("Error fetching opportunities for guide", error);
  }

  // Generate guide config based on opportunities
  const config = getGuideConfig(slug, allOpportunities);

  if (!config) {
    notFound();
  }

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

