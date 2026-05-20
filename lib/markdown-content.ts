import { getDaysUntilDeadline, type Opportunity } from "@/lib/data";
import {
  fetchAllOpportunities,
  fetchOpportunityById,
  isOpportunityOpen,
} from "@/lib/opportunities-public";
import { absoluteUrl } from "@/lib/site";

function escapeMd(text: string): string {
  return text.replace(/\r\n/g, "\n");
}

function deadlineLabel(closeDate: Opportunity["closeDate"]): string {
  if (closeDate === "closed") return "closed";
  if (!closeDate) return "rolling";
  const days = getDaysUntilDeadline(closeDate);
  if (days < 0) return "closed";
  if (days === 0) return "closes today";
  if (days < 30) return `${days}d left`;
  if (days < 365) return `${Math.floor(days / 30)}mo left`;
  return `${Math.floor(days / 365)}y left`;
}

function formatFunding(funding: Opportunity["funding"]): string | null {
  if (!funding) return null;
  const amount = funding.isApproximate
    ? `~${funding.amount}`
    : String(funding.amount);
  const equity =
    funding.equityPercentage > 0
      ? `, ${funding.equityPercentage}% equity`
      : "";
  return `${amount} ${funding.currency} (${funding.fundingType})${equity}`;
}

function formatDuration(duration: Opportunity["duration"]): string | null {
  if (!duration) return null;
  return `${duration.value} ${duration.unit}`;
}

function opportunityDeadlineBlock(o: Opportunity): string {
  if (o.closeDate === "closed") {
    return "**Deadline:** Closed\n";
  }
  if (!o.closeDate) {
    return "**Deadline:** Rolling (apply anytime)\n";
  }
  const days = getDaysUntilDeadline(o.closeDate);
  if (days < 0) {
    return `**Deadline:** Closed (${new Date(o.closeDate).toISOString().slice(0, 10)})\n`;
  }
  const label =
    days === 0
      ? "Today"
      : days === 1
        ? "1 day left"
        : days < 30
          ? `${days} days left`
          : days < 365
            ? `${Math.floor(days / 30)} months left`
            : `${Math.floor(days / 365)} years left`;
  return `**Deadline:** ${label} (closes ${new Date(o.closeDate).toISOString().slice(0, 10)})\n`;
}

export async function renderHomeMarkdown(): Promise<string> {
  const all = await fetchAllOpportunities();
  const open = all
    .filter(isOpportunityOpen)
    .sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));

  const site = absoluteUrl("/");
  const mdIndex = absoluteUrl("/index.md");
  const api = absoluteUrl("/api/opportunities");

  const lines: string[] = [
    "# fellows.best",
    "",
    "> The biggest tech fellowship list.",
    "",
    "## What is fellows.best?",
    "",
    "fellows.best is a free, community-ranked directory of tech fellowships, grants, accelerators, incubators, competitions, residencies, developer programs, and related opportunities.",
    "",
    "- **Browse & compare** programs with deadlines, eligibility, benefits, and apply links.",
    "- **Community ranking** — visitors upvote programs they recommend; the list below is sorted by vote count (highest first).",
    "- **Open programs only** in this Markdown index (same default as the website). Use the JSON API for the full dataset including closed listings.",
    "",
    `- **Website:** ${site}`,
    `- **This page (Markdown):** ${mdIndex}`,
    `- **JSON API:** ${api}`,
    "",
    `**Total open programs:** ${open.length} (of ${all.length} in database)`,
    "",
    "## Ranked list (open programs)",
    "",
  ];

  if (open.length === 0) {
    lines.push("_No open programs at the moment._", "");
  } else {
    open.forEach((o, index) => {
      const pageUrl = absoluteUrl(`/opportunity/${o.id}`);
      const votes = o.votes ?? 0;
      const category = o.category.replace(/_/g, " ");
      const deadline = deadlineLabel(o.closeDate);
      const desc = escapeMd(o.description).trim();
      const oneLine =
        desc.length > 220 ? `${desc.slice(0, 217).trimEnd()}…` : desc;

      lines.push(
        `${index + 1}. **[${escapeMd(o.name)}](${pageUrl})** — ${votes} vote${votes === 1 ? "" : "s"} · ${category} · ${o.region || "—"} · ${deadline}`
      );
      if (o.organizer) {
        lines.push(`   - Organizer: ${escapeMd(o.organizer)}`);
      }
      if (oneLine) {
        lines.push(`   - ${oneLine}`);
      }
      lines.push(`   - Markdown: ${absoluteUrl(`/opportunity/${o.id}.md`)}`);
      lines.push("");
    });
  }

  lines.push(
    "---",
    "",
    "Request Markdown: send `Accept: text/markdown` or use a `.md` URL (e.g. `/index.md`, `/opportunity/{id}.md`).",
    "See also: [llms.txt](https://fellows.best/llms.txt)",
    ""
  );

  return lines.join("\n");
}

export async function renderOpportunityMarkdown(
  id: string
): Promise<string | null> {
  const o = await fetchOpportunityById(id);
  if (!o) return null;

  const pageUrl = absoluteUrl(`/opportunity/${o.id}`);
  const mdUrl = absoluteUrl(`/opportunity/${o.id}.md`);
  const category = o.category.replace(/_/g, " ");

  const lines: string[] = [
    `# ${escapeMd(o.name)}`,
    "",
    `> ${escapeMd(o.description)}`,
    "",
    `- **Organizer:** ${escapeMd(o.organizer || "—")}`,
    `- **Category:** ${category}`,
    `- **Region:** ${o.region || "—"}`,
    o.country ? `- **Country:** ${o.country}` : null,
    `- **Votes:** ${o.votes ?? 0}`,
    `- **Apply:** [${o.applyLink}](${o.applyLink})`,
    `- **Page:** ${pageUrl}`,
    `- **Markdown:** ${mdUrl}`,
    "",
    opportunityDeadlineBlock(o).trimEnd(),
    "",
  ].filter((line): line is string => line !== null);

  if (o.openDate) {
    lines.push(
      `**Opens:** ${new Date(o.openDate).toISOString().slice(0, 10)}`,
      ""
    );
  }

  const funding = formatFunding(o.funding);
  if (funding) {
    lines.push(`**Funding:** ${funding}`, "");
  }

  const duration = formatDuration(o.duration);
  if (duration) {
    lines.push(`**Duration:** ${duration}`, "");
  }

  if (o.tags.length > 0) {
    lines.push(`**Tags:** ${o.tags.map(escapeMd).join(", ")}`, "");
  }

  lines.push("## About", "", escapeMd(o.fullDescription || o.description), "");

  if (o.benefits.length > 0) {
    lines.push("## What you'll get", "");
    for (const benefit of o.benefits) {
      lines.push(`- ${escapeMd(benefit)}`);
    }
    lines.push("");
  }

  if (o.eligibility.trim()) {
    lines.push("## Eligibility", "", escapeMd(o.eligibility), "");
  }

  if (o.applicationVideo) {
    lines.push("## Application tips", "", o.applicationVideo, "");
  }

  lines.push(
    "---",
    "",
    `[← Back to fellows.best](${absoluteUrl("/")}) · [Home Markdown](${absoluteUrl("/index.md")})`,
    ""
  );

  return lines.join("\n");
}

export type MarkdownRouteResult =
  | { kind: "markdown"; body: string }
  | { kind: "not_found" };

export async function resolveMarkdownPath(
  segments: string[]
): Promise<MarkdownRouteResult> {
  const path = segments.join("/").replace(/^\/+/, "");

  if (path === "" || path === "index") {
    return { kind: "markdown", body: await renderHomeMarkdown() };
  }

  const opportunityMatch = path.match(/^opportunity\/([^/]+)$/);
  if (opportunityMatch) {
    const body = await renderOpportunityMarkdown(opportunityMatch[1]);
    if (!body) return { kind: "not_found" };
    return { kind: "markdown", body };
  }

  return { kind: "not_found" };
}
