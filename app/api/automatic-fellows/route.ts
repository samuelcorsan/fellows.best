import { NextResponse } from "next/server";
import Perplexity from "@perplexity-ai/perplexity_ai";
import { put, head, list } from "@vercel/blob";
import { sendDiscordWebhook } from "@/lib/utils";

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

const countryToRegion: Record<string, string> = {
  "United States": "North America",
  Spain: "Europe",
  Germany: "Europe",
  France: "Europe",
  India: "Asia",
  "United Kingdom": "Europe",
  Canada: "North America",
  Japan: "Asia",
  China: "Asia",
  Brazil: "South America",
  Australia: "Oceania",
  Mexico: "North America",
};

const countries = [
  "United States",
  "Spain",
  "Germany",
  "France",
  "India",
  "United Kingdom",
  "Canada",
  "Japan",
];

const BLOB_KEY_LATEST = "fellows.json";
const BLOB_KEY_FALLBACK = "original-fellows.json";
const BLOB_PREFIX = "fellows_";

function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function getLogoUrl(applyLink: string): string {
  const domain = extractDomain(applyLink);
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
}

function parseFellowships(data: any[], country: string): any[] {
  return data.map((item: any) => {
    const applyLink = item.applyLink || item.url || "";
    return {
      id: generateId(item.name || "unknown"),
      name: item.name || "",
      logoUrl: applyLink ? getLogoUrl(applyLink) : "",
      shareImageUrl: undefined,
      description: item.description || "",
      fullDescription: item.description || "",
      applyLink: applyLink,
      benefits: Array.isArray(item.benefits) ? item.benefits : [],
      eligibility: item.eligibility || "",
      region: countryToRegion[country] || "Global",
      country: country,
      openDate: item.openDate || null,
      closeDate: item.closeDate || null,
      tags: [],
      category: "fellowship",
      organizer: "",
      duration: undefined,
      funding: undefined,
      applicationVideo: undefined,
    };
  });
}

async function loadExistingFellows(): Promise<any[]> {
  try {
    try {
      const latestBlob = await head(BLOB_KEY_LATEST);
      if (latestBlob) {
        const response = await fetch(latestBlob.url);
        if (response.ok) {
          const text = await response.text();
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {}

    // Try fallback to original-fellows.json
    try {
      const fallbackBlob = await head(BLOB_KEY_FALLBACK);
      if (fallbackBlob) {
        const response = await fetch(fallbackBlob.url);
        if (response.ok) {
          const text = await response.text();
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {}

    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (blobs && blobs.length > 0) {
      const sorted = blobs.sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
      const latestBlob = sorted[0];
      const response = await fetch(latestBlob.url);
      if (response.ok) {
        const text = await response.text();
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : [];
      }
    }
  } catch (error) {
    console.log("No existing fellows found or error loading:", error);
  }
  return [];
}

async function saveFellows(fellows: any[]): Promise<void> {
  try {
    const date = new Date().toISOString().split("T")[0];
    const datedKey = `${BLOB_PREFIX}${date}.json`;
    const data = JSON.stringify(fellows, null, 2);

    await put(datedKey, data, {
      access: "public",
      contentType: "application/json",
    });

    await put(BLOB_KEY_LATEST, data, {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
  } catch (error) {
    console.error("Error saving fellows to Blob:", error);
    throw error;
  }
}

function normalizeDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(
      /\b(program|fellowship|accelerator|incubator|grant|competition|residency|initiative|challenge)\b/gi,
      ""
    )
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function isDuplicate(existing: any, newFellow: any): boolean {
  if (existing.id && newFellow.id && existing.id === newFellow.id) {
    return true;
  }

  if (
    existing.applyLink &&
    newFellow.applyLink &&
    existing.applyLink === newFellow.applyLink
  ) {
    return true;
  }

  const existingDomain = existing.applyLink
    ? normalizeDomain(existing.applyLink)
    : null;
  const newDomain = newFellow.applyLink
    ? normalizeDomain(newFellow.applyLink)
    : null;

  if (existingDomain && newDomain && existingDomain === newDomain) {
    return true;
  }

  if (existing.name && newFellow.name) {
    const existingNormalized = existing.name.toLowerCase().trim();
    const newNormalized = newFellow.name.toLowerCase().trim();

    if (existingNormalized === newNormalized) {
      return true;
    }

    const existingClean = normalizeName(existing.name);
    const newClean = normalizeName(newFellow.name);

    if (existingClean && newClean && existingClean === newClean) {
      return true;
    }

    if (existingClean.length > 3 && newClean.length > 3) {
      const similarity = calculateSimilarity(existingClean, newClean);
      if (similarity > 0.85) {
        return true;
      }
    }
  }

  return false;
}

function mergeFellows(
  existing: any[],
  newFellows: any[]
): { merged: any[]; added: any[]; skipped: number } {
  const merged: any[] = [...existing];
  const added: any[] = [];
  let skipped = 0;

  for (const newFellow of newFellows) {
    if (!newFellow.id && !newFellow.name && !newFellow.applyLink) {
      skipped++;
      continue;
    }

    const isDuplicateFellow = merged.some((existingFellow) =>
      isDuplicate(existingFellow, newFellow)
    );

    if (!isDuplicateFellow) {
      merged.push(newFellow);
      added.push(newFellow);
    } else {
      skipped++;
    }
  }

  return { merged, added, skipped };
}

export async function GET(request: Request) {
  try {
    if (process.env.CRON_SECRET) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const { searchParams } = new URL(request.url);
    const countryParam = searchParams.get("country");

    if (countryParam) {
      if (!countries.includes(countryParam)) {
        return NextResponse.json(
          {
            error: `Invalid country. Allowed countries are: ${countries.join(", ")}`,
          },
          { status: 400 }
        );
      }
    }

    const existingFellows = await loadExistingFellows();
    const allFellowships: any[] = [];
    const countriesToQuery = countryParam ? [countryParam] : countries;
    const countryStats: Record<string, number> = {};

    const fellowshipSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        applyLink: { type: "string" },
        benefits: {
          type: "array",
          items: { type: "string" },
        },
        eligibility: { type: "string" },
        openDate: { type: ["string", "null"] },
        closeDate: { type: ["string", "null"] },
      },
      required: ["name", "description", "applyLink"],
    };

    for (const country of countriesToQuery) {
      try {
        const prompt = `List currently open (accepting applications right now) tech fellowships, accelerators, and startup programs for founders in ${country}. Only include programs that are actively accepting applications at this moment.

IMPORTANT: 
- Avoid blog articles, listicles, news articles, or third-party websites that list multiple programs
- Get information from official fellowship websites when possible
- Ensure the applyLink is a valid application URL

For each program, provide the name, description, application link, benefits, eligibility requirements, and dates if available.`;

        const completion = await client.chat.completions.create({
          model: "sonar-pro",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              schema: {
                type: "array",
                items: fellowshipSchema,
              },
            },
          },
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          let parsed: any[] = [];
          try {
            const contentStr = typeof content === "string" ? content : "";
            const cleanContent = contentStr
              .replace(/<think>[\s\S]*?<\/redacted_reasoning>/g, "")
              .trim();
            parsed = JSON.parse(cleanContent);
          } catch (e) {
            console.error(`Error parsing response for ${country}:`, e);
            continue;
          }

          if (Array.isArray(parsed) && parsed.length > 0) {
            const fellowships = parseFellowships(parsed, country);
            allFellowships.push(...fellowships);
            countryStats[country] = fellowships.length;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error fetching fellowships for ${country}:`, error);
      }
    }

    const {
      merged: mergedFellows,
      added,
      skipped,
    } = mergeFellows(existingFellows, allFellowships);

    await saveFellows(mergedFellows);

    const timestamp = new Date().toISOString();
    const addedCount = added.length;
    const totalCount = mergedFellows.length;

    const fields = [
      {
        name: "Added",
        value: `${addedCount} new fellow${addedCount !== 1 ? "s" : ""}`,
        inline: true,
      },
      {
        name: "Skipped (duplicates)",
        value: `${skipped} fellow${skipped !== 1 ? "s" : ""}`,
        inline: true,
      },
      {
        name: "Total in database",
        value: `${totalCount} fellow${totalCount !== 1 ? "s" : ""}`,
        inline: true,
      },
    ];

    if (Object.keys(countryStats).length > 0) {
      for (const [country, count] of Object.entries(countryStats)) {
        fields.push({
          name: country,
          value: `${count} fellow${count !== 1 ? "s" : ""}`,
          inline: true,
        });
      }
    }

    fields.push({
      name: "Reminder",
      value:
        "Remember to add missing properties: `logoUrl`, `shareImageUrl`, `organizer`, `duration`, `funding`, `applicationVideo`",
      inline: false,
    });

    try {
      await sendDiscordWebhook({
        content: "Automatic fellows update completed",
        embeds: [
          {
            title: "Fellows Update",
            description: `Automatic fetch completed at ${new Date(timestamp).toLocaleString()}`,
            color: 0x00b894,
            fields,
            timestamp,
            footer: { text: "fellows.best" },
          },
        ],
      });
    } catch (webhookError) {
      console.error("Error sending Discord webhook:", webhookError);
    }

    const responseData: Record<string, any> = {
      success: true,
      added: addedCount,
      skipped,
      total: totalCount,
      timestamp,
    };

    if (Object.keys(countryStats).length > 0) {
      responseData.countries = countryStats;
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in automatic-fellows endpoint:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      {
        error: "Failed to fetch fellowships",
        details: errorMessage,
        ...(errorStack && { stack: errorStack }),
      },
      { status: 500 }
    );
  }
}
