"use client";

import { Share2 } from "lucide-react";
import { Opportunity } from "@/lib/data";

interface ShareButtonProps {
  opportunity: Opportunity;
  className?: string;
}

export function ShareButton({ opportunity, className }: ShareButtonProps) {
  const handleShare = () => {
    const tweetText = `Excited to share that I'm applying to ${opportunity.name}! This could be the start of an incredible new chapter.

Working toward my goals and grateful for the amazing community that keeps me motivated. Will definitely share updates as the journey unfolds!`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-1.5 h-10 px-4 text-[14px] border border-border bg-card hover:bg-accent transition-colors ${
        className || ""
      }`}
    >
      <Share2 className="h-4 w-4" />
      Share on X
    </button>
  );
}
