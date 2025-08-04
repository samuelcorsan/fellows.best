import type { Metadata } from "next";
import { getOpportunityById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found - fellows.best",
      description: "The requested opportunity could not be found.",
    };
  }

  const title = `${opportunity.name} - Deadlines, Requirements & How to Apply`;

  return {
    title,
    description: opportunity.fullDescription || opportunity.description,
    keywords: [...opportunity.tags].join(", "),
    alternates: {
      canonical: `https://fellows.best/opportunity/${id}`,
    },
    openGraph: {
      title: `${opportunity.name} - Deadlines, Requirements & How to Apply`,
      description: opportunity.description,
      type: "article",
      url: `https://fellows.best/opportunity/${id}`,
      siteName: "fellows.best",
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
      description: opportunity.description,
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
