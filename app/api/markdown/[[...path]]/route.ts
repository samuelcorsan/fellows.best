import { appendVaryAccept } from "@/lib/accept";
import { resolveMarkdownPath } from "@/lib/markdown-content";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";

function markdownResponse(
  body: string,
  canonicalPath: string
): Response {
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    Link: `<${absoluteUrl(canonicalPath)}>; rel="canonical"`,
    "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
  });
  appendVaryAccept(headers);
  return new Response(body, { status: 200, headers });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  const segments = pathSegments ?? [];
  const result = await resolveMarkdownPath(segments);

  if (result.kind === "not_found") {
    const headers = new Headers({ "Content-Type": "text/plain; charset=utf-8" });
    appendVaryAccept(headers);
    return new Response("Not Found\n", { status: 404, headers });
  }

  const canonicalPath =
    segments.length === 0 || (segments.length === 1 && segments[0] === "index")
      ? "/"
      : `/${segments.join("/")}`;

  return markdownResponse(result.body, canonicalPath);
}
