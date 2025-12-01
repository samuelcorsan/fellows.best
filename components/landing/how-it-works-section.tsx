"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Server,
  Globe,
  FileText,
  Layout,
  Check,
  Calendar,
  MapPin,
} from "lucide-react";
import { Opportunity } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    name: "Google for Startups 2025",
    logoUrl: "https://cdn.fellows.best/logos/google-for-startups-2025-logo.jpg",
    description: "Google's program for high-potential startups.",
    fullDescription: "",
    openDate: "2024-01-01",
    closeDate: "2025-12-31",
    tags: ["Tech", "Startup"],
    category: "accelerator",
    region: "Global",
    country: null,
    eligibility: "Startups",
    applyLink: "#",
    benefits: ["Mentorship", "Cloud Credits"],
    organizer: "Google",
  },
  {
    id: "2",
    name: "Y Combinator W26",
    logoUrl: "https://cdn.fellows.best/logos/y-combinator-fall-2025-logo.png",
    description: "The world's premier startup accelerator.",
    fullDescription: "",
    openDate: "2024-01-01",
    closeDate: "2025-12-31",
    tags: ["Investment", "Network"],
    category: "accelerator",
    region: "Global",
    country: "USA",
    eligibility: "Early stage",
    applyLink: "#",
    benefits: ["$500k Investment"],
    organizer: "Y Combinator",
  },
  {
    id: "3",
    name: "Vercel OSS Program",
    logoUrl:
      "https://cdn.fellows.best/logos/vercel-open-source-program-logo.jpg",
    description: "Supporting open source projects with sponsorship.",
    fullDescription: "",
    openDate: "2024-01-01",
    closeDate: "2025-12-31",
    tags: ["Open Source", "Sponsorship"],
    category: "grant",
    region: "Global",
    country: null,
    eligibility: "Open Source Projects",
    applyLink: "#",
    benefits: ["Pro Plan", "Sponsorship"],
    organizer: "Vercel",
  },
];

export function HowItWorksSection() {
  const [step, setStep] = useState<"scraping" | "feeding">("scraping");
  const [globes, setGlobes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      icon: typeof Globe | typeof Layout;
    }>
  >([]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.7 });

  useEffect(() => {
    setGlobes(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 400 - 200,
        y: Math.random() * 300 - 150,
        delay: Math.random() * 1.5,
        icon: i % 4 === 0 ? Layout : Globe,
      }))
    );
  }, []);

  useEffect(() => {
    if (!isInView || globes.length === 0) {
      setStep("scraping");
      return;
    }

    setStep("scraping");

    const cycleAnimation = () => {
      setStep("scraping");
      setTimeout(() => {
        setStep("feeding");
      }, 3000);
    };

    const initialTimeout = setTimeout(() => {
      cycleAnimation();
    }, 100);

    const interval = setInterval(cycleAnimation, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isInView, globes.length]);

  return (
    <section
      ref={containerRef}
      className="py-24 overflow-hidden bg-background/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Find Opportunities
          </h2>
          <p className="text-lg text-muted-foreground">
            Our intelligent system constantly scans the web to bring you the
            latest fellowships, grants, and scholarships.
          </p>
        </div>

        <div className="relative h-[500px] w-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            animate={{
              x: step === "feeding" ? -200 : 0,
              scale: step === "feeding" ? 0.8 : 1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-2xl backdrop-blur-sm">
              <Server className="w-12 h-12 text-primary" />

              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/5"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <AnimatePresence>
                {step === "scraping" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5, duration: 0.3 }}
                    className="absolute -right-2 -top-2 bg-green-500 rounded-full p-1 shadow-lg z-20"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence>
            {step === "scraping" && globes.length > 0 && (
              <>
                {globes.map((globe) => (
                  <motion.div
                    key={globe.id}
                    initial={{
                      x: globe.x * 2.5,
                      y: globe.y * 2.5,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      delay: globe.delay,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 -ml-4 -mt-4 z-0"
                  >
                    <div className="w-10 h-10 bg-background rounded-full border shadow-sm flex items-center justify-center">
                      <globe.icon className="w-6 h-6 text-primary/60" />
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute mt-48 flex flex-col items-center gap-2"
                >
                  <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    Scanning worldwide sources...
                  </span>
                  <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.8, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step === "feeding" && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute left-1/2 top-1/2 -translate-y-1/2 ml-[-140px] w-[280px] h-[2px] bg-gradient-to-r from-primary/50 to-transparent z-0"
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                    animate={{ left: ["0%", "100%"], opacity: [1, 0] }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute left-1/2 ml-[-50px] w-[400px] md:w-[500px] bg-background border rounded-lg shadow-2xl overflow-hidden"
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: step === "feeding" ? 50 : 100,
              opacity: step === "feeding" ? 1 : 0,
              scale: step === "feeding" ? 1 : 0.9,
            }}
            transition={{ duration: 0.8, delay: step === "feeding" ? 0.2 : 0 }}
          >
            <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex-1 bg-background/50 rounded h-5 flex items-center px-2 text-[10px] text-muted-foreground">
                https://fellows.best
              </div>
            </div>

            <div className="p-4 bg-background/80 backdrop-blur-sm h-[250px] flex flex-col">
              <div className="mb-4 space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-muted/50 rounded animate-pulse" />
              </div>

              <div className="flex-1 relative overflow-hidden rounded-md border bg-muted/10 p-4">
                <div className="absolute inset-0 flex items-center overflow-hidden px-4">
                  <div className="flex gap-4 w-[200%] origin-left scale-75">
                    <AnimatePresence mode="popLayout">
                      {step === "feeding" &&
                        MOCK_OPPORTUNITIES.map((opp, idx) => (
                          <motion.div
                            key={opp.id}
                            className="w-[200px] shrink-0"
                            initial={{ opacity: 0, x: 0, scale: 1 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: 1 + idx * 0.8,
                              ease: "backOut",
                            }}
                          >
                            <FeedItem opp={opp} delay={1 + idx * 0.8} />
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniOpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Card className="h-[200px] flex flex-col hover:shadow-lg transition-shadow bg-card text-card-foreground">
      <CardContent className="p-3 flex-grow flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="w-8 h-8 shrink-0 rounded-md overflow-hidden border bg-muted relative">
            <Image
              src={opportunity.logoUrl}
              alt={opportunity.name}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-green-50 text-green-700 border-green-200 whitespace-nowrap shrink-0">
            12 days left
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-0.5 line-clamp-1">
            {opportunity.name}
          </h3>
          <p className="text-muted-foreground text-[10px] mb-1 line-clamp-2 leading-tight">
            {opportunity.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-[10px] text-muted-foreground mt-auto">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Dec 31</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[50px]">{opportunity.region}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-1">
          <Badge
            variant="outline"
            className="rounded-sm text-[10px] px-1.5 py-0.5 h-5"
          >
            {opportunity.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button variant="default" size="sm" className="w-full h-7 text-xs">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}

function FeedItem({ opp, delay }: { opp: Opportunity; delay: number }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="space-y-1.5 bg-background p-2 rounded-xl shadow-sm border h-[200px] w-full flex flex-col">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-6 rounded-md shrink-0" />
                <Skeleton className="h-3 w-12 rounded-full" />
              </div>
              <div className="space-y-1.5 pt-1">
                <Skeleton className="h-3 w-[90%]" />
                <Skeleton className="h-2 w-[70%]" />
              </div>
              <div className="flex gap-2 pt-3 mt-auto">
                <Skeleton className="h-2.5 w-10" />
                <Skeleton className="h-2.5 w-10" />
              </div>
              <div className="flex gap-1 pt-1">
                <Skeleton className="h-4 w-12 rounded-sm" />
              </div>
              <div className="pt-1">
                <Skeleton className="h-6 w-full rounded-md" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MiniOpportunityCard opportunity={opp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
