import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ViewAllOpportunitiesSection() {
  return (
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
  );
}