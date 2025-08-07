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
  User,
  Moon,
  Sun,
  LogOut,
  Home,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "./sign-in-dialog";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add blur effect to main content when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      const mainElement = document.querySelector('main');
      const footerElement = document.querySelector('footer');
      if (mainElement) mainElement.style.filter = 'blur(8px)';
      if (footerElement) footerElement.style.filter = 'blur(8px)';
      document.body.style.overflow = 'hidden';
    } else {
      const mainElement = document.querySelector('main');
      const footerElement = document.querySelector('footer');
      if (mainElement) mainElement.style.filter = '';
      if (footerElement) footerElement.style.filter = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      const mainElement = document.querySelector('main');
      const footerElement = document.querySelector('footer');
      if (mainElement) mainElement.style.filter = '';
      if (footerElement) footerElement.style.filter = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: List },
    { name: "Submit", href: "/submit", icon: Plus },
  ];

  const UserMenu = () => {
    if (isPending || !session) {
      return <Button onClick={() => setIsSignInOpen(true)}>Get Started</Button>;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || ""}
              />
              <AvatarFallback>
                {session.user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="flex-1">
              <Link href="/" className="flex items-center space-x-3 group w-fit">
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
              <UserMenu />
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
            <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm md:hidden">
              <div className="flex flex-col h-full p-4">
                <nav className="flex flex-col space-y-4 flex-grow justify-center items-start ml-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 text-base font-medium transition-colors hover:text-muted-foreground ${
                          isActive ? "text-foreground" : "text-foreground/90"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-6 w-6" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  {isPending || !session ? (
                    <button
                      onClick={() => {
                        setIsSignInOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-base font-medium text-foreground/90 transition-colors hover:text-muted-foreground text-left"
                    >
                      <User className="h-6 w-6" />
                      <span>Get Started</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 text-base font-medium text-foreground/90 transition-colors hover:text-muted-foreground text-left"
                      >
                        <Settings className="h-6 w-6" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 text-base font-medium text-foreground/90 transition-colors hover:text-muted-foreground text-left"
                      >
                        <LogOut className="h-6 w-6" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </>
  );
}
