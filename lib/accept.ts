export const PRODUCES = ["text/html", "text/markdown"] as const;

type Produced = (typeof PRODUCES)[number];

function parseAccept(accept: string): Array<{ type: string; q: number }> {
  return accept
    .split(",")
    .map((part) => {
      const [rawType, ...params] = part.trim().split(";");
      let q = 1;
      for (const param of params) {
        const match = param.trim().match(/^q=(\d*\.?\d+)/);
        if (match) q = Number.parseFloat(match[1]);
      }
      return { type: rawType.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((entry) => entry.type.length > 0);
}

/** Best match for content negotiation; null means 406 when Accept was sent. */
export function preferredType(
  acceptHeader: string | null
): Produced | null {
  if (!acceptHeader?.trim()) return "text/html";

  const types = parseAccept(acceptHeader);
  const markdown = types.find((t) => t.type === "text/markdown");
  const html = types.find(
    (t) => t.type === "text/html" || t.type === "text/*" || t.type === "*/*"
  );

  if (!markdown && !html) return null;

  if (markdown && html) {
    return markdown.q >= html.q ? "text/markdown" : "text/html";
  }
  if (markdown) return "text/markdown";
  return "text/html";
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  if (!existing.toLowerCase().includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
