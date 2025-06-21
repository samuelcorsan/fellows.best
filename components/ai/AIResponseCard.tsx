import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { AiRecommendation } from "../../lib/types";

interface AIResponseCardProps {
  recommendation: AiRecommendation;
}

export function AIResponseCard({ recommendation }: AIResponseCardProps) {
  return (
    <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-4 space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 overflow-hidden shrink-0">
          <img
            src={recommendation.logoUrl}
            alt={recommendation.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">
            {recommendation.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {recommendation.organizer}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1 text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">
            {recommendation.matchScore}/100
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {recommendation.description}
      </p>
      <div className="pt-2 border-t flex items-center justify-between">
        <p className="text-sm italic flex-1">{recommendation.reason}</p>
        <Button size="sm" variant="outline" className="shrink-0 ml-4" asChild>
          <Link href={`/opportunity/${recommendation.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
