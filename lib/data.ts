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
      "Virtual 10-week pre-accelerator for early-stage founders, offered by Techstars in partnership with cities (Istanbul, Sarajevo, Omaha):contentReference[oaicite:0]{index=0}.",
    fullDescription:
      "This part-time program (Sept 24 to Nov 28, 2025) provides weekly masterclasses, tailored workshops, hands-on mentorship and pitch coaching for selected startups:contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}. It is powered by Techstars and connects founders to industry experts and resources over 10 weeks.",
    openDate: "2025-06-28",
    closeDate: "2025-08-28",
    tags: ["virtual", "pre-accelerator", "founder-training", "mentorship"],
    category: "accelerator",
    region: "Global (Istanbul, Sarajevo, Omaha)",
    eligibility:
      "Founders based in Istanbul (Turkey), Sarajevo (Bosnia), or Omaha (USA):contentReference[oaicite:3]{index=3}.",
    applyLink:
      "https://apply.techstars.com/startup-community-partnership-founder-catalyst-fall-2025",
    benefits: [
      "Weekly masterclasses by Techstars leaders",
      "Tailored workshops for founders",
      "One-on-one mentoring from Techstars team",
      "Pitch coaching and strategic partner sessions:contentReference[oaicite:4]{index=4}",
    ],
    organizer: "Techstars",
  },
  {
    id: "tenity-european-fintech-accelerator-2025",
    name: "Tenity European Fin/Tech Accelerator",
    logoUrl: "https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg",
    description:
      "10-week hybrid accelerator for fintech/insurtech startups, offering office space in Zurich and London and up to €300,000 co-investment:contentReference[oaicite:5]{index=5}.",
    fullDescription:
      "The program (Aug–Dec 2025) provides expert mentorship, networking and office workspace, and co-invests up to EUR 300K (CHF/EUR 300K) in selected teams:contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}. It focuses on FinTech, InsurTech, RegTech, Web3 and related sectors.",
    openDate: "2025-06-16",
    closeDate: null,
    tags: ["fintech", "accelerator", "co-investment", "mentorship", "hybrid"],
    category: "accelerator",
    region: "Europe (Zurich, London)",
    eligibility:
      "Seed to Series A startups in FinTech, InsurTech, RegTech, Web3, etc.:contentReference[oaicite:8]{index=8}",
    applyLink: "https://airtable.com/apply/european-fintech-accelerator",
    benefits: [
      "Up to €300K co-investment",
      "Access to Tenity network and mentors",
      "Work space in Zurich/London",
      "Intensive business coaching:contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}",
    ],
    organizer: "Tenity",
  },
  {
    id: "google-for-startups-accelerator-ai-energy-europe-2025",
    name: "Google for Startups Accelerator: AI for Energy (Europe & Israel)",
    logoUrl:
      "https://images.pexels.com/photos/12086412/pexels-photo-12086412.jpeg",
    description:
      "12-week equity-free accelerator for AI-driven energy startups, led by Google for Startups:contentReference[oaicite:11]{index=11}.",
    fullDescription:
      "The program (Sept–Nov 2025) offers intensive mentorship, technical project support, Google Cloud credits and workshops to startups using AI to improve grid resilience, energy demand management and industrial efficiency:contentReference[oaicite:12]{index=12}. Applications are open until June 30, 2025:contentReference[oaicite:13]{index=13}.",
    openDate: "2025-05-12",
    closeDate: "2025-06-30",
    tags: ["AI", "energy", "accelerator", "mentorship", "cloud-credits"],
    category: "accelerator",
    region: "Europe & Israel",
    eligibility:
      "Early-stage startups (pre-seed to seed) developing AI/ML solutions for energy sector:contentReference[oaicite:14]{index=14}",
    applyLink: "https://startup.google.com/programs/accelerator/ai-for-energy",
    benefits: [
      "10-week equity-free support",
      "Mentorship from Google teams",
      "Workshops on AI/ML and business strategy",
      "Google Cloud credits and technical guidance:contentReference[oaicite:15]{index=15}",
    ],
    organizer: "Google for Startups",
  },
  {
    id: "eu-lac-digital-accelerator-open-call-2025",
    name: "EU-LAC Digital Accelerator (Open Call)",
    logoUrl:
      "https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg",
    description:
      "Open call for partnerships between European and Latin American tech startups and corporates, offering acceleration services worth up to €30,000 and grants up to €10,500:contentReference[oaicite:16]{index=16}.",
    fullDescription:
      "The EU-LAC Digital Accelerator supports EU–Latin America/Caribbean collaborations on digital innovation projects. Selected partners receive customized acceleration services (coaching, pilot planning, market strategy) and grants for proof-of-concept development (up to €7K PoC grant, €2K travel, €1.5K equipment):contentReference[oaicite:17]{index=17}:contentReference[oaicite:18]{index=18}. Next open call is expected in summer 2025.",
    openDate: "2025-07-01",
    closeDate: "2025-08-31",
    tags: ["cross-border", "grants", "digital-transformation", "acceleration"],
    category: "accelerator",
    region: "Europe–Latin America/Caribbean",
    eligibility:
      "Consortia of at least one EU and one Latin American/Caribbean startup or SME with a corporate partner:contentReference[oaicite:19]{index=19}",
    applyLink: "https://eulacdigitalaccelerator.com/open-call",
    benefits: [
      "In-kind acceleration services (€30K value)",
      "Grants for PoC, travel and equipment up to €10.5K:contentReference[oaicite:20]{index=20}:contentReference[oaicite:21]{index=21}",
      "Access to international network and markets",
    ],
    organizer: "EU-LAC Digital Accelerator",
  },
];

export function normalizeRegion(region: string): string[] {
  // Remove any text in parentheses and split by common separators
  const cleanRegion = region.replace(/\([^)]*\)/g, "").trim();
  const regions = cleanRegion.split(/[,&–-]/);

  // Clean up each region and remove empty strings
  return regions.map((r) => r.trim()).filter((r) => r.length > 0);
}

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
