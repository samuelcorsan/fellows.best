import type { Opportunity } from "./data";

export interface GuideConfig {
  title: string;
  description: string;
  slug: string;
  filters: {
    categories?: string[];
    regions?: string[];
    tags?: string[];
    fundingAmount?: { min: number; max: number };
  };
}

interface FundingRange {
  min: number;
  max: number;
  slug: string;
  label: string;
}

interface OpportunityAnalysis {
  categories: Set<string>;
  tags: Set<string>;
  regions: Set<string>;
  fundingAmounts: number[];
  regionCounts: Map<string, number>;
  commonTags: string[];
  allRegions: string[];
}

const FUNDING_RANGES: FundingRange[] = [
  { min: 0, max: 25000, slug: "under-25k", label: "Under $25,000" },
  { min: 0, max: 50000, slug: "under-50k", label: "Under $50,000" },
  { min: 0, max: 100000, slug: "under-100k", label: "Under $100,000" },
  { min: 25000, max: 100000, slug: "25k-100k", label: "$25k - $100k" },
  { min: 50000, max: 100000, slug: "50k-100k", label: "$50k - $100k" },
  { min: 100000, max: Infinity, slug: "over-100k", label: "Over $100k" },
];

const FUNDING_RANGES_FOR_COMBOS: FundingRange[] = [
  { min: 0, max: 25000, slug: "under-25k", label: "Under $25k" },
  { min: 0, max: 50000, slug: "under-50k", label: "Under $50k" },
  { min: 0, max: 100000, slug: "under-100k", label: "Under $100k" },
  { min: 25000, max: 100000, slug: "25k-100k", label: "$25k-$100k" },
  { min: 50000, max: 100000, slug: "50k-100k", label: "$50k-$100k" },
  { min: 100000, max: Infinity, slug: "over-100k", label: "Over $100k" },
];

const CATEGORY_NAMES: Record<string, string> = {
  fellowship: "Fellowships",
  accelerator: "Accelerators",
  grant: "Grants",
  incubator: "Incubators",
  venture_capital: "Venture Capital Programs",
  residency: "Residencies",
  competition: "Competitions",
  research: "Research Programs",
  developer_program: "Developer Programs",
};

const TAG_GUIDES: Record<string, { title: string; description: string }> = {
  remote: {
    title: "Remote Opportunities",
    description: "Explore remote and location-independent tech opportunities. Work from anywhere.",
  },
  students: {
    title: "Opportunities for Students",
    description: "Find tech opportunities specifically designed for students. Perfect for gaining experience while studying.",
  },
  student: {
    title: "Student Opportunities",
    description: "Discover tech opportunities perfect for students. Build your career while in school.",
  },
  equityfree: {
    title: "Equity-Free Opportunities",
    description: "Find equity-free funding opportunities. Keep full ownership of your startup.",
  },
  "equity-free": {
    title: "Equity-Free Programs",
    description: "Discover equity-free tech programs. No equity required, keep full ownership.",
  },
};

/**
 * Normalize a string to a URL-friendly slug
 */
function normalizeSlug(text: string): string {
  return text
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
}

/**
 * Analyze opportunities to extract common patterns
 */
function analyzeOpportunities(opportunities: Opportunity[]): OpportunityAnalysis {
  const categories = new Set<string>();
  const tags = new Set<string>();
  const regions = new Set<string>();
  const fundingAmounts: number[] = [];
  const regionCounts = new Map<string, number>();

  opportunities.forEach((opp) => {
    categories.add(opp.category);
    opp.tags.forEach((tag) => tags.add(tag.toLowerCase()));
    regions.add(opp.region);
    regionCounts.set(opp.region, (regionCounts.get(opp.region) || 0) + 1);
    if (opp.funding) {
      fundingAmounts.push(opp.funding.amount);
    }
  });

  fundingAmounts.sort((a, b) => a - b);

  const commonTags = Array.from(tags).filter((tag) => {
    const count = opportunities.filter((opp) =>
      opp.tags.some((t) => t.toLowerCase() === tag)
    ).length;
    return count >= 3;
  });

  const allRegions = Array.from(regionCounts.entries())
    .filter(([, count]) => count >= 2)
    .map(([region]) => region);

  return {
    categories,
    tags,
    regions,
    fundingAmounts,
    regionCounts,
    commonTags,
    allRegions,
  };
}

/**
 * Check if an opportunity matches funding range
 */
function matchesFundingRange(opp: Opportunity, range: FundingRange): boolean {
  if (!opp.funding) return false;
  const amount = opp.funding.amount;
  return amount >= range.min && (range.max === Infinity || amount <= range.max);
}

/**
 * Check if an opportunity matches a tag
 */
function matchesTag(opp: Opportunity, tag: string): boolean {
  return opp.tags.some((t) => t.toLowerCase() === tag);
}

/**
 * Generate category-based guides
 */
function generateCategoryGuides(
  categories: Set<string>,
  configs: Record<string, GuideConfig>
): void {
  categories.forEach((category) => {
    const categoryName = CATEGORY_NAMES[category] || category;
    const categorySlug = normalizeSlug(category.replace(/_/g, "-"));

    configs[categorySlug] = {
      slug: categorySlug,
      title: `Best ${categoryName}`,
      description: `Discover the best ${categoryName.toLowerCase()}. Find deadlines, requirements, and how to apply.`,
      filters: {
        categories: [category],
      },
    };

    if (category === "fellowship") {
      configs["fellowships"] = {
        slug: "fellowships",
        title: "Best Fellowships",
        description: "Discover the best tech fellowships. Find deadlines, requirements, and how to apply.",
        filters: {
          categories: [category],
        },
      };
    }
  });
}

/**
 * Generate funding-based guides
 */
function generateFundingGuides(
  fundingAmounts: number[],
  configs: Record<string, GuideConfig>
): void {
  if (fundingAmounts.length === 0) return;

  FUNDING_RANGES.forEach((range) => {
    const hasOpportunities = fundingAmounts.some(
      (amount) => amount >= range.min && (range.max === Infinity || amount <= range.max)
    );

    if (hasOpportunities) {
      configs[`funding-${range.slug}`] = {
        slug: `funding-${range.slug}`,
        title: `Opportunities ${range.label}`,
        description: `Find tech opportunities with funding ${range.label.toLowerCase()}. Discover programs that match your funding needs.`,
        filters: {
          fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
        },
      };
    }
  });
}

/**
 * Generate tag-based guides
 */
function generateTagGuides(
  commonTags: string[],
  configs: Record<string, GuideConfig>
): void {
  commonTags.forEach((tag) => {
    const normalizedSlug = normalizeSlug(tag);
    const tagGuide = TAG_GUIDES[tag];
    const title =
      tagGuide?.title ||
      `${tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")} Opportunities`;
    const description =
      tagGuide?.description ||
      `Discover tech opportunities tagged with ${tag.replace(/-/g, " ")}. Find programs that match your interests.`;

    configs[normalizedSlug] = {
      slug: normalizedSlug,
      title,
      description,
      filters: {
        tags: [tag],
      },
    };
  });
}

/**
 * Generate region-based guides
 */
function generateRegionGuides(
  allRegions: string[],
  configs: Record<string, GuideConfig>
): void {
  allRegions.forEach((region) => {
    const normalizedSlug = normalizeSlug(region);
    configs[`region-${normalizedSlug}`] = {
      slug: `region-${normalizedSlug}`,
      title: `Opportunities in ${region}`,
      description: `Discover tech opportunities available in ${region}. Find programs and fellowships in your region.`,
      filters: {
        regions: [region],
      },
    };
  });
}

/**
 * Index opportunities by their attributes for efficient lookup
 */
interface OpportunityIndex {
  byCategory: Map<string, Opportunity[]>;
  byRegion: Map<string, Opportunity[]>;
  byTag: Map<string, Opportunity[]>;
  byCategoryAndRegion: Map<string, Opportunity[]>;
  byCategoryAndTag: Map<string, Opportunity[]>;
  byCategoryAndFunding: Map<string, Opportunity[]>;
  byTagAndRegion: Map<string, Opportunity[]>;
  byTagAndFunding: Map<string, Opportunity[]>;
  byFundingAndRegion: Map<string, Opportunity[]>;
  byCategoryRegionAndTag: Map<string, Opportunity[]>;
  byCategoryRegionAndFunding: Map<string, Opportunity[]>;
  byCategoryTagAndFunding: Map<string, Opportunity[]>;
  byTagFundingAndRegion: Map<string, Opportunity[]>;
}

function buildOpportunityIndex(opportunities: Opportunity[]): OpportunityIndex {
  const index: OpportunityIndex = {
    byCategory: new Map(),
    byRegion: new Map(),
    byTag: new Map(),
    byCategoryAndRegion: new Map(),
    byCategoryAndTag: new Map(),
    byCategoryAndFunding: new Map(),
    byTagAndRegion: new Map(),
    byTagAndFunding: new Map(),
    byFundingAndRegion: new Map(),
    byCategoryRegionAndTag: new Map(),
    byCategoryRegionAndFunding: new Map(),
    byCategoryTagAndFunding: new Map(),
    byTagFundingAndRegion: new Map(),
  };

  opportunities.forEach((opp) => {
    // Index by single attributes
    if (!index.byCategory.has(opp.category)) {
      index.byCategory.set(opp.category, []);
    }
    index.byCategory.get(opp.category)!.push(opp);

    if (!index.byRegion.has(opp.region)) {
      index.byRegion.set(opp.region, []);
    }
    index.byRegion.get(opp.region)!.push(opp);

    opp.tags.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      if (!index.byTag.has(tagLower)) {
        index.byTag.set(tagLower, []);
      }
      index.byTag.get(tagLower)!.push(opp);
    });

    // Index by combinations
    const catRegionKey = `${opp.category}:${opp.region}`;
    if (!index.byCategoryAndRegion.has(catRegionKey)) {
      index.byCategoryAndRegion.set(catRegionKey, []);
    }
    index.byCategoryAndRegion.get(catRegionKey)!.push(opp);

    opp.tags.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      const catTagKey = `${opp.category}:${tagLower}`;
      if (!index.byCategoryAndTag.has(catTagKey)) {
        index.byCategoryAndTag.set(catTagKey, []);
      }
      index.byCategoryAndTag.get(catTagKey)!.push(opp);

      const tagRegionKey = `${tagLower}:${opp.region}`;
      if (!index.byTagAndRegion.has(tagRegionKey)) {
        index.byTagAndRegion.set(tagRegionKey, []);
      }
      index.byTagAndRegion.get(tagRegionKey)!.push(opp);

      const catRegionTagKey = `${opp.category}:${opp.region}:${tagLower}`;
      if (!index.byCategoryRegionAndTag.has(catRegionTagKey)) {
        index.byCategoryRegionAndTag.set(catRegionTagKey, []);
      }
      index.byCategoryRegionAndTag.get(catRegionTagKey)!.push(opp);
    });

    if (opp.funding) {
      FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
        if (matchesFundingRange(opp, range)) {
          const catFundingKey = `${opp.category}:${range.slug}`;
          if (!index.byCategoryAndFunding.has(catFundingKey)) {
            index.byCategoryAndFunding.set(catFundingKey, []);
          }
          index.byCategoryAndFunding.get(catFundingKey)!.push(opp);

          const fundingRegionKey = `${range.slug}:${opp.region}`;
          if (!index.byFundingAndRegion.has(fundingRegionKey)) {
            index.byFundingAndRegion.set(fundingRegionKey, []);
          }
          index.byFundingAndRegion.get(fundingRegionKey)!.push(opp);

          const catRegionFundingKey = `${opp.category}:${opp.region}:${range.slug}`;
          if (!index.byCategoryRegionAndFunding.has(catRegionFundingKey)) {
            index.byCategoryRegionAndFunding.set(catRegionFundingKey, []);
          }
          index.byCategoryRegionAndFunding.get(catRegionFundingKey)!.push(opp);

          opp.tags.forEach((tag) => {
            const tagLower = tag.toLowerCase();
            const tagFundingKey = `${tagLower}:${range.slug}`;
            if (!index.byTagAndFunding.has(tagFundingKey)) {
              index.byTagAndFunding.set(tagFundingKey, []);
            }
            index.byTagAndFunding.get(tagFundingKey)!.push(opp);

            const catTagFundingKey = `${opp.category}:${tagLower}:${range.slug}`;
            if (!index.byCategoryTagAndFunding.has(catTagFundingKey)) {
              index.byCategoryTagAndFunding.set(catTagFundingKey, []);
            }
            index.byCategoryTagAndFunding.get(catTagFundingKey)!.push(opp);

            const tagFundingRegionKey = `${tagLower}:${range.slug}:${opp.region}`;
            if (!index.byTagFundingAndRegion.has(tagFundingRegionKey)) {
              index.byTagFundingAndRegion.set(tagFundingRegionKey, []);
            }
            index.byTagFundingAndRegion.get(tagFundingRegionKey)!.push(opp);
          });
        }
      });
    }
  });

  return index;
}

/**
 * Generate a guide config for a combination
 */
function createGuideConfig(
  slug: string,
  title: string,
  description: string,
  filters: GuideConfig["filters"]
): GuideConfig {
  return { slug, title, description, filters };
}

/**
 * Generate combination guides using pre-indexed data
 */
function generateCombinationGuides(
  opportunities: Opportunity[],
  analysis: OpportunityAnalysis,
  configs: Record<string, GuideConfig>
): void {
  const { categories, commonTags, allRegions } = analysis;
  const index = buildOpportunityIndex(opportunities);

  // Process all category-based combinations
  categories.forEach((category) => {
    const categorySlug = normalizeSlug(category.replace(/_/g, "-"));
    const categoryName = CATEGORY_NAMES[category] || category;

    // Category + Funding
    FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
      const key = `${category}:${range.slug}`;
      if (index.byCategoryAndFunding.has(key)) {
        const slug = `${categorySlug}-${range.slug}`;
        configs[slug] = createGuideConfig(
          slug,
          `${categoryName} ${range.label}`,
          `Discover ${categoryName.toLowerCase()} with funding ${range.label.toLowerCase()}. Find opportunities that match your funding needs.`,
          {
            categories: [category],
            fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
          }
        );
      }
    });

    // Category + Region
    allRegions.forEach((region) => {
      const key = `${category}:${region}`;
      if (index.byCategoryAndRegion.has(key)) {
        const regionSlug = normalizeSlug(region);
        const slug = `${categorySlug}-${regionSlug}`;
        configs[slug] = createGuideConfig(
          slug,
          `${categoryName} in ${region}`,
          `Discover ${categoryName.toLowerCase()} available in ${region}. Find programs and opportunities in your region.`,
          {
            categories: [category],
            regions: [region],
          }
        );
      }
    });

    // Category + Tag
    commonTags.forEach((tag) => {
      const key = `${category}:${tag}`;
      if (index.byCategoryAndTag.has(key)) {
        const tagSlug = normalizeSlug(tag);
        const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
        const slug = `${categorySlug}-${tagSlug}`;
        configs[slug] = createGuideConfig(
          slug,
          `${categoryName} - ${tagDisplay}`,
          `Discover ${categoryName.toLowerCase()} with ${tag.replace(/-/g, " ")} tag. Find opportunities that match your interests.`,
          {
            categories: [category],
            tags: [tag],
          }
        );
      }
    });

    // Category + Funding + Region
    FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
      allRegions.forEach((region) => {
        const key = `${category}:${region}:${range.slug}`;
        if (index.byCategoryRegionAndFunding.has(key)) {
          const regionSlug = normalizeSlug(region);
          const slug = `${categorySlug}-${range.slug}-${regionSlug}`;
          configs[slug] = createGuideConfig(
            slug,
            `${categoryName} ${range.label} in ${region}`,
            `Discover ${categoryName.toLowerCase()} with funding ${range.label.toLowerCase()} available in ${region}. Find opportunities that match your criteria.`,
            {
              categories: [category],
              fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
              regions: [region],
            }
          );
        }
      });
    });

    // Category + Region + Tag
    allRegions.forEach((region) => {
      commonTags.forEach((tag) => {
        const key = `${category}:${region}:${tag}`;
        if (index.byCategoryRegionAndTag.has(key)) {
          const regionSlug = normalizeSlug(region);
          const tagSlug = normalizeSlug(tag);
          const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
          const slug = `${categorySlug}-${regionSlug}-${tagSlug}`;
          configs[slug] = createGuideConfig(
            slug,
            `${categoryName} in ${region} - ${tagDisplay}`,
            `Discover ${categoryName.toLowerCase()} in ${region} with ${tag.replace(/-/g, " ")} tag.`,
            {
              categories: [category],
              regions: [region],
              tags: [tag],
            }
          );
        }
      });
    });

    // Category + Funding + Tag
    FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
      commonTags.forEach((tag) => {
        const key = `${category}:${tag}:${range.slug}`;
        if (index.byCategoryTagAndFunding.has(key)) {
          const tagSlug = normalizeSlug(tag);
          const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
          const slug = `${categorySlug}-${range.slug}-${tagSlug}`;
          configs[slug] = createGuideConfig(
            slug,
            `${categoryName} ${range.label} - ${tagDisplay}`,
            `Discover ${categoryName.toLowerCase()} with funding ${range.label.toLowerCase()} and ${tag.replace(/-/g, " ")} tag.`,
            {
              categories: [category],
              fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
              tags: [tag],
            }
          );
        }
      });
    });
  });

  // Process tag-based combinations (without category)
  commonTags.forEach((tag) => {
    const tagSlug = normalizeSlug(tag);
    const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
    const tagLower = tag.replace(/-/g, " ");

    // Tag + Funding
    FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
      const key = `${tag}:${range.slug}`;
      if (index.byTagAndFunding.has(key)) {
        const slug = `${tagSlug}-${range.slug}`;
        configs[slug] = createGuideConfig(
          slug,
          `${tagDisplay} Opportunities ${range.label}`,
          `Find ${tagLower} opportunities with funding ${range.label.toLowerCase()}.`,
          {
            tags: [tag],
            fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
          }
        );
      }
    });

    // Tag + Region
    allRegions.forEach((region) => {
      const key = `${tag}:${region}`;
      if (index.byTagAndRegion.has(key)) {
        const regionSlug = normalizeSlug(region);
        const slug = `${tagSlug}-${regionSlug}`;
        configs[slug] = createGuideConfig(
          slug,
          `${tagDisplay} Opportunities in ${region}`,
          `Discover ${tagLower} opportunities available in ${region}.`,
          {
            tags: [tag],
            regions: [region],
          }
        );
      }
    });

    // Tag + Funding + Region
    FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
      allRegions.forEach((region) => {
        const key = `${tag}:${range.slug}:${region}`;
        if (index.byTagFundingAndRegion.has(key)) {
          const regionSlug = normalizeSlug(region);
          const slug = `${tagSlug}-${range.slug}-${regionSlug}`;
          configs[slug] = createGuideConfig(
            slug,
            `${tagDisplay} ${range.label} in ${region}`,
            `Discover ${tagLower} opportunities with funding ${range.label.toLowerCase()} in ${region}.`,
            {
              tags: [tag],
              fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
              regions: [region],
            }
          );
        }
      });
    });
  });

  // Funding + Region (without category or tag)
  FUNDING_RANGES_FOR_COMBOS.forEach((range) => {
    allRegions.forEach((region) => {
      const key = `${range.slug}:${region}`;
      if (index.byFundingAndRegion.has(key)) {
        const regionSlug = normalizeSlug(region);
        const slug = `funding-${range.slug}-${regionSlug}`;
        configs[slug] = createGuideConfig(
          slug,
          `Opportunities ${range.label} in ${region}`,
          `Find tech opportunities with funding ${range.label.toLowerCase()} available in ${region}. Discover programs that match your funding needs and location.`,
          {
            fundingAmount: { min: range.min, max: range.max === Infinity ? 2000000 : range.max },
            regions: [region],
          }
        );
      }
    });
  });
}

/**
 * Generate guide configurations based on common filter patterns
 * Generates ALL possible combinations of filters for comprehensive guide coverage
 */
export function generateGuideConfigs(opportunities: Opportunity[]): Record<string, GuideConfig> {
  const configs: Record<string, GuideConfig> = {};
  const analysis = analyzeOpportunities(opportunities);

  generateCategoryGuides(analysis.categories, configs);
  generateFundingGuides(analysis.fundingAmounts, configs);
  generateTagGuides(analysis.commonTags, configs);
  generateRegionGuides(analysis.allRegions, configs);
  generateCombinationGuides(opportunities, analysis, configs);

  return configs;
}

/**
 * Normalize region aliases to actual region names
 */
function normalizeRegionAlias(regionSlug: string, allRegions: string[]): string | null {
  // Map common aliases to actual region names
  const regionAliases: Record<string, string[]> = {
    "america": ["north-america", "south-america"],
    "usa": ["north-america"],
    "us": ["north-america"],
    "united-states": ["north-america"],
  };

  const alias = regionAliases[regionSlug.toLowerCase()];
  if (alias) {
    // Find the first matching region that exists
    for (const aliasRegion of alias) {
      const matchingRegion = allRegions.find(
        (r) => normalizeSlug(r) === aliasRegion
      );
      if (matchingRegion) {
        return normalizeSlug(matchingRegion);
      }
    }
  }

  return null;
}

/**
 * Get guide config by slug (with fallback to predefined guides and region aliases)
 */
export function getGuideConfig(slug: string, opportunities: Opportunity[]): GuideConfig | null {
  const generated = generateGuideConfigs(opportunities);

  if (generated[slug]) {
    return generated[slug];
  }

  // Try to resolve aliases in the slug
  // Patterns: {tag}-{region}, {tag}-{funding}-{region}, {category}-{region}, etc.
  const parts = slug.split("-");
  if (parts.length >= 2) {
    const analysis = analyzeOpportunities(opportunities);
    
    // Map common aliases to actual region slugs
    const regionAliases: Record<string, string[]> = {
      // America aliases
      "america": ["north-america", "south-america"],
      "na": ["north-america"],
      "north-america": ["north-america"],
      "northamerica": ["north-america"],
      "usa": ["north-america"],
      "us": ["north-america"],
      "united-states": ["north-america"],
      "unitedstates": ["north-america"],
      "sa": ["south-america"],
      "south-america": ["south-america"],
      "southamerica": ["south-america"],
      "latin-america": ["south-america"],
      "latinamerica": ["south-america"],
      // Europe aliases
      "eu": ["europe"],
      "europe": ["europe"],
      "european": ["europe"],
      "eu27": ["europe"],
      "eurozone": ["europe"],
      // Asia aliases
      "asia": ["asia"],
      "apac": ["asia"],
      "apj": ["asia"],
      // Other common aliases
      "africa": ["africa"],
      "middle-east": ["middle-east"],
      "me": ["middle-east"],
      "mena": ["middle-east"],
      "oceania": ["oceania"],
      "australasia": ["oceania"],
      "anz": ["oceania"],
      "global": ["global"],
      "worldwide": ["global"],
      "world": ["global"],
    };

    // Map funding aliases
    const fundingAliases: Record<string, string[]> = {
      "100k": ["over-100k", "25k-100k", "50k-100k"],
      "100": ["over-100k", "25k-100k", "50k-100k"],
      "25k": ["under-25k", "25k-100k"],
      "50k": ["under-50k", "50k-100k"],
      "under-100": ["under-100k"],
      "over-100": ["over-100k"],
    };

    // Try different patterns: check last part, second-to-last, etc.
    const lastPart = parts[parts.length - 1].toLowerCase();
    const secondLastPart = parts.length >= 3 ? parts[parts.length - 2].toLowerCase() : null;
    
    // Pattern 1: {tag}-{region} or {category}-{region}
    const regionAlias = regionAliases[lastPart];
    if (regionAlias) {
      for (const aliasRegion of regionAlias) {
        const newParts = [...parts.slice(0, -1), aliasRegion];
        const newSlug = newParts.join("-");
        if (generated[newSlug]) {
          return generated[newSlug];
        }
      }
    }

    // Pattern 2: {tag}-{region}-{funding} or {tag}-{funding}-{region} (3+ parts)
    // Handle cases like: pre-seed-america-100k → pre-seed-over-100k-north-america
    if (parts.length >= 3) {
      // Try different tag boundaries (tag could be 1, 2, or more parts)
      for (let tagEnd = 1; tagEnd <= parts.length - 2; tagEnd++) {
        const tagPart = parts.slice(0, tagEnd).join("-");
        const remainingParts = parts.slice(tagEnd);
        
        if (remainingParts.length >= 2) {
          // Try {tag}-{region-alias}-{funding-alias} → convert to {tag}-{funding}-{region}
          const regionAlias2 = regionAliases[remainingParts[0].toLowerCase()];
          const fundingAlias = fundingAliases[remainingParts[remainingParts.length - 1].toLowerCase()];
          
          if (regionAlias2 && fundingAlias) {
            // Generated format is {tag}-{funding}-{region}
            for (const aliasRegion of regionAlias2) {
              for (const aliasFunding of fundingAlias) {
                const newSlug = `${tagPart}-${aliasFunding}-${aliasRegion}`;
                if (generated[newSlug]) {
                  return generated[newSlug];
                }
              }
            }
          }

          // Try {tag}-{funding-alias}-{region-alias} → already in correct format
          const fundingAlias2 = fundingAliases[remainingParts[0].toLowerCase()];
          const regionAlias3 = regionAliases[remainingParts[remainingParts.length - 1].toLowerCase()];
          
          if (fundingAlias2 && regionAlias3) {
            const newSlug = `${tagPart}-${fundingAlias2[0]}-${regionAlias3[0]}`;
            if (generated[newSlug]) {
              return generated[newSlug];
            }
          }

          // Try if region spans multiple parts (e.g., "north-america")
          if (remainingParts.length >= 3) {
            const lastPartLower = remainingParts[remainingParts.length - 1].toLowerCase();
            const secondLastPartLower = remainingParts[remainingParts.length - 2].toLowerCase();
            const regionKey = `${secondLastPartLower}-${lastPartLower}`;
            const regionAlias4 = regionAliases[regionKey];
            const fundingAlias3 = fundingAliases[remainingParts[0].toLowerCase()];
            
            if (regionAlias4 && fundingAlias3) {
              for (const aliasRegion of regionAlias4) {
                for (const aliasFunding of fundingAlias3) {
                  const newSlug = `${tagPart}-${aliasFunding}-${aliasRegion}`;
                  if (generated[newSlug]) {
                    return generated[newSlug];
                  }
                }
              }
            }
          }
        }
      }
    }

    // Pattern 3: {tag}-{funding-alias}
    const fundingAlias3 = fundingAliases[lastPart];
    if (fundingAlias3) {
      for (const aliasFunding of fundingAlias3) {
        const newParts = [...parts.slice(0, -1), aliasFunding];
        const newSlug = newParts.join("-");
        if (generated[newSlug]) {
          return generated[newSlug];
        }
      }
    }
  }

  // Fallback to predefined guides for common cases
  const predefined: Record<string, GuideConfig> = {
    "fellowships-under-25k": {
      slug: "fellowships-under-25k",
      title: "Fellowships Under $25,000",
      description:
        "Discover tech fellowships with funding under $25,000. Find opportunities that match your budget and career goals.",
      filters: {
        categories: ["fellowship"],
        fundingAmount: { min: 0, max: 25000 },
      },
    },
    "fellowships-under-100k": {
      slug: "fellowships-under-100k",
      title: "Fellowships Under $100,000",
      description:
        "Discover tech fellowships with funding under $100,000. Find opportunities that match your budget and career goals.",
      filters: {
        categories: ["fellowship"],
        fundingAmount: { min: 0, max: 100000 },
      },
    },
    "remote-fellowships": {
      slug: "remote-fellowships",
      title: "Remote Fellowships",
      description:
        "Explore remote and location-independent tech fellowships. Work from anywhere while advancing your career.",
      filters: {
        tags: ["remote"],
      },
    },
    "fellowships-for-students": {
      slug: "fellowships-for-students",
      title: "Fellowships for Students",
      description:
        "Find tech fellowships specifically designed for students. Perfect opportunities to gain experience while studying.",
      filters: {
        tags: ["students", "student"],
      },
    },
  };

  return predefined[slug] || null;
}
