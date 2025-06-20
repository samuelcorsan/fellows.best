"use client";

import { useState } from "react";
import { Timeline } from "@/components/features/Timeline";
import { mockOpportunities, Opportunity } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarButton } from "@/components/global/CalendarButton";
import { NotificationToggle } from "@/components/global/NotificationToggle";
import { Calendar, MapPin, ExternalLink, Share2, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function TimelinePage() {
  const { data: session, isPending } = authClient.useSession();
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const activeOpportunities = mockOpportunities.filter((opp) => {
    if (!opp.closeDate) return true;
    return new Date(opp.closeDate) > new Date();
  });

  const handleShare = (opportunity: Opportunity) => {
    const tweetText = `I'm delighted to share that I've applied to ${opportunity.name} to elevate my startup's trajectory, tap into tailored mentorship, and collaborate with fellow innovators.

Can't wait to dive in and share updates as the journey unfolds.`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      toast.success("Signed in successfully");
      setIsSignInOpen(false);
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6 p-4 rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Timeline View Locked</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sign in to access the timeline view and track application
              deadlines for all opportunities in one place.
            </p>
            <Button onClick={() => setIsSignInOpen(true)} size="lg">
              Sign in to Access Timeline
            </Button>
          </div>
        </div>

        <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                Welcome to ddfellows
              </DialogTitle>
              <DialogDescription className="text-center">
                Continue with Google to access the timeline view
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 justify-center py-6">
              <Button
                variant="outline"
                className="w-full max-w-sm h-12 font-medium"
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Timeline
        opportunities={activeOpportunities}
        onItemClick={setSelectedOpportunity}
      />

      <Dialog
        open={!!selectedOpportunity}
        onOpenChange={() => setSelectedOpportunity(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <div className="flex items-start space-x-4">
                  <Image
                    src={selectedOpportunity.logoUrl}
                    alt={`${selectedOpportunity.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">
                      {selectedOpportunity.name}
                    </DialogTitle>
                    <p className="text-muted-foreground mb-4">
                      {selectedOpportunity.organizer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {selectedOpportunity.category}
                      </Badge>
                      {selectedOpportunity.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Opens:</strong>{" "}
                      {selectedOpportunity.openDate
                        ? new Date(
                            selectedOpportunity.openDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Closes:</strong>{" "}
                      {selectedOpportunity.closeDate
                        ? new Date(
                            selectedOpportunity.closeDate
                          ).toLocaleDateString()
                        : "Rolling"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Region:</strong> {selectedOpportunity.region}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedOpportunity.fullDescription}
                  </p>
                </div>

                {selectedOpportunity.benefits.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedOpportunity.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Eligibility</h3>
                  <p className="text-muted-foreground">
                    {selectedOpportunity.eligibility}
                  </p>
                </div>

                {selectedOpportunity.closeDate && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3">Add to Calendar</h3>
                      <CalendarButton opportunity={selectedOpportunity} />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      <NotificationToggle
                        opportunityId={selectedOpportunity.id}
                        opportunityName={selectedOpportunity.name}
                        closeDate={selectedOpportunity.closeDate}
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button asChild className="flex-1">
                    <a
                      href={selectedOpportunity.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/opportunity/${selectedOpportunity.id}`}>
                      View Full Details
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare(selectedOpportunity)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on X
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
