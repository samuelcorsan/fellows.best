import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Opportunity",
  description:
    "Submit a new fellowship, grant, accelerator, or competition opportunity to share with the community.",
  keywords: "submit opportunity, add fellowship, new grant, post opportunity",
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
