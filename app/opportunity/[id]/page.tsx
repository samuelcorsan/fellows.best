import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ExternalLink, MapPin } from "lucide-react";
import { CalendarButton } from "@/components/global/calendar-button";
import { FeedbackButton } from "@/components/global/feedback-button";
import { AppliedButton } from "@/components/global/applied-button";

import { getDaysUntilDeadline, type Opportunity } from "@/lib/data";

const ACCENT = "#5b6cff";

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (raw?.startsWith("http://") || raw?.startsWith("https://")) return raw;
  if (raw) return `https://${raw}`;
  return "http://localhost:3000";
}

interface OpportunityPageProps {
  params: Promise<{ id: string }>;
}

function deadlineInfo(closeDate: Opportunity["closeDate"]) {
  if (closeDate === "closed") {
    return {
      big: "Closed",
      sub: "Applications are no longer accepted",
      tone: "closed" as const,
    };
  }
  if (!closeDate) {
    return {
      big: "Rolling",
      sub: "Apply anytime",
      tone: "rolling" as const,
    };
  }
  const days = getDaysUntilDeadline(closeDate);
  if (days < 0) {
    return {
      big: "Closed",
      sub: `Closed on ${new Date(closeDate).toLocaleDateString()}`,
      tone: "closed" as const,
    };
  }
  const big =
    days === 0
      ? "Today"
      : days === 1
        ? "1 day left"
        : days < 30
          ? `${days} days left`
          : days < 365
            ? `${Math.floor(days / 30)} months left`
            : `${Math.floor(days / 365)} years left`;
  const sub = `Closes ${new Date(closeDate).toLocaleDateString()}`;
  const tone: "urgent" | "soon" | "ok" =
    days < 14 ? "urgent" : days < 60 ? "soon" : "ok";
  return { big, sub, tone };
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { id } = await params;
  let opportunity: Opportunity | null = null;
  try {
    const apiUrl = new URL(`/api/opportunities?id=${id}`, getBaseUrl());
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) notFound();
    opportunity = (await response.json()) as Opportunity;
  } catch (error) {
    console.error("Error fetching opportunity page data", error);
    notFound();
  }
  if (!opportunity) notFound();

  const deadline = deadlineInfo(opportunity.closeDate);
  const deadlineTone =
    deadline.tone === "urgent"
      ? "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400"
      : deadline.tone === "soon"
        ? "border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400"
        : deadline.tone === "closed"
          ? "border-border bg-muted text-muted-foreground"
          : "border-border bg-card text-foreground/80";
  const opportunityUrl = `https://fellows.best/opportunity/${opportunity.id}`;
  const currentDate = new Date().toISOString();

  const scholarshipSchema = {
    "@context": "https://schema.org",
    "@type": "Scholarship",
    name: opportunity.name,
    description: opportunity.fullDescription || opportunity.description,
    provider: {
      "@type": "Organization",
      name: opportunity.organizer,
      url: opportunity.applyLink,
    },
    url: opportunityUrl,
    applicationDeadline:
      opportunity.closeDate && opportunity.closeDate !== "closed"
        ? opportunity.closeDate
        : undefined,
    datePosted: opportunity.openDate,
    dateModified: currentDate,
    category: opportunity.category,
    eligibilityCriteria: opportunity.eligibility,
    value: opportunity.funding
      ? {
          "@type": "MonetaryAmount",
          value: opportunity.funding.amount,
          currency: opportunity.funding.currency,
        }
      : undefined,
    areaServed: { "@type": "Place", name: opportunity.region },
    termsOfService: opportunity.applyLink,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opportunity.name,
    description: opportunity.description,
    image: opportunity.logoUrl ? [opportunity.logoUrl] : [],
    datePublished: opportunity.openDate || currentDate,
    dateModified: currentDate,
    author: { "@type": "Organization", name: opportunity.organizer },
    publisher: {
      "@type": "Organization",
      name: "fellows.best",
      logo: {
        "@type": "ImageObject",
        url: "https://cdn.fellows.best/og-image.jpg",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opportunityUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fellows.best",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: opportunity.name,
        item: opportunityUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id="opportunity-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarshipSchema) }}
      />
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
          <div className="max-w-4xl mx-auto px-5 py-3 flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <span className="font-semibold tracking-tight text-[17px] hover:underline underline-offset-4 decoration-2">
                fellows.best
              </span>
            </Link>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-5 py-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {opportunity.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={opportunity.logoUrl}
                alt={opportunity.name}
                className="w-16 h-16 object-cover bg-muted border border-border shrink-0"
              />
            ) : (
              <div className="w-16 h-16 bg-muted border border-border shrink-0 flex items-center justify-center text-xl font-semibold text-muted-foreground">
                {opportunity.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
                {opportunity.name}
              </h1>
              <p className="text-[15px] text-muted-foreground mt-1">
                {opportunity.organizer}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[13px] text-muted-foreground">
                <span className="capitalize">
                  {opportunity.category.replace("_", " ")}
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {opportunity.region || "—"}
                </span>
              </div>
              {opportunity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {opportunity.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center text-[11px] uppercase tracking-wide px-2 py-0.5 border border-border bg-card text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <a
                href={opportunity.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-white text-[14px] font-medium flex-1 sm:flex-none"
                style={{ background: ACCENT }}
              >
                Apply
                <ExternalLink className="w-4 h-4" />
              </a>
              <AppliedButton opportunityId={opportunity.id} />
            </div>
          </div>

          <div
            className={`mt-8 border ${deadlineTone} px-5 py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2`}
          >
            <div>
              <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
                Deadline
              </div>
              <div className="text-3xl sm:text-4xl font-semibold leading-none">
                {deadline.big}
              </div>
              <div className="text-sm opacity-80 mt-1.5">{deadline.sub}</div>
            </div>
            {opportunity.closeDate &&
              opportunity.closeDate !== "closed" && (
                <a
                  href={opportunity.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4 hover:opacity-80 shrink-0"
                >
                  Apply now →
                </a>
              )}
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-border text-[14px]">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Opens
              </div>
              <div>
                {opportunity.openDate
                  ? new Date(opportunity.openDate).toLocaleDateString()
                  : "—"}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Region
              </div>
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {opportunity.region || "—"}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Category
              </div>
              <div className="capitalize">
                {opportunity.category.replace("_", " ")}
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                About
              </h2>
              <p className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-line">
                {opportunity.fullDescription || opportunity.description}
              </p>
            </section>

            {opportunity.benefits.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  What you&apos;ll get
                </h2>
                <ul className="space-y-1.5 text-[15px]">
                  {opportunity.benefits.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-muted-foreground select-none">
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {opportunity.eligibility && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Eligibility
                </h2>
                <p className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-line">
                  {opportunity.eligibility}
                </p>
              </section>
            )}

            {opportunity.applicationVideo && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Application tips
                </h2>
                <div className="relative aspect-video border border-border overflow-hidden max-w-2xl">
                  <iframe
                    src={opportunity.applicationVideo}
                    title="Application video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </section>
            )}

            {opportunity.closeDate && opportunity.closeDate !== "closed" && (
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Add to calendar
                </h2>
                <CalendarButton opportunity={opportunity} />
              </section>
            )}
          </div>
        </article>
      </div>

      <FeedbackButton
        section="opportunity"
        opportunityId={opportunity.id}
        variant="floating"
      />
    </>
  );
}
