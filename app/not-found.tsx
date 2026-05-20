import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ACCENT = "#5b6cff";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 py-3 flex items-center gap-3">
          <Link href="/" className="shrink-0">
            <span className="font-semibold tracking-tight text-[17px] hover:underline underline-offset-4 decoration-2">
              fellows.best
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-24">
        <div className="max-w-md">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-3">
            Page not found
          </h1>
          <p className="text-[15px] text-muted-foreground mb-8 leading-relaxed">
            The opportunity you&apos;re looking for doesn&apos;t exist or may
            have been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-white text-[14px] font-medium"
            style={{ background: ACCENT }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
