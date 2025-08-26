"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface BadgeListProps {
  badges: string[];
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  badgeClassName?: string;
  maxVisible?: number;
  showMoreText?: string;
  simple?: boolean;
}

export function BadgeList({
  badges,
  variant = "secondary",
  className = "",
  badgeClassName = "text-xs rounded-lg h-6 px-2.5 py-0.5",
  maxVisible = 5,
  showMoreText = "more",
  simple = false,
}: BadgeListProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (badges.length === 0) {
    return null;
  }

  const visibleBadges = badges.slice(0, maxVisible);
  const hiddenBadges = badges.slice(maxVisible);
  const hasHiddenBadges = hiddenBadges.length > 0;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleBadges.map((badge) => (
        <Badge key={badge} variant={variant} className={badgeClassName}>
          {badge}
        </Badge>
      ))}

      {hasHiddenBadges &&
        (simple ? (
          <Badge variant="outline" className={badgeClassName}>
            +{hiddenBadges.length} {showMoreText}
          </Badge>
        ) : (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Badge
                variant="outline"
                className={`${badgeClassName} border-dashed hover:border-solid cursor-pointer`}
              >
                +{hiddenBadges.length} {showMoreText}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex flex-wrap gap-2 max-w-xs">
                {hiddenBadges.map((badge) => (
                  <Badge
                    key={badge}
                    variant={variant}
                    className={badgeClassName}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ))}
    </div>
  );
}
