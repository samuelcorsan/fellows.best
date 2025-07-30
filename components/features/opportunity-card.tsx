import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Opportunity,
  getDaysUntilDeadline,
  getDeadlineUrgency,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const getDeadlineText = (days: number | null): string => {
  if (days === null) return "Apply anytime";
  if (days > 1) return `${days} days left`;
  if (days === 1) return "1 day left";
  if (days === 0) return "Closed today";

  const daysAgo = Math.abs(days);
  if (daysAgo === 1) return "Closed yesterday";
  if (daysAgo < 7) return `Closed ${daysAgo} days ago`;

  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo === 1) return "Closed 1 week ago";
  if (weeksAgo < 5) return `Closed ${weeksAgo} weeks ago`;

  const monthsAgo = Math.floor(daysAgo / 30.44);
  if (monthsAgo === 1) return `Closed 1 month ago`;
  if (monthsAgo < 12) return `Closed ${monthsAgo} months ago`;

  const yearsAgo = Math.floor(daysAgo / 365.25);
  if (yearsAgo === 1) return `Closed 1 year ago`;
  return `Closed ${yearsAgo} years ago`;
};

const getShortDeadlineText = (days: number | null): string => {
  if (days === null) return "Rolling";
  if (days > 1) return `${days}d left`;
  if (days === 1) return `1d left`;
  return "Closed";
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: "default" | "compact";
  className?: string;
  isCarousel?: boolean;
  from?: string;
}

export function OpportunityCard({
  opportunity,
  variant = "default",
  className,
  isCarousel = false,
  from,
}: OpportunityCardProps) {
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
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
  };

  const getOpportunityUrl = () => {
    const baseUrl = `/opportunity/${opportunity.id}`;
    return from ? `${baseUrl}?from=${from}` : baseUrl;
  };

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col",
          className
        )}
      >
        <CardContent className="p-4 flex-grow">
          <div className="flex items-start space-x-3">
            <Image
              src={opportunity.logoUrl}
              alt={`${opportunity.name} logo`}
              width={40}
              height={40}
              className="rounded-lg object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAHA//EACUQAAIBAwMEAgMBAAAAAAAAAAECAwAEEQUSITFBUWFxBhMiMpH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgME/8QAHhEAAgICAwEBAAAAAAAAAAAAAAECEQMhEjFBUWH/2gAMAwEAAhEDEQA/AO5ooor0HFFFFFAFFFFABRRRQAUUUUAf/9k="
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">
                {opportunity.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {opportunity.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs rounded-lg">
                    {opportunity.category}
                  </Badge>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${urgencyStyles[urgency]}`}
                >
                  {getDeadlineText(daysUntil)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild size="sm" className="w-full">
            <Link href={getOpportunityUrl()}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col",
        isCarousel ? "h-[320px]" : "",
        className
      )}
    >
      <CardContent className="p-6 flex-grow">
        <div className="flex items-start space-x-4">
          <Image
            src={opportunity.logoUrl}
            alt={`${opportunity.name} logo`}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAHA//EACUQAAIBAwMEAgMBAAAAAAAAAAECAwAEEQUSITFBUWFxBhMiMpH/xAAXAQADAQAAAAAAAAAAAAAAAAABAgME/8QAHhEAAgICAwEBAAAAAAAAAAAAAAECEQMhEjFBUWH/2gAMAwEAAhEDEQA/AO5ooor0HFFFFFAFFFFABRRRQAUUUUAf/9k="
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                  {opportunity.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {opportunity.description}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ml-2 ${urgencyStyles[urgency]}`}
              >
                <span className="hidden sm:inline">
                  {getDeadlineText(daysUntil)}
                </span>
                <span className="sm:hidden">
                  {getShortDeadlineText(daysUntil)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {opportunity.closeDate
                    ? `Closes ${new Date(
                        opportunity.closeDate
                      ).toLocaleDateString()}`
                    : "Rolling deadline"}
                </span>
                <span className="sm:hidden">
                  {opportunity.closeDate
                    ? new Date(opportunity.closeDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )
                    : "Rolling"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.region}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-lg">{opportunity.category}</Badge>
                {opportunity.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs rounded-lg">
                    {tag}
                  </Badge>
                ))}
                {opportunity.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs rounded-lg">
                    +{opportunity.tags.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/50 flex items-center justify-between">
        {isCarousel ? (
          <Button asChild className="w-full">
            <Link href={getOpportunityUrl()}>View Details</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href={getOpportunityUrl()}>
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
              </Link>
            </Button>
            <Button asChild>
              <a
                href={opportunity.applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hidden sm:inline">Apply Now</span>
                <span className="sm:hidden">Apply</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
