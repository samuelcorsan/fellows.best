import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Opportunity, getDaysUntilDeadline, getDeadlineUrgency } from '@/lib/data';

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'default' | 'compact';
}

export function OpportunityCard({ opportunity, variant = 'default' }: OpportunityCardProps) {
  const daysUntil = getDaysUntilDeadline(opportunity.closeDate);
  const urgency = getDeadlineUrgency(opportunity.closeDate);
  
  const urgencyStyles = {
    safe: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
    urgent: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Image
              src={opportunity.logoUrl}
              alt={`${opportunity.name} logo`}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{opportunity.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {opportunity.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {opportunity.category}
                  </Badge>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${urgencyStyles[urgency]}`}>
                  {daysUntil > 0 ? `${daysUntil} days left` : 'Closed'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild size="sm" className="w-full">
            <Link href={`/opportunity/${opportunity.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Image
            src={opportunity.logoUrl}
            alt={`${opportunity.name} logo`}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{opportunity.name}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {opportunity.description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ml-2 ${urgencyStyles[urgency]}`}>
                <span className="hidden sm:inline">
                  {daysUntil > 0 ? `${daysUntil} days left` : 'Closed'}
                </span>
                <span className="sm:hidden">
                  {daysUntil > 0 ? `${daysUntil}d` : 'Closed'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Closes {new Date(opportunity.closeDate).toLocaleDateString()}</span>
                <span className="sm:hidden">{new Date(opportunity.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.region}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{opportunity.category}</Badge>
                {opportunity.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {opportunity.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{opportunity.tags.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/50 flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href={`/opportunity/${opportunity.id}`}>
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </Link>
        </Button>
        <Button asChild>
          <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
            <span className="hidden sm:inline">Apply Now</span>
            <span className="sm:hidden">Apply</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}