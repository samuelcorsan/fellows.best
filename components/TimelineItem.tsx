import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Opportunity,
  getDaysUntilDeadline,
  getDeadlineUrgency,
} from "@/lib/data";

interface TimelineItemProps {
  opportunity: Opportunity;
  onClick: () => void;
  variant: "desktop" | "mobile";
}

export function TimelineItem({ opportunity, onClick }: TimelineItemProps) {
  const daysUntil = opportunity.closeDate
    ? getDaysUntilDeadline(opportunity.closeDate)
    : null;
  const urgency = opportunity.closeDate
    ? getDeadlineUrgency(opportunity.closeDate)
    : "safe";

  const urgencyStyles = {
    safe: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    urgent:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Image
            src={opportunity.logoUrl}
            alt={`${opportunity.name} logo`}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1">{opportunity.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {opportunity.description}
            </p>

            <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{opportunity.region}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                <Badge variant="outline" className="text-xs">
                  {opportunity.category}
                </Badge>
                {opportunity.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {opportunity.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{opportunity.tags.length - 2}
                  </Badge>
                )}
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ml-2 ${urgencyStyles[urgency]}`}
              >
                {daysUntil !== null
                  ? daysUntil > 0
                    ? `${daysUntil}d`
                    : "Closed"
                  : "No date"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
