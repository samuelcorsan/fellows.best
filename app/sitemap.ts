import { MetadataRoute } from "next";
import { getActiveOpportunities } from "@/app/api/opportunities/route";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_APP_BASE_URL is not set");
  }
  
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

  const activeOpportunities = await getActiveOpportunities();
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
