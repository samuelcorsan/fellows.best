"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface AppliedButtonProps {
  opportunityId: string;
}

function getAppliedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem("fb_applied") || "[]"));
  } catch {
    return new Set();
  }
}

function setAppliedSet(set: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("fb_applied", JSON.stringify(Array.from(set)));
}

export function AppliedButton({ opportunityId }: AppliedButtonProps) {
  const [applied, setApplied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setApplied(getAppliedSet().has(opportunityId));
  }, [opportunityId]);

  function toggle() {
    const next = getAppliedSet();
    if (applied) next.delete(opportunityId);
    else next.add(opportunityId);
    setAppliedSet(next);
    setApplied(!applied);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={applied}
      className={`inline-flex items-center justify-center gap-1.5 h-10 px-4 text-[14px] border transition-colors ${
        mounted && applied
          ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
          : "border-green-600 text-green-700 dark:text-green-400 bg-transparent hover:bg-green-600/10"
      }`}
    >
      <Check className="h-4 w-4" />
      {mounted && applied ? "Applied" : "I applied"}
    </button>
  );
}
