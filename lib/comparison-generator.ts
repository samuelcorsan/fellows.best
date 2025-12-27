import type { Opportunity } from "./data";

/**
 * Generate comparison page slugs for opportunities
 * Creates comparisons between similar opportunities (same category, similar funding, etc.)
 */
export function generateComparisonConfigs(
  opportunities: Opportunity[]
): Array<{ id1: string; id2: string; slug: string }> {
  const comparisons: Array<{ id1: string; id2: string; slug: string }> = [];

  // Group opportunities by category
  const byCategory = new Map<string, Opportunity[]>();
  opportunities.forEach((opp) => {
    if (!byCategory.has(opp.category)) {
      byCategory.set(opp.category, []);
    }
    byCategory.get(opp.category)!.push(opp);
  });

  // Generate comparisons within each category
  byCategory.forEach((categoryOpps) => {
    // Sort by funding amount for better comparisons
    const sorted = [...categoryOpps].sort((a, b) => {
      const aFunding = a.funding?.amount || 0;
      const bFunding = b.funding?.amount || 0;
      return bFunding - aFunding;
    });

    // Compare top opportunities in each category (up to top 5)
    const topOpps = sorted.slice(0, 5);
    for (let i = 0; i < topOpps.length; i++) {
      for (let j = i + 1; j < topOpps.length; j++) {
        const opp1 = topOpps[i];
        const opp2 = topOpps[j];

        // Create slug from opportunity names
        const slug1 = opp1.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const slug2 = opp2.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const slug = `${slug1}-vs-${slug2}`;

        comparisons.push({
          id1: opp1.id,
          id2: opp2.id,
          slug,
        });
      }
    }
  });

  // Also generate comparisons between similar funding ranges
  const byFundingRange = new Map<string, Opportunity[]>();
  opportunities.forEach((opp) => {
    if (opp.funding) {
      const range =
        opp.funding.amount < 25000
          ? "under-25k"
          : opp.funding.amount < 100000
          ? "25k-100k"
          : "over-100k";
      if (!byFundingRange.has(range)) {
        byFundingRange.set(range, []);
      }
      byFundingRange.get(range)!.push(opp);
    }
  });

  // Generate comparisons within funding ranges (limit to avoid too many)
  byFundingRange.forEach((rangeOpps) => {
    const sorted = [...rangeOpps].sort((a, b) => {
      const aFunding = a.funding?.amount || 0;
      const bFunding = b.funding?.amount || 0;
      return bFunding - aFunding;
    });

    const topOpps = sorted.slice(0, 3);
    for (let i = 0; i < topOpps.length; i++) {
      for (let j = i + 1; j < topOpps.length; j++) {
        const opp1 = topOpps[i];
        const opp2 = topOpps[j];

        // Skip if already added in category comparisons
        const exists = comparisons.some(
          (c) =>
            (c.id1 === opp1.id && c.id2 === opp2.id) ||
            (c.id1 === opp2.id && c.id2 === opp1.id)
        );

        if (!exists) {
          const slug1 = opp1.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const slug2 = opp2.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const slug = `${slug1}-vs-${slug2}`;

          comparisons.push({
            id1: opp1.id,
            id2: opp2.id,
            slug,
          });
        }
      }
    }
  });

  return comparisons;
}

