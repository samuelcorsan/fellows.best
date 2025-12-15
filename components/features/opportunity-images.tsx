"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OpportunityImagesProps {
  opportunity: {
    id: string;
    name: string;
    logoUrl: string;
    shareImageUrl?: string;
  };
  backUrl: string;
}

export function OpportunityImages({
  opportunity,
  backUrl,
}: OpportunityImagesProps) {
  return (
    <div className="relative w-full mb-12 sm:mb-16">
      <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        {opportunity.shareImageUrl ? (
          <>
            <Image
              src={opportunity.shareImageUrl}
              alt={`${opportunity.name} banner`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute -bottom-8 sm:-bottom-6 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0">
              <div className="relative">
                <Image
                  src={opportunity.logoUrl}
                  alt={`${opportunity.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover w-16 h-16 sm:w-20 sm:h-20 border-4 border-white shadow-2xl bg-white"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 max-w-4xl w-full">
              <div className="relative flex-shrink-0">
                <Image
                  src={opportunity.logoUrl}
                  alt={`${opportunity.name} logo`}
                  width={120}
                  height={120}
                  priority
                  className="rounded-2xl object-cover w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-white dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {opportunity.name}
                </h1>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20">
          <Button
            asChild
            size="icon"
            className="bg-white/90 dark:bg-slate-800/90 text-black dark:text-white hover:bg-white dark:hover:bg-slate-800 shadow-lg backdrop-blur-sm rounded-xl w-10 h-10"
          >
            <Link href={backUrl}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
