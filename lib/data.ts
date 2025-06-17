export interface Opportunity {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  fullDescription: string;
  openDate: string;
  closeDate: string | null;
  tags: string[];
  category:
    | "fellowship"
    | "accelerator"
    | "grant"
    | "hackathon"
    | "internship"
    | "competition"
    | "funding";
  region: string;
  country: string | null;
  eligibility: string;
  applyLink: string;
  benefits: string[];
  organizer: string;
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "startup-community-partnership-founder-catalyst-fall-2025",
    name: "Startup Community Partnership Founder Catalyst (Fall 2025)",
    logoUrl:
      "https://images.pexels.com/photos/8761636/pexels-photo-8761636.jpeg",
    description:
      "Virtual 10-week pre-accelerator for early-stage founders, offered by Techstars in partnership with cities (Istanbul, Sarajevo, Omaha).",
    fullDescription:
      "This part-time program (Sept 24 to Nov 28, 2025) provides weekly masterclasses, tailored workshops, hands-on mentorship and pitch coaching for selected startups. It is powered by Techstars and connects founders to industry experts and resources over 10 weeks.",
    openDate: "2025-06-28",
    closeDate: "2025-08-28",
    tags: ["virtual", "pre-accelerator", "founder-training", "mentorship"],
    category: "accelerator",
    region: "Global",
    country: null,
    eligibility:
      "Founders based in Istanbul (Turkey), Sarajevo (Bosnia), or Omaha (USA).",
    applyLink:
      "https://apply.techstars.com/startup-community-partnership-founder-catalyst-fall-2025",
    benefits: [
      "Weekly masterclasses by Techstars leaders",
      "Tailored workshops for founders",
      "One-on-one mentoring from Techstars team",
      "Pitch coaching and strategic partner sessions",
    ],
    organizer: "Techstars",
  },
  {
    id: "tenity-european-fintech-accelerator-2025",
    name: "Tenity European Fin/Tech Accelerator",
    logoUrl: "https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg",
    description:
      "10-week hybrid accelerator for fintech/insurtech startups, offering office space in Zurich and London and up to €300,000 co-investment.",
    fullDescription:
      "The program (Aug–Dec 2025) provides expert mentorship, networking and office workspace, and co-invests up to EUR 300K (CHF/EUR 300K) in selected teams. It focuses on FinTech, InsurTech, RegTech, Web3 and related sectors.",
    openDate: "2025-06-16",
    closeDate: null,
    tags: ["fintech", "accelerator", "co-investment", "mentorship", "hybrid"],
    category: "accelerator",
    region: "Europe",
    country: "Switzerland",
    eligibility:
      "Seed to Series A startups in FinTech, InsurTech, RegTech, Web3, etc.",
    applyLink: "https://airtable.com/apply/european-fintech-accelerator",
    benefits: [
      "Up to €300K co-investment",
      "Access to Tenity network and mentors",
      "Work space in Zurich/London",
      "Intensive business coaching",
    ],
    organizer: "Tenity",
  },
  {
    id: "google-for-startups-accelerator-ai-energy-europe-2025",
    name: "Google for Startups Accelerator: AI for Energy (Europe & Israel)",
    logoUrl:
      "https://images.pexels.com/photos/12086412/pexels-photo-12086412.jpeg",
    description:
      "12-week equity-free accelerator for AI-driven energy startups, led by Google for Startups.",
    fullDescription:
      "The program (Sept–Nov 2025) offers intensive mentorship, technical project support, Google Cloud credits and workshops to startups using AI to improve grid resilience, energy demand management and industrial efficiency. Applications are open until June 30, 2025.",
    openDate: "2025-05-12",
    closeDate: "2025-06-30",
    tags: ["AI", "energy", "accelerator", "mentorship", "cloud-credits"],
    category: "accelerator",
    region: "Europe",
    country: "Israel",
    eligibility:
      "Early-stage startups (pre-seed to seed) developing AI/ML solutions for energy sector",
    applyLink: "https://startup.google.com/programs/accelerator/ai-for-energy",
    benefits: [
      "10-week equity-free support",
      "Mentorship from Google teams",
      "Workshops on AI/ML and business strategy",
      "Google Cloud credits and technical guidance",
    ],
    organizer: "Google for Startups",
  },
  {
    id: "eu-lac-digital-accelerator-open-call-2025",
    name: "EU-LAC Digital Accelerator (Open Call)",
    logoUrl:
      "https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg",
    description:
      "Open call for partnerships between European and Latin American tech startups and corporates, offering acceleration services worth up to €30,000 and grants up to €10,500.",
    fullDescription:
      "The EU-LAC Digital Accelerator supports EU–Latin America/Caribbean collaborations on digital innovation projects. Selected partners receive customized acceleration services (coaching, pilot planning, market strategy) and grants for proof-of-concept development (up to €7K PoC grant, €2K travel, €1.5K equipment). Next open call is expected in summer 2025.",
    openDate: "2025-07-01",
    closeDate: "2025-08-31",
    tags: ["cross-border", "grants", "digital-transformation", "acceleration"],
    category: "accelerator",
    region: "Europe",
    country: null,
    eligibility:
      "Consortia of at least one EU and one Latin American/Caribbean startup or SME with a corporate partner",
    applyLink: "https://eulacdigitalaccelerator.com/open-call",
    benefits: [
      "In-kind acceleration services (€30K value)",
      "Grants for PoC, travel and equipment up to €10.5K",
      "Access to international network and markets",
    ],
    organizer: "EU-LAC Digital Accelerator",
  },
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return mockOpportunities.find((opp) => opp.id === id);
}

export function getUpcomingDeadlines(count: number = 5): Opportunity[] {
  const now = new Date();
  return mockOpportunities
    .filter((opp) => opp.closeDate && new Date(opp.closeDate) > now)
    .sort(
      (a, b) =>
        new Date(a.closeDate!).getTime() - new Date(b.closeDate!).getTime()
    )
    .slice(0, count);
}

export function getDaysUntilDeadline(closeDate: string): number {
  const now = new Date();
  const deadline = new Date(closeDate);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDeadlineUrgency(
  closeDate: string
): "safe" | "warning" | "urgent" {
  const days = getDaysUntilDeadline(closeDate);
  if (days <= 7) return "urgent";
  if (days <= 30) return "warning";
  return "safe";
}

export function normalizeRegion(region: string): string[] {
  // Split by common separators and clean up
  const parts = region
    .split(/[–—,&()]/)
    .map((part) => part.trim())
    .filter(Boolean);

  // Extract main regions and normalize them
  const normalizedRegions = parts.map((part) => {
    if (part.toLowerCase().includes("latin america")) return "Latin America";
    if (part.toLowerCase().includes("caribbean")) return "Caribbean";
    // Add more specific cases as needed
    return part;
  });

  return Array.from(new Set(normalizedRegions)); // Remove duplicates using Array.from()
}

export function matchRegion(
  opportunityRegion: string,
  filterRegion: string
): boolean {
  const normalizedOpportunityRegions = normalizeRegion(opportunityRegion);
  return normalizedOpportunityRegions.some(
    (region) =>
      region.toLowerCase().includes(filterRegion.toLowerCase()) ||
      filterRegion.toLowerCase().includes(region.toLowerCase())
  );
}

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: { categories: string[]; regions: string[]; tags: string[] }
): Opportunity[] {
  return opportunities.filter((opp) => {
    // If no filters are selected in a category, don't filter by that category
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(opp.category);

    const regionMatch =
      filters.regions.length === 0 || filters.regions.includes(opp.region);

    const tagMatch =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => opp.tags.includes(tag));

    return categoryMatch && regionMatch && tagMatch;
  });
}
