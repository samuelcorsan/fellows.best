import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit an Opportunity - Share Fellowships & Grants | fellows.best",
  description:
    "Help others discover amazing opportunities. Submit fellowships, grants, accelerators, or competitions to our community-driven platform.",
  keywords: "submit opportunity, add fellowship, new grant, post opportunity, share opportunity",
  alternates: {
    canonical: "https://fellows.best/submit",
  },
  openGraph: {
    title: "Submit an Opportunity - Share Fellowships & Grants",
    description:
      "Help others discover amazing opportunities. Submit fellowships, grants, accelerators, or competitions to our community-driven platform.",
    url: "https://fellows.best/submit",
    siteName: "fellows.best",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Submit an Opportunity - Share Fellowships & Grants",
    description:
      "Help others discover amazing opportunities. Submit fellowships, grants, accelerators, or competitions.",
  },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
