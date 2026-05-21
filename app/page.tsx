"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Search, ChevronUp } from "lucide-react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Opportunity } from "@/lib/data";

const ACCENT = "#5b6cff";
const PAGE_SIZE = 20;
const SLOGAN = "the biggest tech fellowship list";

const CATEGORIES = [
  "all",
  "fellowship",
  "accelerator",
  "incubator",
  "venture_capital",
  "grant",
  "residency",
  "competition",
  "research",
  "developer_program",
];

const REGIONS = [
  "all",
  "Global",
  "United States",
  "Europe",
  "Asia",
  "India",
  "Canada",
  "Australia",
];


function getVoterId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("fb_voter_id");
  if (!id) {
    id =
      crypto.randomUUID?.() ??
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("fb_voter_id", id);
  }
  return id;
}


function timeUntil(date: string | null | "closed"): {
  label: string;
  urgent: boolean;
} {
  if (!date) return { label: "rolling", urgent: false };
  if (date === "closed") return { label: "closed", urgent: false };
  const ms = new Date(date).getTime() - Date.now();
  if (Number.isNaN(ms)) return { label: "—", urgent: false };
  if (ms < 0) return { label: "closed", urgent: false };
  const days = Math.floor(ms / 86400000);
  if (days === 0) return { label: "today", urgent: true };
  if (days < 30) return { label: `${days}d left`, urgent: days < 14 };
  const months = Math.floor(days / 30);
  if (months < 12) return { label: `${months}mo left`, urgent: false };
  return { label: `${Math.floor(months / 12)}y left`, urgent: false };
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isOpen(o: Opportunity): boolean {
  if (o.closeDate === "closed") return false;
  if (!o.closeDate) return true;
  const t = new Date(o.closeDate).getTime();
  if (Number.isNaN(t)) return true;
  return t >= Date.now();
}

function applyFilters(
  all: Opportunity[],
  q: string,
  category: string,
  region: string,
  status: "open" | "all"
): Opportunity[] {
  let list = all;
  if (status === "open") list = list.filter(isOpen);
  if (q.trim()) {
    const needle = q.toLowerCase();
    list = list.filter(
      (o) =>
        o.name.toLowerCase().includes(needle) ||
        o.organizer.toLowerCase().includes(needle) ||
        o.description.toLowerCase().includes(needle) ||
        o.tags.some((t) => t.toLowerCase().includes(needle))
    );
  }
  if (category !== "all") list = list.filter((o) => o.category === category);
  if (region !== "all") list = list.filter((o) => o.region === region);

  return [...list].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
}

let allCache: Opportunity[] | null = null;
let allCacheVoterId: string | null = null;
async function fetchAll(voterId: string): Promise<Opportunity[]> {
  if (allCache && allCacheVoterId === voterId) return allCache;
  const url = voterId
    ? `/api/opportunities?voterId=${encodeURIComponent(voterId)}`
    : "/api/opportunities";
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("failed to load");
  const data = (await res.json()) as Opportunity[];
  allCache = Array.isArray(data) ? data : [];
  allCacheVoterId = voterId;
  return allCache;
}

function SkeletonRow() {
  return (
    <li className="flex gap-3 sm:gap-4 py-5 sm:py-4 animate-pulse">
      <div className="w-10 sm:w-9 flex flex-col items-center pt-1 gap-1 shrink-0">
        <div className="w-5 h-5 bg-muted" />
        <div className="h-[12px] w-6 bg-muted/70" />
      </div>
      <div className="w-11 h-11 sm:w-10 sm:h-10 bg-muted border border-border shrink-0" />
      <div className="flex-1 min-w-0 space-y-2.5 sm:space-y-2">
        <div className="space-y-1.5 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
          <div className="h-[18px] w-40 bg-muted" />
          <div className="h-[14px] w-24 bg-muted/70" />
        </div>
        <div className="space-y-1.5">
          <div className="h-[15px] sm:h-[14px] w-full bg-muted/70" />
          <div className="h-[15px] sm:h-[14px] w-4/5 bg-muted/70" />
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          <div className="h-[14px] w-16 bg-muted/60" />
          <div className="h-[14px] w-14 bg-muted/60" />
          <div className="h-[14px] w-20 bg-muted/60" />
        </div>
      </div>
    </li>
  );
}

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState<"open" | "all">("open");

  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitOpen, setSubmitOpen] = useState(false);

  const queryClient = useQueryClient();
  const [voterId, setVoterId] = useState("");
  useEffect(() => {
    setVoterId(getVoterId());
  }, []);

  function mutateItem(id: string, patch: Partial<Opportunity>) {
    if (!allCache) return;
    const idx = allCache.findIndex((o) => o.id === id);
    if (idx >= 0) allCache[idx] = { ...allCache[idx], ...patch };
  }

  async function handleVote(id: string, current: number, hasVoted: boolean) {
    if (!voterId) return;
    const action: "up" | "down" = hasVoted ? "down" : "up";
    const optimisticCount = current + (hasVoted ? -1 : 1);

    mutateItem(id, { votes: optimisticCount, hasVoted: !hasVoted });
    queryClient.invalidateQueries({ queryKey: ["opportunities"] });

    try {
      const res = await fetch(`/api/opportunities/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId, action }),
      });
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { votes: number; voted: boolean };
      mutateItem(id, { votes: json.votes, hasVoted: json.voted });
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    } catch {
      mutateItem(id, { votes: current, hasVoted });
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    }
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["opportunities", voterId, q, category, region, status],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const all = await fetchAll(voterId);
      const filtered = applyFilters(all, q, category, region, status);
      const start = (pageParam as number) * PAGE_SIZE;
      const items = filtered.slice(start, start + PAGE_SIZE);
      const nextPage =
        start + PAGE_SIZE < filtered.length ? (pageParam as number) + 1 : null;
      return { items, nextPage, total: filtered.length };
    },
    getNextPageParam: (lp) => lp.nextPage,
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      new URL(url);
    } catch {
      setSubmitMsg("invalid url");
      return;
    }
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "url", url: url.trim() }),
      });
      if (!res.ok) throw new Error();
      setSubmitMsg("submitted. thanks!");
      setUrl("");
    } catch {
      setSubmitMsg("error submitting");
    } finally {
      setSubmitting(false);
    }
  }

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  const submitBtnClass =
    "h-10 border border-border hover:bg-accent flex items-center text-sm transition-colors shrink-0";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/85 border-b border-border">
        <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
          <div className="max-w-4xl mx-auto px-4 sm:px-5 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link href="/" className="shrink-0">
                <span className="font-semibold tracking-tight text-[17px] hover:underline underline-offset-4 decoration-2">
                  fellows.best
                </span>
              </Link>
              <span className="text-sm text-muted-foreground hidden md:inline shrink-0">
                {SLOGAN}
              </span>
              <div className="ml-auto flex items-center gap-2 sm:hidden shrink-0">
                <DialogTrigger asChild>
                  <button type="button" className={`${submitBtnClass} px-3.5`}>
                    Submit
                  </button>
                </DialogTrigger>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label="toggle theme"
                  className="w-10 h-10 border border-border hover:bg-accent flex items-center justify-center transition-colors"
                >
                  {mounted && isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto sm:shrink-0">
              <div className="relative flex-1 sm:flex-none sm:w-full sm:max-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="search…"
                  className="w-full pl-9 pr-3 h-10 border border-border bg-card text-[15px] focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    // @ts-expect-error css var
                    "--tw-ring-color": ACCENT,
                  }}
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <DialogTrigger asChild>
                  <button type="button" className={`${submitBtnClass} px-3`}>
                    Submit
                  </button>
                </DialogTrigger>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label="toggle theme"
                  className="w-10 h-10 border border-border hover:bg-accent flex items-center justify-center transition-colors shrink-0"
                >
                  {mounted && isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Submit an opportunity</DialogTitle>
              <DialogDescription>
                Paste a URL — we&apos;ll review and add it.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 mt-2"
            >
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/opportunity"
                className="flex-1 px-3 h-10 border border-border bg-background text-[15px] focus:outline-none focus:ring-2"
                style={{
                  // @ts-expect-error css var
                  "--tw-ring-color": ACCENT,
                }}
                disabled={submitting}
                autoFocus
              />
              <button
                type="submit"
                disabled={submitting || !url.trim()}
                className="h-10 px-5 text-white text-[15px] font-medium disabled:opacity-50 transition-opacity"
                style={{ background: ACCENT }}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </form>
            {submitMsg && (
              <p className="text-[13px] text-muted-foreground mt-2">
                {submitMsg}
              </p>
            )}
          </DialogContent>
        </Dialog>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 pt-3 sm:pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 sm:h-9 w-full sm:w-[150px] bg-card text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "all" ? "All categories" : c.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="h-10 sm:h-9 w-full sm:w-[130px] bg-card text-sm">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r === "all" ? "All regions" : r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as "open" | "all")}
        >
          <SelectTrigger className="h-10 sm:h-9 w-full sm:w-[110px] bg-card text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open only</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-4 sm:py-6">

        <ul className="divide-y divide-border border-b border-border">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}

          {!isLoading && items.length === 0 && (
            <li className="py-10 text-center text-muted-foreground text-[15px]">
              No opportunities match your filters.
            </li>
          )}

          {!isLoading &&
            items.map((o) => {
              const host = hostname(o.applyLink);
              const deadline = timeUntil(o.closeDate);
              const count = o.votes ?? 0;
              const isVoted = !!o.hasVoted;
              return (
                <li key={o.id} className="flex gap-3 sm:gap-4 py-5 sm:py-4 items-start">
                  <button
                    type="button"
                    onClick={() => handleVote(o.id, count, isVoted)}
                    aria-label={isVoted ? "remove upvote" : "upvote"}
                    className={`shrink-0 w-10 sm:w-9 flex flex-col items-center pt-1 sm:pt-0.5 select-none transition-colors ${
                      isVoted
                        ? "text-[color:var(--accent-color)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={
                      {
                        // @ts-expect-error css var
                        "--accent-color": ACCENT,
                      }
                    }
                  >
                    <ChevronUp
                      className={`w-5 h-5 ${isVoted ? "fill-current" : ""}`}
                      strokeWidth={isVoted ? 2.5 : 2}
                    />
                    <span className="text-[12px] tabular-nums leading-none mt-0.5">
                      {count}
                    </span>
                  </button>

                  <Link
                    href={`/opportunity/${o.id}`}
                    className="group flex gap-3 sm:gap-4 items-start flex-1 min-w-0"
                  >
                    {o.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={o.logoUrl}
                        alt=""
                        className="w-11 h-11 sm:w-10 sm:h-10 object-cover bg-muted border border-border shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.visibility =
                            "hidden";
                        }}
                      />
                    ) : (
                      <div className="w-11 h-11 sm:w-10 sm:h-10 bg-muted border border-border shrink-0 flex items-center justify-center font-semibold text-muted-foreground">
                        {o.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 space-y-2 sm:space-y-0">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:gap-y-0.5">
                        <span className="font-medium text-[17px] leading-snug group-hover:underline decoration-2 underline-offset-2">
                          {o.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {host && (
                            <span className="text-[13px] text-muted-foreground">
                              {host}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center text-[11px] uppercase tracking-wide px-1.5 py-0.5 border shrink-0 ${
                              deadline.urgent
                                ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
                                : deadline.label === "closed"
                                  ? "border-border bg-muted text-muted-foreground"
                                  : "border-border bg-card text-foreground/80"
                            }`}
                          >
                            {deadline.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-[15px] sm:text-[14px] text-muted-foreground leading-relaxed line-clamp-2 sm:mt-1">
                        {o.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:gap-x-3 sm:gap-y-1 sm:mt-2 text-[13px] text-muted-foreground">
                        <span className="capitalize">
                          {o.category.replace("_", " ")}
                        </span>
                        <span aria-hidden className="text-muted-foreground/60">
                          ·
                        </span>
                        <span>{o.region || "—"}</span>
                        <span aria-hidden className="text-muted-foreground/60">
                          ·
                        </span>
                        <span className="min-w-0">{o.organizer || "—"}</span>
                        {o.tags.length > 0 && (
                          <span className="basis-full sm:basis-auto sm:truncate text-[12px] sm:text-[13px] leading-snug pt-0.5 sm:pt-0">
                            {o.tags.slice(0, 4).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}

          {isFetchingNextPage &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow key={`more-${i}`} />
            ))}
        </ul>

        <div ref={sentinelRef} aria-hidden className="h-8" />

        <footer className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground">
          <span>fellows.best</span>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </footer>
      </div>
    </div>
  );
}
