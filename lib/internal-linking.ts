import type { Opportunity } from "./data";

/**
 * Find related opportunities based on category, tags, or region
 */
export function findRelatedOpportunities(
  opportunity: Opportunity,
  allOpportunities: Opportunity[],
  limit: number = 5
): Opportunity[] {
  const related: Array<{ opportunity: Opportunity; score: number }> = [];

  for (const opp of allOpportunities) {
    if (opp.id === opportunity.id) continue;

    let score = 0;

    // Same category = high score
    if (opp.category === opportunity.category) {
      score += 10;
    }

    // Shared tags = medium score
    const sharedTags = opp.tags.filter((tag) => opportunity.tags.includes(tag));
    score += sharedTags.length * 3;

    // Same region = low score
    if (opp.region === opportunity.region) {
      score += 1;
    }

    if (score > 0) {
      related.push({ opportunity: opp, score });
    }
  }

  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.opportunity);
}

/**
 * Generate contextual links within content
 */
export function generateContextualLinks(
  content: string,
  opportunities: Opportunity[]
): string {
  let linkedContent = content;

  // Find opportunity names in content and link them
  for (const opp of opportunities) {
    const regex = new RegExp(`\\b${opp.name}\\b`, "gi");
    linkedContent = linkedContent.replace(
      regex,
      `<a href="/opportunity/${opp.id}" class="text-primary hover:underline">${opp.name}</a>`
    );
  }

  return linkedContent;
}

