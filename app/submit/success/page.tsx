"use client";

import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import useWindowSize from "react-use/lib/useWindowSize";

export default function SubmissionSuccessPage() {
  const router = useRouter();
  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen px-4">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          You&apos;re a star! ✨
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Thanks for sharing. Our team of highly-trained squirrels is now
          reviewing your submission.
        </p>
        <Button onClick={() => router.push("/browse")} size="lg">
          Find Another Gem
        </Button>
      </div>
    </div>
  );
}
