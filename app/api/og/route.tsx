import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import type { Opportunity } from "@/lib/data";

export const runtime = "nodejs";

export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new ImageResponse(
        (
          <div
            style={{
              background: "linear-gradient(to bottom right, #1F2937, #111827)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 100,
            }}
          >
            fellows.best
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const response = await fetch(`${baseUrl}/api/opportunities?id=${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new ImageResponse(
        (
          <div
            style={{
              background: "linear-gradient(to bottom right, #1F2937, #111827)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 48,
            }}
          >
            Opportunity not found
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const opportunity = (await response.json()) as Opportunity | undefined;

    if (!opportunity) {
      return new ImageResponse(
        (
          <div
            style={{
              background: "linear-gradient(to bottom right, #1F2937, #111827)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 48,
            }}
          >
            Opportunity not found
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(to bottom right, #1F2937, #111827)",
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "48px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {opportunity.logoUrl && (
              <img
                src={opportunity.logoUrl}
                alt={`${opportunity.name} logo`}
                width="120"
                height="120"
                style={{
                  borderRadius: "16px",
                }}
              />
            )}
            <h1
              style={{
                color: "white",
                fontSize: 64,
                margin: 0,
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              {opportunity.name}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p
              style={{
                color: "#E5E7EB",
                fontSize: 32,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {opportunity.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
                flexWrap: "wrap",
              }}
            >
              {opportunity.tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    color: "white",
                    fontSize: 24,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                color: "#9CA3AF",
                fontSize: 24,
                margin: 0,
              }}
            >
              View opportunity details on
            </p>
            <p
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                margin: 0,
              }}
            >
              fellows.best
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
