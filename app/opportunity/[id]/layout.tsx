import type { Metadata } from "next";
import type { Opportunity } from "@/lib/data";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let opportunity: Opportunity | undefined;

  try {
    const apiUrl = new URL(
      `/api/opportunities?id=${id}`,
      getBaseUrl()
    );
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (response.ok) {
      opportunity = (await response.json()) as Opportunity | undefined;
    }
  } catch (error) {
    console.error("Error fetching opportunity metadata", error);
  }

  if (!opportunity) {
    return {
      title: "Opportunity Not Found - fellows.best",
      description: "The requested opportunity could not be found.",
    };
  }

  const title = `${opportunity.name} - Deadlines, Requirements & How to Apply`;
  
  // Optimize description length (150-160 chars for SEO)
  const { generateOpportunityMetaDescription } = await import("@/lib/meta-optimization");
  const description = generateOpportunityMetaDescription(
    opportunity.name,
    opportunity.fullDescription || opportunity.description,
    opportunity.organizer
  );

  return {
    title,
    description,
    keywords: [...opportunity.tags].join(", "),
    alternates: {
      canonical: `https://fellows.best/opportunity/${id}`,
    },
    openGraph: {
      title: `${opportunity.name} - Deadlines, Requirements & How to Apply`,
      description: description,
      type: "article",
      url: `https://fellows.best/opportunity/${id}`,
      siteName: "fellows.best",
      publishedTime: opportunity.openDate || undefined,
      modifiedTime: new Date().toISOString(),
      images: [
        {
          url: `https://fellows.best/api/og?id=${id}`,
          width: 1200,
          height: 630,
          alt: opportunity.name,
        },
      ],
    },
    twitter: {
      title: `${opportunity.name} - Deadlines, Requirements & How to Apply`,
      description: description,
      card: "summary_large_image",
      images: [`https://fellows.best/api/og?id=${id}`],
      creator: "@disamdev",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function OpportunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
