import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ddfellows - Never Miss a Fellowship Deadline",
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
