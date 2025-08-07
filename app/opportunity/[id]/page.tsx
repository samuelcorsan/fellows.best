import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  Clock,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarButton } from "@/components/global/calendar-button";
import { ShareButton } from "@/components/global/share-button";
import {
  getOpportunityById,
  getDaysUntilDeadline,
  getDeadlineUrgency,
} from "@/lib/data";

interface OpportunityPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found",
    };
  }

  const ogImageUrl =
    opportunity.shareImageUrl || `/api/og?id=${opportunity.id}`;

  return {
    title: `${opportunity.name} - ${opportunity.organizer} | fellows.best`,
    description: opportunity.description,
    openGraph: {
      title: `${opportunity.name} - ${opportunity.organizer}`,
      description: opportunity.description,
      url: `/opportunity/${opportunity.id}`,
      siteName: "fellows.best",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${opportunity.name} opportunity details`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opportunity.name} - ${opportunity.organizer}`,
      description: opportunity.description,
      images: [ogImageUrl],
    },
  };
}

export default async function OpportunityPage({
  params,
  searchParams,
}: OpportunityPageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const opportunity = await getOpportunityById(id);

  if (!opportunity) {
    notFound();
  }

  const daysUntil = opportunity.closeDate
    ? getDaysUntilDeadline(opportunity.closeDate)
    : null;
  const urgency = opportunity.closeDate
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

  const { url: backUrl, text: backText } = getBackNavigation();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!opportunity.shareImageUrl && (
        <Button asChild variant="ghost" className="mb-6">
          <Link href={backUrl}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backText}
          </Link>
        </Button>
      )}

      {/* Banner with share image and overlapping logo */}
      {opportunity.shareImageUrl ? (
        <div className="relative w-full mb-12 sm:mb-16">
          {/* Banner */}
          <div className="relative w-full h-32 sm:h-48 md:h-64 rounded-2xl overflow-hidden">
            <Image
              src={opportunity.shareImageUrl}
              alt={`${opportunity.name} banner`}
              fill
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          {/* Overlapping Logo */}
          <div className="absolute -bottom-8 sm:-bottom-6 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0">
            <div className="relative">
              <Image
                src={opportunity.logoUrl}
                alt={`${opportunity.name} logo`}
                width={100}
                height={100}
                className="rounded-xl object-cover w-20 h-20 sm:w-[100px] sm:h-[100px] border-4 border-white shadow-2xl bg-white"
              />
            </div>
          </div>
          
          {/* Back button on banner */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20">
            <Button asChild size="icon" className="bg-white text-black hover:bg-gray-100 shadow-md rounded-xl w-10 h-10">
              <Link href={backUrl}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 flex-1">
          {!opportunity.shareImageUrl && (
            <div className="relative">
              <Image
                src={opportunity.logoUrl}
                alt={`${opportunity.name} logo`}
                width={100}
                height={100}
                className="rounded-xl object-cover w-20 h-20 sm:w-[100px] sm:h-[100px] mx-auto sm:mx-0 flex-shrink-0 border-4 border-white shadow-lg"
              />
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {opportunity.name}
              </h1>
              {opportunity.closeDate &&
                getDaysUntilDeadline(opportunity.closeDate) < 0 && (
                  <Badge className="text-sm mx-auto sm:mx-0 w-fit" variant="destructive">
                    Closed
                  </Badge>
                )}
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {opportunity.organizer}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Badge variant="outline" className="text-sm rounded-lg">
                {opportunity.category}
              </Badge>
              {opportunity.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm rounded-lg"
                >
                  {tag}
                </Badge>
              ))}
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
              {opportunity.closeDate ? (
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
                  <div className="text-2xl font-bold">Rolling Application</div>
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

          {opportunity.closeDate && (
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
  );
}
