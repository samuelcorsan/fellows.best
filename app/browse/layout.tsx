import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Opportunities - Fellowships, Grants & Accelerators | fellows.best",
  description:
    "Explore 100+ fellowships, grants, accelerators, and competitions. Filter by category, region, funding, and deadline. Find your perfect opportunity today.",
  keywords:
    "browse fellowships, find grants, explore opportunities, search accelerators, tech fellowships, startup grants",
  alternates: {
    canonical: "https://fellows.best/browse",
  },
  openGraph: {
    title: "Browse Opportunities - Fellowships, Grants & Accelerators",
    description:
      "Explore 100+ fellowships, grants, accelerators, and competitions. Filter by category, region, funding, and deadline.",
    url: "https://fellows.best/browse",
    siteName: "fellows.best",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Opportunities - Fellowships, Grants & Accelerators",
    description:
      "Explore 100+ fellowships, grants, accelerators, and competitions. Filter by category, region, funding, and deadline.",
  },
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
