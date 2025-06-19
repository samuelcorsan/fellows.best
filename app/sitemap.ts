import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fellows.disam.dev",
      lastModified: new Date("2025-06-19"),
    },
    {
      url: "https://fellows.disam.dev/timeline",
      lastModified: new Date("2025-06-19"),
    },
    {
      url: "https://fellows.disam.dev/browse",
      lastModified: new Date("2025-06-19"),
    },
    {
      url: "https://fellows.disam.dev/submit",
      lastModified: new Date("2025-06-19"),
    },
  ];
}
