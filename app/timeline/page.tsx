"use client";

import { useState } from "react";
import { Timeline } from "@/components/features/timeline";
import { fellowshipOpportunities, Opportunity } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarButton } from "@/components/global/calendar-button";
import { NotificationToggle } from "@/components/global/notification-toggle";
import { Calendar, MapPin, ExternalLink, Share2, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "@/components/global/sign-in-dialog";

export default function TimelinePage() {
  const { data: session, isPending } = authClient.useSession();
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const activeOpportunities = fellowshipOpportunities.filter((opp) => {
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

        <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
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
