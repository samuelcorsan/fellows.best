import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "View your personalized timeline of upcoming fellowship and grant deadlines. Stay organized and never miss an important date.",
  keywords:
    "fellowship timeline, deadline tracker, opportunity calendar, grant deadlines",
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
