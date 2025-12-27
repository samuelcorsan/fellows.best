import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityCard } from "@/components/features/opportunity-card";
import { generateComparisonStructure } from "@/lib/content-optimization";
import type { Opportunity } from "@/lib/data";
import { ArrowLeft, ExternalLink } from "lucide-react";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

async function fetchOpportunity(id: string): Promise<Opportunity | null> {
  try {
    const apiUrl = new URL(`/api/opportunities?id=${id}`, getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as Opportunity;
  } catch (error) {
    console.error(`Error fetching opportunity ${id}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id1: string; id2: string }>;
}): Promise<Metadata> {
  const { id1, id2 } = await params;
  const [opp1, opp2] = await Promise.all([
    fetchOpportunity(id1),
    fetchOpportunity(id2),
  ]);

  if (!opp1 || !opp2) {
    return {
      title: "Comparison Not Found - fellows.best",
      description: "The requested comparison could not be found.",
    };
  }

  const comparison = generateComparisonStructure(opp1, opp2);
  const url = `https://fellows.best/compare/${id1}/${id2}`;

  return {
    title: `${comparison.title} | fellows.best`,
    description: `Compare ${opp1.name} and ${opp2.name}. See funding, eligibility, deadlines, and more side-by-side to find the right opportunity for you.`,
    keywords: `${opp1.name}, ${opp2.name}, comparison, compare, opportunities, fellowships`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${comparison.title} | fellows.best`,
      description: `Compare ${opp1.name} and ${opp2.name} side-by-side.`,
      url,
      siteName: "fellows.best",
      type: "website",
      images: [
        {
          url: "https://cdn.fellows.best/og-image.jpg",
          width: 1200,
          height: 630,
          alt: comparison.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${comparison.title} | fellows.best`,
      description: `Compare ${opp1.name} and ${opp2.name} side-by-side.`,
      images: ["https://cdn.fellows.best/og-image.jpg"],
    },
  };
}

interface ComparePageProps {
  params: Promise<{ id1: string; id2: string }>;
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { id1, id2 } = await params;
  const [opp1, opp2] = await Promise.all([
    fetchOpportunity(id1),
    fetchOpportunity(id2),
  ]);

  if (!opp1 || !opp2) {
    notFound();
  }

  const comparison = generateComparisonStructure(opp1, opp2);
  const url = `https://fellows.best/compare/${id1}/${id2}`;

  // Generate comparison schema
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: `Compare ${opp1.name} and ${opp2.name} side-by-side`,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: opp1.name,
          url: `https://fellows.best/opportunity/${opp1.id}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: opp2.name,
          url: `https://fellows.best/opportunity/${opp2.id}`,
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="comparison-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonSchema),
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {comparison.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            Compare these opportunities side-by-side to find the best fit for
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OpportunityCard opportunity={opp1} from="compare" />
          <OpportunityCard opportunity={opp2} from="compare" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Side-by-Side Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparison.points.map((point, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b last:border-0"
                >
                  <div className="font-semibold">{point.aspect}</div>
                  <div className="text-muted-foreground">{point.opp1}</div>
                  <div className="text-muted-foreground">{point.opp2}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <a
              href={opp1.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Apply to {opp1.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={opp2.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Apply to {opp2.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}

