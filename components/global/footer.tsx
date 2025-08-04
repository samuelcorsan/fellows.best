import Link from "next/link";
import { Calendar, Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group mb-3">
              <div className="relative h-6 w-6 flex items-center justify-center">
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-medium tracking-tight">
                fellows.best
              </span>
            </Link>

            <p className="text-muted-foreground max-w-md text-sm">
              Never miss a deadline again. Discover fellowships, grants,
              accelerators, and competitions tailored to your interests and
              timeline.
            </p>
          </div>


          <div>
            <h3 className="font-semibold mb-3 text-sm">Categories</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/browse?category=fellowship"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Fellowships
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=accelerator"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Accelerators
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=grant"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Grants
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=hackathon"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Hackathons
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Connect</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:samuel@disam.dev"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
                >
                  <Mail className="h-3 w-3 mr-2" />
                  samuel@disam.dev
                </a>
              </li>
              <li>
                <Link
                  href="https://github.com/samuelcorsan/ddfellows"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
                >
                  <Github className="h-3 w-3 mr-2" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/disamdev"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
                >
                  <span className="text-xs mr-2 font-bold">𝕏</span>
                  X (Twitter)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 pt-4 text-left">
          <p className="text-sm text-muted-foreground">&copy; 2025 fellows.best. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
