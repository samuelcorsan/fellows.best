import { NextRequest, NextResponse } from "next/server";
import { sendDiscordWebhook } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type } = body as { type?: string };

    if (type === "url") {
      const { url } = body as { url?: string };
      if (!url || typeof url !== "string") {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
      }

      await sendDiscordWebhook({
        content: "New URL submission",
        embeds: [
          {
            title: "URL submitted",
            description: url,
            color: 0x5865f2,
            timestamp: new Date().toISOString(),
            footer: { text: "fellows.best" },
          },
        ],
      });

      return NextResponse.json({ ok: true });
    }

    const {
      name,
      organizer,
      description,
      fullDescription,
      openDate,
      closeDate,
      category,
      region,
      eligibility,
      applyLink,
      tags,
      benefits,
    } = body as Record<string, unknown>;

    if (
      !name ||
      !organizer ||
      !description ||
      !fullDescription ||
      !openDate ||
      !closeDate ||
      !category ||
      !region ||
      !eligibility ||
      !applyLink
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fields = [
      { name: "Organizer", value: String(organizer) },
      { name: "Category", value: String(category) },
      { name: "Region", value: String(region) },
      { name: "Opens", value: String(openDate), inline: true },
      { name: "Closes", value: String(closeDate), inline: true },
      { name: "Apply", value: String(applyLink) },
    ];

    if (Array.isArray(tags) && tags.length > 0) {
      fields.push({ name: "Tags", value: tags.map(String).join(", ") });
    }
    if (Array.isArray(benefits) && benefits.length > 0) {
      fields.push({
        name: "Benefits",
        value: benefits.map(String).filter(Boolean).join("\n"),
      });
    }

    await sendDiscordWebhook({
      content: "New opportunity submission",
      embeds: [
        {
          title: String(name),
          description: String(description),
          url: typeof applyLink === "string" ? applyLink : undefined,
          color: 0x00b894,
          fields,
          timestamp: new Date().toISOString(),
          footer: { text: "fellows.best" },
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in /api/submit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
