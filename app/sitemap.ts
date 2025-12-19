import { MetadataRoute } from "next";
import type { Opportunity } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fellows.best");
  const currentDate = new Date().toISOString().split("T")[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(currentDate),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(currentDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(currentDate),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  let activeOpportunities: Opportunity[] = [];

  try {
    const apiUrl = new URL(
      "/api/opportunities",
      `https://${process.env.NEXT_PUBLIC_APP_BASE_URL}`
    );
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (response.ok) {
      activeOpportunities = ((await response.json()) as Opportunity[]).filter(
        (opportunity) => opportunity.closeDate !== "closed"
      );
    }
  } catch (error) {
    console.error("Error fetching opportunities for sitemap", error);
  }
  const opportunityRoutes: MetadataRoute.Sitemap = activeOpportunities.map(
    (opportunity) => ({
      url: `${baseUrl}/opportunity/${opportunity.id}`,
      lastModified: opportunity.openDate
        ? new Date(opportunity.openDate)
        : new Date(currentDate),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...opportunityRoutes];
}
