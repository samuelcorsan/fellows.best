"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Calendar,
  List,
  Plus,
  Moon,
  Sun,
  Home,
  Github,
} from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      const mainElement = document.querySelector("main");
      const footerElement = document.querySelector("footer");
      if (mainElement) mainElement.style.filter = "blur(8px)";
      if (footerElement) footerElement.style.filter = "blur(8px)";
      document.body.style.overflow = "hidden";
    } else {
      const mainElement = document.querySelector("main");
      const footerElement = document.querySelector("footer");
      if (mainElement) mainElement.style.filter = "";
      if (footerElement) footerElement.style.filter = "";
      document.body.style.overflow = "";
    }

    return () => {
      const mainElement = document.querySelector("main");
      const footerElement = document.querySelector("footer");
      if (mainElement) mainElement.style.filter = "";
      if (footerElement) footerElement.style.filter = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: List },
    { name: "Submit", href: "/submit", icon: Plus },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="flex-1">
              <Link
                href="/"
                className="flex items-center space-x-3 group w-fit"
              >
                <div className="relative h-8 w-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/10" />
                  <Calendar
                    className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xl font-medium tracking-tight">
                  fellows.best
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button asChild>
                <Link
                  href="https://github.com/samuelcorsan/fellows.best"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Contribute
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" aria-label="Menu" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="fixed inset-0 top-16 z-50 bg-background border-t md:hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Navigation
                    </p>
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "text-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Contribute
                    </p>
                    <Link
                      href="https://github.com/samuelcorsan/fellows.best"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-foreground hover:bg-muted w-full text-left"
                    >
                      <Github className="h-5 w-5 flex-shrink-0" />
                      <span>Contribute</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
