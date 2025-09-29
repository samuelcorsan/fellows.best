import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { ThemeProvider } from "@/providers/theme-provider";

import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://fellows.best"
  ),
  title: "The biggest tech fellowship list",
  description:
    "Discover fellowships, grants, accelerators, and competitions. Track deadlines, get reminders, and never miss an opportunity.",
  keywords:
    "fellowships, grants, accelerators, hackathons, competitions, deadlines, opportunities",
  openGraph: {
    title: "The biggest tech fellowship list",
    description:
      "Discover fellowships, grants, accelerators, and competitions. Track deadlines, get reminders, and never miss an opportunity.",
    url: "/",
    siteName: "fellows.best",
    type: "website",
    images: [
      {
        url: "https://cdn.fellows.best/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "fellows.best - The biggest tech fellowship list",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "fellows.best - The biggest tech fellowship list",
    description:
      "Discover fellowships, grants, accelerators, and competitions. Track deadlines, get reminders, and never miss an opportunity.",
    images: ["https://cdn.fellows.best/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SpeedInsights />
          <Analytics />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster richColors theme="dark" />
      </body>
    </html>
  );
}
