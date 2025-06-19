import Link from "next/link";
import { Calendar, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">ddfellows</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Never miss a deadline again. Discover fellowships, grants,
              accelerators, and competitions tailored to your interests and
              timeline.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/timeline"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse All
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submit Opportunity
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse?category=fellowship"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fellowships
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=accelerator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accelerators
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=grant"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Grants
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=hackathon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hackathons
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 ddfellows. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
