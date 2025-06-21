import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Opportunities",
  description:
    "Explore a curated list of fellowships, grants, accelerators, and competitions. Find your next opportunity to grow and succeed.",
  keywords:
    "browse fellowships, find grants, explore opportunities, search accelerators",
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
