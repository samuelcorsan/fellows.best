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
    <>
      <div className="relative w-full mb-12 sm:mb-16 bg-white border border-gray-200 rounded-2xl">
        <div className="relative w-full h-32 sm:h-48 md:h-64 rounded-2xl overflow-hidden">
          {opportunity.shareImageUrl ? (
            <Image
              src={opportunity.shareImageUrl}
              alt={`${opportunity.name} banner`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src={opportunity.logoUrl}
                    alt={`${opportunity.name} logo`}
                    width={100}
                    height={100}
                    priority
                    className="rounded-xl object-cover w-20 h-20 sm:w-[100px] sm:h-[100px] mx-auto flex-shrink-0 border-4 border-white shadow-lg"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {opportunity.name}
                </h1>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="absolute -bottom-8 sm:-bottom-6 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0">
          <div className="relative">
            <Image
              src={opportunity.logoUrl}
              alt={`${opportunity.name} logo`}
              width={80}
              height={80}
              className="rounded-xl object-cover w-16 h-16 sm:w-20 sm:h-20 border-4 border-white shadow-2xl bg-white"
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20">
          <Button
            asChild
            size="icon"
            className="bg-white text-black hover:bg-gray-100 shadow-md rounded-xl w-10 h-10"
          >
            <Link href={backUrl}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {!opportunity.shareImageUrl && (
        <div className="relative">
          <Image
            src={opportunity.logoUrl}
            alt={`${opportunity.name} logo`}
            width={100}
            height={100}
            priority
            className="rounded-xl object-cover w-20 h-20 sm:w-[100px] sm:h-[100px] mx-auto sm:mx-0 flex-shrink-0 border-4 border-white shadow-lg"
          />
        </div>
      )}
    </>
  );
}
