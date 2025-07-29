"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fellowshipOpportunities } from "@/lib/data";
import { InfiniteCarousel } from "@/components/features/infinite-carousel";
import { useState, useEffect } from "react";

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Home() {
  const [shuffledOpportunities, setShuffledOpportunities] = useState(
    fellowshipOpportunities
  );

  useEffect(() => {
    setShuffledOpportunities(shuffle([...fellowshipOpportunities]));
  }, []);

  const carousel1 = shuffledOpportunities.slice(
    0,
    Math.floor(shuffledOpportunities.length / 2)
  );
  const carousel2 = shuffledOpportunities.slice(
    Math.floor(shuffledOpportunities.length / 2)
  );

  return (
    <div className="space-y-8 py-12">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next <br />
              <span className="text-foreground">Fellowship Opportunity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover fellowships, grants, accelerators, and competitions.
              Track deadlines, get reminders, and turn opportunities into
              achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link href="/browse">
                  Discover New Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        <InfiniteCarousel opportunities={carousel1} direction="right" />
        <InfiniteCarousel opportunities={carousel2} direction="left" />
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/browse">
              View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to discover, track, and succeed in your next
            opportunity
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border/50 rounded-lg overflow-hidden shadow-lg relative">
            <div
              className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border/30"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
                }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4">
                  Discover Opportunities
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find fellowships, grants, accelerators, and competitions from
                  around the world. Our comprehensive database is updated daily
                  with new opportunities.
                </p>
              </div>
            </div>

            <div
              className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-b border-border/30"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
                }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4">Smart Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Never miss a deadline with intelligent reminders and progress
                  tracking. Monitor your applications and stay organized
                  throughout your journey.
                </p>
              </div>
            </div>

            <div
              className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-border/30 md:border-b-0 border-b"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
                }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4">
                  Advanced Filtering
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Filter by category, region, eligibility requirements, and tags
                  to find opportunities that perfectly match your profile and
                  interests.
                </p>
              </div>
            </div>

            <div
              className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.1), transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.05), transparent 70%)`,
                }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4">Curated Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every opportunity is carefully reviewed and verified for
                  authenticity. Focus on applying rather than searching through
                  unreliable sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
