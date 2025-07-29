import { useState, useRef, useCallback, useMemo, useEffect, useImperativeHandle, forwardRef } from "react";
import { Opportunity } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineProps {
  opportunities: Opportunity[];
  onItemClick: (opportunity: Opportunity) => void;
  onScrollStateChange?: (canScrollLeft: boolean, canScrollRight: boolean) => void;
}

export interface TimelineRef {
  scrollLeft: () => void;
  scrollRight: () => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    accelerator: { bar: "bg-red-500/40 dark:bg-red-600/40", solid: "bg-red-500 dark:bg-red-600" },
    fellowship: { bar: "bg-orange-500/40 dark:bg-orange-600/40", solid: "bg-orange-500 dark:bg-orange-600" },
    grant: { bar: "bg-yellow-500/40 dark:bg-yellow-600/40", solid: "bg-yellow-500 dark:bg-yellow-600" },
    residency: { bar: "bg-green-500/40 dark:bg-green-600/40", solid: "bg-green-500 dark:bg-green-600" },
    competition: { bar: "bg-blue-500/40 dark:bg-blue-600/40", solid: "bg-blue-500 dark:bg-blue-600" },
    research: { bar: "bg-purple-500/40 dark:bg-purple-600/40", solid: "bg-purple-500 dark:bg-purple-600" },
  };
  return colors[category as keyof typeof colors] || colors.accelerator;
};

const getCategoryIcon = (category: string) => {
  const icons = {
    accelerator: "🚀",
    fellowship: "🎓",
    grant: "💰",
    residency: "🏠",
    competition: "🏆",
    research: "🔬",
  };
  return icons[category as keyof typeof icons] || "📋";
};

export const Timeline = forwardRef<TimelineRef, TimelineProps>(({ opportunities, onItemClick, onScrollStateChange }, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const validOpportunities = useMemo(() => 
    opportunities.filter(opp => opp.closeDate), 
    [opportunities]
  );
  
  const dateRange = useMemo(() => {
    if (validOpportunities.length === 0) {
      return {
        start: new Date(currentYear - 1, 0, 1),
        end: new Date(currentYear + 2, 11, 31)
      };
    }
    
    const dates = validOpportunities
      .map(opp => new Date(opp.closeDate!))
      .filter(date => !isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (dates.length === 0) {
      return {
        start: new Date(currentYear - 1, 0, 1),
        end: new Date(currentYear + 2, 11, 31)
      };
    }
    
    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    
    const start = new Date(Math.min(firstDate.getTime(), today.getTime()));
    start.setMonth(start.getMonth() - 2);
    start.setDate(1);
    
    const end = new Date(Math.max(lastDate.getTime(), today.getTime()));
    end.setMonth(end.getMonth() + 2);
    end.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    
    return { start, end };
  }, [validOpportunities, today, currentYear]);
  
  const [viewStart] = useState(() => dateRange.start);
  const [viewEnd] = useState(() => dateRange.end);
  
  if (validOpportunities.length === 0) return null;

  const PIXELS_PER_DAY = 2;
  const MONTH_WIDTH = 150;

  const months = useMemo(() => {
    const monthList = [];
    const current = new Date(viewStart.getFullYear(), viewStart.getMonth(), 1);
    
    while (current <= viewEnd) {
      const daysFromStart = Math.ceil((current.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24));
      monthList.push({
        date: new Date(current),
        label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        position: Math.max(0, Math.floor(daysFromStart / 30) * MONTH_WIDTH),
        key: `${current.getFullYear()}-${current.getMonth()}`
      });
      current.setMonth(current.getMonth() + 1);
    }
    return monthList;
  }, [viewStart, viewEnd]);

  const getBarPosition = useCallback((opportunity: Opportunity) => {
    if (!opportunity.closeDate) return null;
    
    const startDate = opportunity.openDate ? new Date(opportunity.openDate) : today;
    const endDate = new Date(opportunity.closeDate);
    
    const startDays = Math.ceil((startDate.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24));
    const endDays = Math.ceil((endDate.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24));
    
    const leftPos = Math.max(0, Math.floor(startDays / 30) * MONTH_WIDTH);
    const rightPos = Math.floor(endDays / 30) * MONTH_WIDTH;
    const width = Math.max(80, rightPos - leftPos);
    
    return {
      left: leftPos,
      width: width,
    };
  }, [viewStart, today]);

  const positionedOpportunities = useMemo(() => 
    validOpportunities.map(opp => ({
      ...opp,
      position: getBarPosition(opp)
    })).filter(opp => opp.position),
    [validOpportunities, getBarPosition]
  );

  const dateOptions = useMemo(() => {
    const options = [];
    const current = new Date(viewStart);
    
    while (current <= viewEnd) {
      options.push({
        value: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
        label: current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
      current.setMonth(current.getMonth() + 1);
    }
    return options;
  }, [viewStart, viewEnd]);

  const scrollToDate = useCallback((dateString: string) => {
    if (!scrollRef.current || !dateString) return;
    
    const [year, month] = dateString.split('-').map(Number);
    const targetDate = new Date(year, month - 1, 1);
    
    if (targetDate < viewStart || targetDate > viewEnd) {
      return;
    }
    
    const monthsFromStart = (targetDate.getFullYear() - viewStart.getFullYear()) * 12 + 
                           (targetDate.getMonth() - viewStart.getMonth());
    const scrollPosition = monthsFromStart * MONTH_WIDTH - scrollRef.current.clientWidth / 2;
    
    scrollRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }, [viewStart, viewEnd]);

  const scrollToToday = useCallback(() => {
    if (!scrollRef.current) return;
    
    const monthsFromStart = (today.getFullYear() - viewStart.getFullYear()) * 12 + 
                           (today.getMonth() - viewStart.getMonth());
    const scrollPosition = monthsFromStart * MONTH_WIDTH - scrollRef.current.clientWidth / 2;
    
    scrollRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }, [viewStart, today]);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const newCanScrollLeft = scrollLeft > 0;
    const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    
    setCanScrollLeft(newCanScrollLeft);
    setCanScrollRight(newCanScrollRight);
    
    if (onScrollStateChange) {
      onScrollStateChange(newCanScrollLeft, newCanScrollRight);
    }
  }, [onScrollStateChange]);

  const scrollTimeline = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = MONTH_WIDTH * 3;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(updateScrollButtons, 300);
  }, [updateScrollButtons]);

  const totalWidth = months.length * MONTH_WIDTH;

  useImperativeHandle(ref, () => ({
    scrollLeft: () => scrollTimeline('left'),
    scrollRight: () => scrollTimeline('right'),
  }), [scrollTimeline]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToToday();
      updateScrollButtons();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [scrollToToday, updateScrollButtons]);
  
  useEffect(() => {
    const handleScroll = () => updateScrollButtons();
    const scrollElement = scrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      updateScrollButtons();
      
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [updateScrollButtons]);

  return (
    <TooltipProvider>
      <div className="w-full">
        <div className="w-full bg-background">

          <div 
            className="overflow-x-auto overflow-y-hidden"
            ref={scrollRef}
            style={{ scrollbarWidth: 'thin' }}
          >
            <div style={{ width: `${totalWidth}px`, minWidth: '100%' }} className="relative bg-background">
              <div className="sticky top-0 z-10 border-b border-border bg-muted/20 px-6 py-4">
                <div className="relative h-6">
                  {months.map((month) => (
                    <div
                      key={month.key}
                      className="absolute text-sm font-medium text-foreground whitespace-nowrap"
                      style={{ left: `${month.position}px` }}
                    >
                      {month.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative px-6 py-8" style={{ height: `${positionedOpportunities.length * 60 + 60}px` }}>
                <div 
                  className="absolute inset-x-6 top-8 bottom-8 opacity-20"
                  style={{
                    backgroundImage: months.map((month) => 
                      `linear-gradient(to right, transparent ${month.position}px, hsl(var(--border)) ${month.position}px, hsl(var(--border)) ${month.position + 1}px, transparent ${month.position + 1}px)`
                    ).join(', ')
                  }}
                />

                <div className="relative">
                  {positionedOpportunities.map((opportunity, index) => {
                    const colors = getCategoryColor(opportunity.category);
                    const icon = getCategoryIcon(opportunity.category);
                    const isHovered = hoveredItem === opportunity.id;

                    return (
                      <Tooltip key={opportunity.id}>
                        <TooltipTrigger asChild>
                          <div
                            className={`absolute cursor-pointer transition-all duration-200 ${
                              isHovered ? 'z-20 scale-105' : 'z-10'
                            }`}
                            style={{
                              left: `${opportunity.position!.left}px`,
                              width: `${opportunity.position!.width}px`,
                              height: '48px',
                              top: `${index * 60 + 20}px`
                            }}
                            onMouseEnter={() => setHoveredItem(opportunity.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => onItemClick(opportunity)}
                          >
                            <div
                              className={`h-full rounded-lg shadow-md border border-border/50 bg-muted dark:bg-muted ${
                                isHovered ? 'shadow-lg border-border bg-muted/80 dark:bg-muted/80' : ''
                              } flex items-center px-4 text-foreground font-medium text-sm overflow-hidden transition-all`}
                            >
                              <span className="mr-3 text-base flex-shrink-0">{icon}</span>
                              <span className="truncate flex-1 font-semibold">{opportunity.name}</span>
                              {opportunity.position!.width > 160 ? (
                                <Badge 
                                  variant="secondary" 
                                  className={`ml-3 mr-2 px-3 py-1 text-xs ${colors.bar} text-foreground border-0 flex-shrink-0 rounded-lg`}
                                >
                                  {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
                                </Badge>
                              ) : opportunity.position!.width > 80 ? (
                                <Badge 
                                  variant="secondary" 
                                  className={`ml-3 mr-2 px-2 py-1 text-xs ${colors.bar} text-foreground border-0 flex-shrink-0 rounded-lg`}
                                >
                                  {opportunity.category.charAt(0).toUpperCase()}
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-sm">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-base">{icon}</span>
                              <span className="font-semibold">{opportunity.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {opportunity.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Opens: {opportunity.openDate ? 
                                    new Date(opportunity.openDate).toLocaleDateString() : 
                                    'Now'
                                  }
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  Closes: {new Date(opportunity.closeDate!).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 col-span-2">
                                <MapPin className="h-3 w-3" />
                                <span>{opportunity.region}</span>
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
});

Timeline.displayName = 'Timeline';