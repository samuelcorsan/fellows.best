import { MetadataRoute } from "next";
import { fellowshipOpportunities } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fellows.best";
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

  const opportunityRoutes: MetadataRoute.Sitemap = fellowshipOpportunities.map(
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
