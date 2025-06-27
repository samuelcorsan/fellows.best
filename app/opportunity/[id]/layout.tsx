import type { Metadata } from "next";
import { getOpportunityById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const opportunity = getOpportunityById(params.id);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found - ddfellows",
      description: "The requested opportunity could not be found.",
    };
  }

  const title = `${opportunity.name} - Deadlines, Requirements & How to Apply`;

  return {
    title,
    description: opportunity.fullDescription || opportunity.description,
    keywords: [...opportunity.tags].join(", "),
    alternates: {
      canonical: `https://ddfellows.com/opportunity/${params.id}`,
    },
    openGraph: {
      title: `${opportunity.name} - Deadlines, Requirements & How to Apply`,
      description: opportunity.description,
      type: "article",
      url: `https://ddfellows.com/opportunity/${params.id}`,
      siteName: "ddfellows",
      images: [
        {
          url: `https://fellows.disam.dev/api/og?id=${params.id}`,
          width: 1200,
          height: 630,
          alt: opportunity.name,
        },
      ],
    },
    twitter: {
      title: `${opportunity.name} - Deadlines, Requirements & How to Apply`,
      description: opportunity.description,
      card: "summary_large_image",
      images: `https://fellows.disam.dev/api/og?id=${params.id}`,
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
