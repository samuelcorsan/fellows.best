import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { MapPin, ExternalLink, Clock, Users, Award, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarButton } from "@/components/global/calendar-button";
import { ShareButton } from "@/components/global/share-button";
import { OpportunityImages } from "@/components/features/opportunity-images";
import { BadgeList } from "@/components/ui/badge-list";

import {
  getDaysUntilDeadline,
  getDeadlineUrgency,
  type Opportunity,
} from "@/lib/data";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

interface OpportunityPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export default async function OpportunityPage({
  params,
  searchParams,
}: OpportunityPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  let opportunity: Opportunity | null = null;
  try {
    const apiUrl = new URL(
      `/api/opportunities?id=${id}`,
      getBaseUrl()
    );
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    opportunity = (await response.json()) as Opportunity;
  } catch (error) {
    console.error("Error fetching opportunity page data", error);
    notFound();
  }

  if (!opportunity) {
    notFound();
  }

  const daysUntil =
    opportunity.closeDate && opportunity.closeDate !== "closed"
      ? getDaysUntilDeadline(opportunity.closeDate)
      : null;
  const urgency =
    opportunity.closeDate && opportunity.closeDate !== "closed"
      ? getDeadlineUrgency(opportunity.closeDate)
      : "safe";

  const urgencyStyles = {
    safe: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    urgent:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  };

  const getBackNavigation = () => {
    switch (resolvedSearchParams.from) {
      case "timeline":
        return { url: "/browse?view=timeline", text: "Back to Timeline" };
      case "home":
        return { url: "/", text: "Back to Home" };
      case "browse":
      default:
        return { url: "/browse", text: "Back to Browse" };
    }
  };

  const { url: backUrl } = getBackNavigation();

  return (
    <>
      <Script
        id="opportunity-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Scholarship",
            name: opportunity.name,
            description: opportunity.description,
            provider: {
              "@type": "Organization",
              name: opportunity.organizer,
              url: opportunity.applyLink,
            },
            url: `https://fellows.best/opportunity/${opportunity.id}`,
            applicationDeadline: opportunity.closeDate,
            datePosted: opportunity.openDate,
            category: opportunity.category,
            eligibilityCriteria: opportunity.eligibility,
            value: opportunity.funding
              ? {
                  "@type": "MonetaryAmount",
                  value: opportunity.funding.amount,
                  currency: opportunity.funding.currency,
                }
              : undefined,
            areaServed: {
              "@type": "Place",
              name: opportunity.region,
            },
            termsOfService: opportunity.applyLink,
          }),
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OpportunityImages opportunity={opportunity} backUrl={backUrl} />

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 flex-1">
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {opportunity.name}
                </h1>
                {opportunity.closeDate === "closed" ||
                (opportunity.closeDate &&
                  getDaysUntilDeadline(opportunity.closeDate) < 0) ? (
                  <Badge
                    className="text-sm mx-auto sm:mx-0 w-fit px-4 py-1 rounded-lg self-center"
                    variant="destructive"
                  >
                    Closed
                  </Badge>
                ) : null}
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                {opportunity.organizer}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline" className="text-sm rounded-lg">
                  {opportunity.category}
                </Badge>
                <BadgeList
                  badges={opportunity.tags}
                  variant="secondary"
                  maxVisible={4}
                  className="justify-center sm:justify-start"
                  badgeClassName="text-xs rounded-lg h-6 px-2.5 py-0.5"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:shrink-0">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={opportunity.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <ShareButton opportunity={opportunity} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About this Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {opportunity.fullDescription}
                </p>
              </CardContent>
            </Card>

            {opportunity.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    What You&apos;ll Get
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunity.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Eligibility Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity.eligibility}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Deadline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunity.closeDate === "closed" ? (
                  <div
                    className={`p-4 rounded-lg border text-center ${urgencyStyles.urgent}`}
                  >
                    <div className="text-2xl font-bold">Closed</div>
                    <div className="text-sm opacity-75">
                      This opportunity is no longer accepting applications
                    </div>
                  </div>
                ) : opportunity.closeDate ? (
                  <div
                    className={`p-4 rounded-lg border text-center ${urgencyStyles[urgency]}`}
                  >
                    <div className="text-2xl font-bold">
                      {daysUntil !== null && daysUntil >= 0
                        ? `${daysUntil} days left`
                        : "Closed"}
                    </div>
                    <div className="text-sm opacity-75">
                      Closes{" "}
                      {new Date(opportunity.closeDate).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-lg border text-center ${urgencyStyles.safe}`}
                  >
                    <div className="text-2xl font-bold">
                      Rolling Application
                    </div>
                    <div className="text-sm opacity-75">Apply anytime</div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Opens:</span>
                    <span>
                      {opportunity.openDate
                        ? new Date(opportunity.openDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {opportunity.region}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {opportunity.applicationVideo && (
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Play className="mr-2 h-4 w-4" />
                    Application Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="560"
                      height="315"
                      src={opportunity.applicationVideo}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {opportunity.closeDate && opportunity.closeDate !== "closed" && (
              <Card>
                <CardHeader>
                  <CardTitle>Add to Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarButton opportunity={opportunity} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
