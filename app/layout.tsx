import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fellows.best - Discover Your Next Fellowship Opportunity",
  description:
    "Discover fellowships, grants, accelerators, and competitions. Track deadlines, get reminders, and never miss an opportunity.",
  keywords:
    "fellowships, grants, accelerators, hackathons, competitions, deadlines, opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
