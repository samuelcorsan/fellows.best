import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AIResponseCard } from "./AIResponseCard";
import { AiResponse } from "../../lib/types";

interface AIResponseDialogProps {
  isOpen: boolean;
  response: AiResponse | null;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function AIResponseDialog({
  isOpen,
  response,
  currentIndex,
  onIndexChange,
}: AIResponseDialogProps) {
  if (!response) return null;

  const currentRecommendation = response.recommendations[currentIndex];

  return (
    <div
      className={`fixed top-[20%] left-1/2 -translate-x-1/2 transform transition-opacity duration-300 ease-in-out z-40 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-background/95 border rounded-xl shadow-lg p-4 w-[90vw] max-w-lg relative mx-auto">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10 animate-pulse" />

        <div className="space-y-4">
          {response.recommendations.length > 0 ? (
            <>
              {currentRecommendation && (
                <AIResponseCard recommendation={currentRecommendation} />
              )}

              {response.recommendations.length > 1 && (
                <div className="flex items-center justify-between pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} of {response.recommendations.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onIndexChange(
                        Math.min(
                          response.recommendations.length - 1,
                          currentIndex + 1
                        )
                      )
                    }
                    disabled={
                      currentIndex === response.recommendations.length - 1
                    }
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-medium mb-2">No Matches Found</h3>
              <p className="text-sm text-muted-foreground">
                Try describing your situation or interests differently
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
