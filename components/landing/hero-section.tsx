"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/global/search-input";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchMode =
    (process.env.NEXT_PUBLIC_SEARCH_MODE || "ai") === "text" ? "text" : "ai";
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next <br />
            <span className="text-foreground">Fellowship Opportunity</span>
          </h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover fellowships, grants, accelerators, and competitions. Track
            deadlines, get reminders, and turn opportunities into achievements.
          </h2>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
          >
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl rounded-lg -z-10" />
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for opportunities..."
                onSubmit={handleSearch}
                size="lg"
                showAiBadge={searchMode === "ai"}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
