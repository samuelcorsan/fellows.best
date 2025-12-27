import type { Metadata } from "next";
import type { Opportunity } from "@/lib/data";
import { generateCategoryMetaDescription } from "@/lib/meta-optimization";
import { getGuideConfig } from "@/lib/guide-generator";
import { generateGuideKeywords } from "@/lib/guide-content-generator";

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

const categoryNames: Record<string, string> = {
  accelerator: "Tech Accelerators",
  fellowship: "Tech Fellowships",
  incubator: "Startup Incubators",
  venture_capital: "Venture Capital Programs",
  grant: "Grants",
  residency: "Residencies",
  competition: "Competitions",
  research: "Research Programs",
  developer_program: "Developer Programs",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const normalizedCategory = normalizeCategory(category);
  
  // If it's not a valid category, check if it's a guide
  if (!normalizedCategory) {
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

    const config = getGuideConfig(category, opportunities);
    if (config) {
      const url = `https://fellows.best/${category}`;
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

    return {
      title: "Category Not Found - fellows.best",
      description: "The requested category could not be found.",
    };
  }

  // Fetch opportunities count for this category
  let count = 0;
  try {
    const apiUrl = new URL("/api/opportunities", getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });
    
    if (response.ok) {
      const opportunities = (await response.json()) as Opportunity[];
      const currentDate = new Date();
      count = opportunities.filter(
        (opp) =>
          opp.category === normalizedCategory &&
          opp.closeDate !== "closed" &&
          (!opp.closeDate || new Date(opp.closeDate) > currentDate)
      ).length;
    }
  } catch (error) {
    console.error("Error fetching opportunities for category metadata", error);
  }

  const categoryName = categoryNames[normalizedCategory] || normalizedCategory;
  const title = `${categoryName} | fellows.best`;
  const description = generateCategoryMetaDescription(normalizedCategory, count);
  const url = `https://fellows.best/${category}`;

  // Generate comprehensive keywords for category pages
  const categoryKeywords = new Set<string>();
  const normalizedCategoryName = categoryName.toLowerCase();
  
  // Base keywords
  categoryKeywords.add(normalizedCategoryName);
  categoryKeywords.add(normalizedCategory);
  categoryKeywords.add(`${normalizedCategoryName} opportunities`);
  categoryKeywords.add(`${normalizedCategoryName} programs`);
  categoryKeywords.add(`best ${normalizedCategoryName}`);
  categoryKeywords.add(`apply ${normalizedCategoryName}`);
  categoryKeywords.add(`${normalizedCategoryName} application`);
  categoryKeywords.add(`${normalizedCategoryName} deadline`);
  categoryKeywords.add(`find ${normalizedCategoryName}`);
  categoryKeywords.add(`discover ${normalizedCategoryName}`);
  
  // Category-specific synonyms
  if (normalizedCategory === "accelerator") {
    categoryKeywords.add("startup accelerator");
    categoryKeywords.add("tech accelerator");
    categoryKeywords.add("accelerator program");
    categoryKeywords.add("startup program");
  } else if (normalizedCategory === "fellowship") {
    categoryKeywords.add("tech fellowship");
    categoryKeywords.add("fellowship program");
    categoryKeywords.add("fellowship opportunities");
    categoryKeywords.add("fellowship application");
  } else if (normalizedCategory === "incubator") {
    categoryKeywords.add("startup incubator");
    categoryKeywords.add("incubator program");
    categoryKeywords.add("business incubator");
  } else if (normalizedCategory === "grant") {
    categoryKeywords.add("tech grants");
    categoryKeywords.add("grant funding");
    categoryKeywords.add("grant program");
    categoryKeywords.add("funding grants");
  } else if (normalizedCategory === "venture_capital") {
    categoryKeywords.add("venture capital");
    categoryKeywords.add("vc programs");
    categoryKeywords.add("venture capital funding");
    categoryKeywords.add("vc opportunities");
  } else if (normalizedCategory === "residency") {
    categoryKeywords.add("tech residency");
    categoryKeywords.add("residency program");
    categoryKeywords.add("residency opportunities");
  } else if (normalizedCategory === "competition") {
    categoryKeywords.add("tech competition");
    categoryKeywords.add("competition program");
    categoryKeywords.add("competition opportunities");
  } else if (normalizedCategory === "research") {
    categoryKeywords.add("research program");
    categoryKeywords.add("research opportunities");
    categoryKeywords.add("research funding");
  } else if (normalizedCategory === "developer_program") {
    categoryKeywords.add("developer program");
    categoryKeywords.add("developer opportunities");
    categoryKeywords.add("dev program");
  }
  
  // Action keywords
  categoryKeywords.add("opportunities");
  categoryKeywords.add("programs");
  categoryKeywords.add("deadlines");
  categoryKeywords.add("applications");
  categoryKeywords.add("apply now");
  categoryKeywords.add("how to apply");
  categoryKeywords.add("application deadline");
  categoryKeywords.add("find opportunities");
  categoryKeywords.add("discover programs");
  categoryKeywords.add("active opportunities");
  categoryKeywords.add("current deadlines");
  categoryKeywords.add("open applications");

  return {
    title,
    description,
    keywords: Array.from(categoryKeywords).join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "fellows.best",
      type: "website",
      images: [
        {
          url: "https://cdn.fellows.best/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryName} - fellows.best`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://cdn.fellows.best/og-image.jpg"],
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

