"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/lib/data";

interface ShareButtonProps {
  opportunity: Opportunity;
  className?: string;
}

export function ShareButton({ opportunity, className }: ShareButtonProps) {
  const handleShare = () => {
    const tweetText = `I'm delighted to share that I've applied to ${opportunity.name} to elevate my startup's trajectory, tap into tailored mentorship, and collaborate with fellow innovators.

Can't wait to dive in and share updates as the journey unfolds!`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={`flex items-center ${className || ""}`}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share on X
    </Button>
  );
}