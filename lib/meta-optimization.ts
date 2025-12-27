/**
 * Meta description optimization utilities
 * Generates SEO-optimized meta descriptions (150-160 characters)
 */

/**
 * Truncates text to optimal meta description length (150-160 chars)
 * Attempts to end at word boundary
 */
export function optimizeMetaDescription(text: string, maxLength: number = 160): string {
  if (!text) return "";
  
  // Remove extra whitespace and newlines in one pass
  const cleaned = text.trim().replace(/\s+/g, " ");
  
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // Truncate with ellipsis space reserved
  const targetLength = maxLength - 3;
  let truncated = cleaned.substring(0, targetLength);
  
  // Find last space for word boundary (only search in the truncated portion)
  const lastSpace = truncated.lastIndexOf(" ");
  
  // Use word boundary if it's within reasonable distance (at least 80% of target)
  if (lastSpace > targetLength * 0.8) {
    truncated = truncated.substring(0, lastSpace);
  }
  
  return truncated + "...";
}

/**
 * Generates a meta description from opportunity data
 * Prioritizes: name, organizer (if different), then description
 */
export function generateOpportunityMetaDescription(
  name: string,
  description: string,
  organizer?: string
): string {
  if (!name && !description) return "";
  
  // Build prefix (name + organizer)
  let prefix = name || "";
  if (organizer && organizer !== name) {
    prefix = prefix ? `${prefix} by ${organizer}` : organizer;
  }
  
  // Calculate available space for description
  const separator = prefix && description ? ". " : "";
  const prefixLength = prefix.length + separator.length;
  const maxDescLength = 160 - prefixLength;
  
  // If description fits, use it; otherwise optimize
  let desc = description || "";
  if (desc.length > maxDescLength) {
    desc = optimizeMetaDescription(desc, maxDescLength);
  }
  
  // Combine and ensure final length
  const result = prefix + separator + desc;
  return optimizeMetaDescription(result, 160);
}

/**
 * Generates a meta description for category pages
 */
export function generateCategoryMetaDescription(
  category: string,
  count?: number
): string {
  const categoryNames: Record<string, string> = {
    accelerator: "Tech Accelerators",
    fellowship: "Tech Fellowships",
    incubator: "Startup Incubators",
    venture_capital: "Venture Capital Programs",
    grant: "Grants",
    residency: "Residencies",
    competition: "Competitions",
    research: "Research Programs",
    developer_program: "Developer Programs",
  };
  
  const categoryName = categoryNames[category] || category;
  const countText = count ? ` ${count} ${count === 1 ? "opportunity" : "opportunities"}` : "";
  
  return `Discover ${categoryName}${countText}. Find deadlines, requirements, and how to apply. Free to use.`;
}

