"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Filter,
  Bell,
  Clock,
  Search,
  Users,
} from "lucide-react";
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

function distributeEvenly<T extends { organizer: string }>(array: T[]): T[] {
  const organizerGroups: { [key: string]: T[] } = {};
  array.forEach((item) => {
    if (!organizerGroups[item.organizer]) {
      organizerGroups[item.organizer] = [];
    }
    organizerGroups[item.organizer].push(item);
  });

  const organizers = Object.keys(organizerGroups);
  const shuffledOrganizers = shuffle([...organizers]);

  Object.keys(organizerGroups).forEach((org) => {
    organizerGroups[org] = shuffle(organizerGroups[org]);
  });

  const result: T[] = [];
  let maxItemsPerOrg = Math.max(
    ...Object.values(organizerGroups).map((group) => group.length)
  );

  for (let round = 0; round < maxItemsPerOrg; round++) {
    for (const org of shuffledOrganizers) {
      if (organizerGroups[org].length > round) {
        result.push(organizerGroups[org][round]);
      }
    }
  }

  return result;
}

export default function Home() {
  const [distributedCarousel1, setDistributedCarousel1] = useState<
    typeof fellowshipOpportunities
  >([]);
  const [distributedCarousel2, setDistributedCarousel2] = useState<
    typeof fellowshipOpportunities
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const distributed = distributeEvenly([...fellowshipOpportunities]);
    const midpoint = Math.floor(distributed.length / 2);
    const carousel1 = distributed.slice(0, midpoint);
    const carousel2 = distributed.slice(midpoint);

    setDistributedCarousel1(distributeEvenly([...carousel1]));
    setDistributedCarousel2(distributeEvenly([...carousel2]));
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-8 py-12">
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your Next <br />
                <span className="text-foreground">Fellowship Opportunity</span>
              </h1>
              <h2 className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Discover fellowships, grants, accelerators, and competitions.
                Track deadlines, get reminders, and turn opportunities into
                achievements.
              </h2>
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

        <div className="space-y-2 sm:space-y-4">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div
              className="flex min-w-full shrink-0 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4 w-max flex-nowrap animate-scroll-reverse"
              style={{ animationDuration: "80s" }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={`skeleton-1-${i}`}
                  className="w-[280px] sm:w-[320px] lg:w-[350px] h-[280px] sm:h-[320px] shrink-0 bg-card border rounded-lg flex flex-col animate-pulse"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start space-x-4">
                      <div className="w-[60px] h-[60px] bg-muted rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="h-5 bg-muted rounded w-3/4 mb-1" />
                            <div className="h-4 bg-muted rounded w-full mb-1" />
                            <div className="h-4 bg-muted rounded w-5/6" />
                          </div>
                          <div className="h-8 bg-muted rounded-full w-20 ml-2" />
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="h-4 bg-muted rounded w-24" />
                          <div className="h-4 bg-muted rounded w-16" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <div className="h-6 bg-muted rounded-full w-16" />
                            <div className="h-6 bg-muted rounded-full w-20" />
                            <div className="h-6 bg-muted rounded-full w-14" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/50">
                    <div className="h-10 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div
              className="flex min-w-full shrink-0 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4 w-max flex-nowrap animate-scroll"
              style={{ animationDuration: "80s" }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={`skeleton-2-${i}`}
                  className="w-[280px] sm:w-[320px] lg:w-[350px] h-[280px] sm:h-[320px] shrink-0 bg-card border rounded-lg flex flex-col animate-pulse"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start space-x-4">
                      <div className="w-[60px] h-[60px] bg-muted rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="h-5 bg-muted rounded w-3/4 mb-1" />
                            <div className="h-4 bg-muted rounded w-full mb-1" />
                            <div className="h-4 bg-muted rounded w-5/6" />
                          </div>
                          <div className="h-8 bg-muted rounded-full w-20 ml-2" />
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="h-4 bg-muted rounded w-24" />
                          <div className="h-4 bg-muted rounded w-16" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            <div className="h-6 bg-muted rounded-full w-16" />
                            <div className="h-6 bg-muted rounded-full w-20" />
                            <div className="h-6 bg-muted rounded-full w-14" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/50">
                    <div className="h-10 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              What You Get
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand your users:
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-lg overflow-hidden shadow-lg relative">
              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border lg:border-b-0"
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
                  <div className="flex items-center mb-5">
                    <Search className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Discovery
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Opportunity Aggregation</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Browse fellowships, grants, accelerators, hackathons, and
                    funding opportunities from diverse sources all in one
                    centralized platform.
                  </p>
                </div>
              </div>

              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 lg:border-r lg:border-b-0"
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
                  <div className="flex items-center mb-5">
                    <Filter className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Filtering
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Advanced Search</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Filter opportunities by region, category, deadline status,
                    keywords, and tags to find exactly what matches your
                    interests and profile.
                  </p>
                </div>
              </div>

              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-b border-border md:border-r lg:border-r-0 lg:border-b-0"
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
                  <div className="flex items-center mb-5">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Timeline
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Deadline Visualization</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Visualize upcoming deadlines over weeks and months in an
                    interactive timeline view to plan your applications
                    strategically.
                  </p>
                </div>
              </div>

              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-b-0 lg:border-b"
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
                  <div className="flex items-center mb-5">
                    <Bell className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Reminders
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Smart Alerts</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Save opportunity deadlines directly to your calendar and
                    never miss an application window with integrated calendar
                    exports.
                  </p>
                </div>
              </div>

              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 md:border-b-0 lg:border-r lg:border-b"
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
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <span className="text-sm font-medium text-primary">
                        Dashboard
                      </span>
                    </div>
                    <span className="text-xs bg-gray-700 text-white px-3 py-1 rounded-lg font-medium">
                      Soon
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Personal Tracking</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Save fellowships you've attended in your profile, ask alumni
                    for recommendations to join, and build your fellowship
                    network.
                  </p>
                </div>
              </div>

              <div
                className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden"
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
                  <div className="flex items-center mb-5">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Community
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">Community Driven</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Submit new opportunities through our community-driven
                    platform. Help others discover amazing fellowships and
                    funding opportunities.
                  </p>
                </div>
              </div>

              <div
                className="absolute hidden md:block w-full h-px bg-border"
                style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
              ></div>
              <div
                className="absolute hidden lg:block w-3 h-px bg-black"
                style={{
                  left: "33.333%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="absolute hidden lg:block w-px h-3 bg-black"
                style={{
                  left: "33.333%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>

              <div
                className="absolute hidden lg:block w-3 h-px bg-black"
                style={{
                  left: "66.666%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="absolute hidden lg:block w-px h-3 bg-black"
                style={{
                  left: "66.666%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-12">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next <br />
              <span className="text-foreground">Fellowship Opportunity</span>
            </h1>
            <h2 className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover fellowships, grants, accelerators, and competitions.
              Track deadlines, get reminders, and turn opportunities into
              achievements.
            </h2>
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

      <div className="space-y-2 sm:space-y-4">
        <InfiniteCarousel
          opportunities={distributedCarousel1}
          direction="right"
          speed="slow"
          from="home"
        />
        <InfiniteCarousel
          opportunities={distributedCarousel2}
          direction="left"
          speed="slow"
          from="home"
        />
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
          <h2 className="text-2xl md:text-3xl font-medium mb-4">What You Get</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to discover and track fellowship opportunities
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-lg overflow-hidden relative">
            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border lg:border-b-0"
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
                <div className="flex items-center mb-5">
                  <Search className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Discovery
                  </span>
                </div>
                <h3 className="text-xl mb-2">Opportunity Aggregation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Browse fellowships, grants, accelerators, hackathons, and
                  funding opportunities from diverse sources all in one
                  centralized platform.
                </p>
              </div>
            </div>

            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 lg:border-r lg:border-b-0"
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
                <div className="flex items-center mb-5">
                  <Filter className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Filtering
                  </span>
                </div>
                <h3 className="text-xl mb-2">Advanced Search</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Filter opportunities by region, category, deadline status,
                  keywords, and tags to find exactly what matches your interests
                  and profile.
                </p>
              </div>
            </div>

            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-b border-border md:border-r lg:border-r-0 lg:border-b-0"
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
                <div className="flex items-center mb-5">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Timeline
                  </span>
                </div>
                <h3 className="text-xl mb-2">Deadline Visualization</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Visualize upcoming deadlines over weeks and months in an
                  interactive timeline view to plan your applications
                  strategically.
                </p>
              </div>
            </div>

            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-b-0 lg:border-b"
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
                <div className="flex items-center mb-5">
                  <Bell className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Reminders
                  </span>
                </div>
                <h3 className="text-xl mb-2">Smart Alerts</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Save opportunity deadlines directly to your calendar and never
                  miss an application window with integrated calendar exports.
                </p>
              </div>
            </div>

            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border md:border-r-0 md:border-b-0 lg:border-r lg:border-b"
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
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-primary">
                      Dashboard
                    </span>
                  </div>
                  <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-lg font-medium">
                    Soon
                  </span>
                </div>
                <h3 className="text-xl mb-2">Personal Tracking</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Save fellowships you've attended in your profile, ask alumni
                  for recommendations to join, and build your fellowship
                  network.
                </p>
              </div>
            </div>

            <div
              className="group relative px-8 py-10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden"
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
                <div className="flex items-center mb-5">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm font-medium text-primary">
                    Community
                  </span>
                </div>
                <h3 className="text-xl mb-2">Community Driven</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Submit new opportunities through our community-driven
                  platform. Help others discover amazing fellowships and funding
                  opportunities.
                </p>
              </div>
            </div>

            <div
              className="absolute hidden md:block w-full h-px bg-border"
              style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
            ></div>
            <div
              className="absolute hidden lg:block w-3 h-px bg-black dark:bg-white"
              style={{
                left: "33.333%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="absolute hidden lg:block w-px h-3 bg-black dark:bg-white"
              style={{
                left: "33.333%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>

            <div
              className="absolute hidden lg:block w-3 h-px bg-black dark:bg-white"
              style={{
                left: "66.666%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="absolute hidden lg:block w-px h-3 bg-black dark:bg-white"
              style={{
                left: "66.666%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}
