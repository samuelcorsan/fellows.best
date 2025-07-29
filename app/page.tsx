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

function distributeEvenly<T extends { organizer: string }>(array: T[]): T[] {
  const organizerGroups: { [key: string]: T[] } = {};
  array.forEach(item => {
    if (!organizerGroups[item.organizer]) {
      organizerGroups[item.organizer] = [];
    }
    organizerGroups[item.organizer].push(item);
  });

  const organizers = Object.keys(organizerGroups);
  const shuffledOrganizers = shuffle([...organizers]);
  
  Object.keys(organizerGroups).forEach(org => {
    organizerGroups[org] = shuffle(organizerGroups[org]);
  });
  
  const result: T[] = [];
  let maxItemsPerOrg = Math.max(...Object.values(organizerGroups).map(group => group.length));
  
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
  const [distributedCarousel1, setDistributedCarousel1] = useState<typeof fellowshipOpportunities>([]);
  const [distributedCarousel2, setDistributedCarousel2] = useState<typeof fellowshipOpportunities>([]);
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
        
        <div className="space-y-4">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll-reverse" style={{ animationDuration: "80s" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`skeleton-1-${i}`} className="w-[320px] h-[320px] shrink-0 bg-card border rounded-lg flex flex-col animate-pulse">
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
          
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll" style={{ animationDuration: "80s" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`skeleton-2-${i}`} className="w-[320px] h-[320px] shrink-0 bg-card border rounded-lg flex flex-col animate-pulse">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover, track, and succeed in your next
              opportunity
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 border border-border/50 rounded-lg overflow-hidden shadow-lg relative">
              <div className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-b border-border/30">
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

              <div className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-b border-border/30">
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-4">Timeline & Calendar</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Visualize all application deadlines in an interactive timeline 
                    view and export important dates directly to your calendar. 
                    Track opening and closing dates across time to plan your applications strategically.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-r border-border/30 md:border-b-0 border-b">
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

              <div className="group relative p-8 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden">
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

      <div className="space-y-4">
        <InfiniteCarousel opportunities={distributedCarousel1} direction="right" speed="slow" from="home" />
        <InfiniteCarousel opportunities={distributedCarousel2} direction="left" speed="slow" from="home" />
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
