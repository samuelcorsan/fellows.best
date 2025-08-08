import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
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
  );
}