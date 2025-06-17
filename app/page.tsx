import Link from "next/link";
import { ArrowRight, Calendar, Search, Bell, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityCard } from "@/components/features/OpportunityCard";
import { getUpcomingDeadlines } from "@/lib/data";

export default function Home() {
  const upcomingDeadlines = getUpcomingDeadlines(8);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
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
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/timeline">
                  Explore Timeline
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                <Link href="/browse">Browse All Opportunities</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ddfellow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover, track, and apply to opportunities
              that matter to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Timeline View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize all deadlines chronologically with our interactive
                  timeline interface.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Smart Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find exactly what you're looking for with advanced filters and
                  search capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Smart Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Never miss a deadline with intelligent notifications and
                  calendar integration.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-click calendar exports, application tracking, and
                  opportunity bookmarking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Deadlines
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't let these opportunities slip away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {upcomingDeadlines.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/browse">
              View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Ready to Discover Your Next Opportunity?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of ambitious individuals who never miss a deadline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="default"
                className="text-lg px-8 py-4"
              >
                <Link href="/timeline">Start Exploring</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                <Link href="/submit">Submit an Opportunity</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
