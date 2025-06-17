import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center max-w-md mx-auto">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The opportunity you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/browse">
              <Search className="mr-2 h-4 w-4" />
              Browse Opportunities
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}