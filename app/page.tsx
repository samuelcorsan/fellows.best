import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockOpportunities } from "@/lib/data";
import { InfiniteCarousel } from "@/components/features/InfiniteCarousel";

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
  const shuffledOpportunities = shuffle([...mockOpportunities]);
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Never Miss a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fellowship Deadline
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover fellowships, grants, accelerators, and competitions.
              Track deadlines, get reminders, and turn opportunities into
              achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-5">
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

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/browse">
              View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
