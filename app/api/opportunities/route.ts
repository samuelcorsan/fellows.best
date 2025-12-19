import { NextResponse } from "next/server";
import { getAllOpportunities } from "@/lib/opportunities.server";

export async function GET() {
  try {
    const opportunities = await getAllOpportunities();

    return NextResponse.json(opportunities, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch opportunities", details: errorMessage },
      { status: 500 }
    );
  }
}
