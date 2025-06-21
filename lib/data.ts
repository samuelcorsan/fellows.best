export interface Opportunity {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  fullDescription: string;
  openDate: string | null;
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
    id: "a16z-crypto-startup-accelerator",
    name: "a16z Crypto Startup Accelerator",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1582168997134422016/HcmVyKwV_400x400.jpg",
    description:
      "An intensive accelerator for early-stage blockchain and web3 startups, providing capital, mentorship, and network support.",
    fullDescription:
      "The a16z Crypto Startup Accelerator (CSX) is a cohort-based program for early-stage crypto/web3 startups. It connects founders with capital, industry experts, and a cohort of leading teams. Across locations like New York and London, it offers funding (historically up to ~$500K in exchange for equity), 10-week intensive curriculum on product-market fit, token design, go-to-market, legal/regulatory, and access to a16z’s network of mentors, customers, and investors. Application windows vary by cohort—interested founders should subscribe for updates and check the accelerator page.",
    openDate: null,
    closeDate: null,
    tags: ["crypto", "web3", "funding-opportunity", "mentorship", "blockchain"],
    category: "accelerator",
    region: "Global",
    country: "Multiple",
    eligibility:
      "Early-stage startups building with blockchain/web3 technologies, willing to join in-person or remote cohort activities as specified.",
    applyLink: "https://a16zcrypto.com/accelerator",
    benefits: [
      "Cohort-based accelerator (e.g., 10 weeks) in hubs like New York or London",
      "Funding (historically up to ~$500K for selected teams)",
      "Curriculum covering product-market fit, tokenomics, go-to-market, legal/regulatory for crypto",
      "1:1 mentorship from a16z crypto partners and network of experts",
      "Access to a16z’s broader network of advisors, potential customers, and investors",
      "Community events, workshops, and demo day to pitch to investors",
    ],
    organizer: "Andreessen Horowitz (a16z Crypto)",
  },
  {
    id: "ewor-fellowship",
    name: "EWOR Fellowship",
    logoUrl: "https://i.ibb.co/sJDKj0MD/image.png",
    description:
      "A highly selective, virtual-first fellowship offering early-stage founders up to €500,000 in capital and 1:1 mentorship from unicorn founders to build global-impact ventures.",
    fullDescription:
      "The EWOR Fellowship is a rigorous program targeting the top 0.1% of founders worldwide. Founded in 2021 and based in Berlin, EWOR supports exceptional entrepreneurs through a virtual-first model that adapts to non-linear founder journeys. Fellows (just ~35 selected from over 35,000 applicants annually) receive up to €500,000 in capital (including €110,000 from EWOR GmbH plus €390,000 via an uncapped convertible instrument), intensive 1:1 mentorship (1–5 hours weekly) from unicorn founders, bespoke learning modules, and access to a curated network of over 2,000 mentors, VCs, and subject matter experts. The program embraces borderless participation—founders can be based anywhere—and focuses on those with the potential to build companies valued at €1B+ by combining scientific insight, real-world experience, and deep empathy for the founder’s path. EWOR alumni typically raise €1–11M during the fellowship period and have achieved record-breaking funding rounds and exits. The selection uses ML-driven pattern recognition, intensive partner interviews, and evidence-based testing to identify visionaries, technical prodigies, and driven operators committed to solving significant global challenges.",
    openDate: null,
    closeDate: null,
    tags: [
      "entrepreneurship",
      "funding-opportunity",
      "mentorship",
      "virtual-program",
      "early-stage",
      "capital",
    ],
    category: "fellowship",
    region: "Global",
    country: "",
    eligibility:
      "Exceptional early-stage founders worldwide (visionaries, technical prodigies, serial entrepreneurs) with demonstrated potential or traction; typically applicants who can benefit from intensive 1:1 mentorship and significant capital to scale ventures. Selection is highly competitive, with only ~35 fellows chosen from over 35,000 applicants annually.",
    applyLink: "https://ewor.com/apply",
    benefits: [
      "Up to €500,000 in capital (€110K from EWOR GmbH plus €390K via investment fund)",
      "1:1 mentorship (1–5 hours per week) with unicorn founders and seasoned entrepreneurs",
      "Bespoke learning modules tailored to each founder’s needs",
      "Access to a curated network of over 2,000 mentors, VCs, and subject matter experts",
      "Virtual-first, borderless participation enabling founders to work from anywhere",
      "Support in fundraising, pitch refinement, and strategic guidance",
      "Introductions to potential investors, partners, and service discounts (e.g., cloud credits)",
      "Community of elite founders and ongoing network beyond the fellowship",
    ],
    organizer: "EWOR",
  },
  {
    id: "thiel-fellowship-2026",
    name: "Thiel Fellowship",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQID1xMTmAZzfe1EBazgth2MBqA_dZa77DQuQ&s",
    description:
      "A two-year, $200,000 grant program for innovators aged 22 or younger to pursue full-time projects instead of attending college.",
    fullDescription:
      "The Thiel Fellowship, founded by Peter Thiel through the Thiel Foundation in 2010, awards up to 20–30 fellows annually with $200,000 disbursed over two years and access to a global network of mentors, investors, and peers. Eligible applicants are individuals aged 22 or younger working on a concrete project—such as a startup, scientific research, social movement, or creative endeavor—and willing to drop out of or pause formal education to pursue it full-time. The program does not take equity in fellows’ ventures. Applications are accepted on a rolling basis without fixed deadlines. Fellows receive guidance, networking opportunities, and support but are based globally and need not relocate to a specific location.",
    openDate: null,
    closeDate: null,
    tags: [
      "fellowship",
      "entrepreneurship",
      "grant",
      "innovation",
      "mentorship",
      "rolling-application",
    ],
    category: "fellowship",
    region: "Global",
    country: "",
    eligibility:
      "Applicants must be aged 22 or younger at the time of application, have not yet received an undergraduate degree, and must be willing to drop out of or pause college if selected. Candidates should demonstrate meaningful progress on a concrete vision (e.g., startup, research, social initiative) and commitment to work full-time on it. No requirement for a team or prior incorporation, though evidence of traction or progress strengthens the application.",
    applyLink: "https://thielfellowship.org",
    benefits: [
      "US$200,000 grant disbursed over two years",
      "No equity taken in fellows’ projects",
      "Access to a global network of mentors, investors, and fellow entrepreneurs",
      "Guidance and support for project development and scaling",
      "Opportunities for introductions to potential partners and funders",
      "Flexibility to remain based anywhere in the world",
      "Prestige and visibility through association with the Thiel Foundation",
    ],
    organizer: "Thiel Foundation",
  },
  {
    id: "global-good-fund-fellowship-2026",
    name: "Global Good Fund Fellowship 2026",
    logoUrl:
      "https://i0.wp.com/www.scholarshipsinindia.com/wp-content/uploads/global-good-fund-fellowship.jpg?fit=200%2C200&ssl=1",
    description:
      "A 12-month hybrid leadership program for social entrepreneurs worldwide, offering executive coaching, business mentorship, and a targeted $10,000 leadership development grant.",
    fullDescription:
      "The Global Good Fund Fellowship is a year-long hybrid leadership development program for social entrepreneurs and leaders of social enterprises globally. Fellows receive a comprehensive 360° leadership assessment, one-on-one executive coaching, and C-suite business mentorship, along with a $10,000 grant to invest in their leadership growth. Over 12 months, participants connect virtually with coaches and mentors, join a global cohort for peer learning, and convene at an annual in-person summit. The program is designed for founders or primary decision-makers running social enterprises that have been operational for at least two years with at least two full-time employees, fully committed to scaling impact. The Fellowship focuses on developing resilient, competent leaders who can tackle pressing social issues and drive sustainable growth for their organizations.",
    openDate: "2025-06-01",
    closeDate: "2025-07-01",
    tags: [
      "leadership",
      "social-impact",
      "grant",
      "mentorship",
      "executive-coaching",
      "hybrid-program",
    ],
    category: "fellowship",
    region: "Global",
    country: "",
    eligibility:
      "Emerging leaders of social enterprises (for-profit, non-profit, or hybrid) operating for at least two years with a minimum of two full-time employees. Applicants must hold a primary decision-making role (e.g., CEO, Co-Founder, Executive Director), be fully committed full-time to their enterprise, and demonstrate coachability and potential to scale impact.",
    applyLink: "https://globalgoodfund.org/apply",
    benefits: [
      "360° leadership assessment",
      "Dedicated professional executive coaching (virtual)",
      "C-suite business mentorship (virtual)",
      "$10,000 leadership development grant",
      "Annual Global Good Fund Summit (4-day in-person event)",
      "Customized tools, resources, training, and networking opportunities",
      "Peer and subject matter expert network",
      "Global cohort community and ongoing support",
    ],
    organizer: "Global Good Fund",
  },
  {
    id: "localhost-japan",
    name: "LocalHost - Japan",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
    description:
      "A global, travelling fellowship with a hub in Tokyo for exceptional young builders to pursue full-time projects.",
    fullDescription:
      "LocalHost Fellowship offers free housing, travel grants, and support in Tokyo, Japan, as part of its global program backing founders, researchers, and creators to work full-time on ideas. Fellows in Japan benefit from co-working spaces, lab access, computing credits, mentorship, and community events, backed by LocalHost Ventures.",
    openDate: null,
    closeDate: null,
    tags: [
      "residency",
      "funding-opportunity",
      "housing",
      "mentorship",
      "community",
    ],
    category: "fellowship",
    region: "Asia",
    country: "Japan",
    eligibility:
      "Exceptional young founders, researchers, engineers, artists, and other builders worldwide; open to those who can relocate to Tokyo for the residency period.",
    applyLink: "https://localhosthq.com/apply",
    benefits: [
      "Free housing in Tokyo",
      "Sponsored travel and visa assistance",
      "R&D grants ($1K–$5K)",
      "Access to co-working offices and lab facilities in Tokyo",
      "Computing credits and infrastructure support",
      "Mentorship from experienced operators",
      "Community events, workshops, and networking locally and globally",
      "Ongoing backing beyond initial support",
    ],
    organizer: "LocalHost Ventures",
  },
  {
    id: "localhost-india",
    name: "LocalHost - India",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
    description:
      "A global fellowship with hubs in Bangalore and New Delhi, supporting builders to pursue full-time projects.",
    fullDescription:
      "LocalHost Fellowship provides free housing and travel support in Bangalore and New Delhi, India, as part of its global program. Fellows gain access to co-working spaces, labs, computing credits, R&D grants, mentorship, and community events, backed by LocalHost Ventures to help turn ideas into real projects.",
    openDate: null,
    closeDate: null,
    tags: [
      "residency",
      "funding-opportunity",
      "housing",
      "mentorship",
      "community",
    ],
    category: "fellowship",
    region: "Asia",
    country: "India",
    eligibility:
      "Exceptional young founders, researchers, engineers, artists, and other builders worldwide; open to those who can relocate to Bangalore or New Delhi for the residency period.",
    applyLink: "https://localhosthq.com/apply",
    benefits: [
      "Free housing in Bangalore or New Delhi",
      "Sponsored travel and visa assistance",
      "R&D grants ($1K–$5K)",
      "Access to co-working offices and lab facilities in these hubs",
      "Computing credits and infrastructure support",
      "Mentorship from experienced operators",
      "Community events, workshops, and networking locally and globally",
      "Ongoing backing beyond initial support",
    ],
    organizer: "LocalHost Ventures",
  },
  {
    id: "localhost-romania",
    name: "LocalHost - Romania",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
    description:
      "A global fellowship with a hub in Cluj-Napoca, Romania, for exceptional builders.",
    fullDescription:
      "LocalHost Fellowship offers free housing and support in Cluj-Napoca, Romania, as part of its global network. Fellows receive co-working access, lab facilities, computing credits, travel grants, mentorship, and community events, backed by LocalHost Ventures to help advance their projects.",
    openDate: null,
    closeDate: null,
    tags: [
      "residency",
      "funding-opportunity",
      "housing",
      "mentorship",
      "community",
    ],
    category: "fellowship",
    region: "Europe",
    country: "Romania",
    eligibility:
      "Exceptional young founders, researchers, engineers, artists, and other builders worldwide; open to those who can relocate to Cluj-Napoca for the residency period.",
    applyLink: "https://localhosthq.com/apply",
    benefits: [
      "Free housing in Cluj-Napoca",
      "Sponsored travel and visa assistance",
      "R&D grants ($1K–$5K)",
      "Access to co-working offices and lab facilities in Cluj-Napoca",
      "Computing credits and infrastructure support",
      "Mentorship from experienced operators",
      "Community events, workshops, and networking locally and globally",
      "Ongoing backing beyond initial support",
    ],
    organizer: "LocalHost Ventures",
  },
  {
    id: "localhost-france",
    name: "LocalHost - France",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
    description:
      "A global fellowship with activities and events in Paris, France, supporting exceptional builders.",
    fullDescription:
      "LocalHost Fellowship hosts events and may offer residencies or travel grants for fellows to participate in Paris, France, as part of its global program. Participants benefit from co-working spaces, potential housing opportunities, computing credits, R&D grants, mentorship, and community events backed by LocalHost Ventures.",
    openDate: null,
    closeDate: null,
    tags: [
      "residency",
      "funding-opportunity",
      "travel-grants",
      "mentorship",
      "community",
    ],
    category: "fellowship",
    region: "Europe",
    country: "France",
    eligibility:
      "Exceptional young founders, researchers, engineers, artists, and other builders worldwide; open to those who can travel to Paris for events or residencies.",
    applyLink: "https://localhosthq.com/apply",
    benefits: [
      "Potential free housing or travel support for Paris events",
      "Sponsored travel and visa assistance",
      "R&D grants ($1K–$5K)",
      "Access to co-working spaces and labs when in Paris",
      "Computing credits and infrastructure support",
      "Mentorship from experienced operators",
      "Community events, workshops, and networking locally and globally",
      "Ongoing backing beyond initial support",
    ],
    organizer: "LocalHost Ventures",
  },
  {
    id: "founders-inc-off-season",
    name: "Founders Inc Off Season",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1934781639198167040/24emfYDA_400x400.jpg",
    description:
      "6-week equity-free summer residency at Fort Mason for ambitious builders to obsess and build, ending in Demo Day with up to $250K funding opportunity.",
    fullDescription:
      "Off Season is a six-week intensive residency (June 23–August 1, 2025) at Founders Inc's 42,000 sq ft campus in Fort Mason, San Francisco. Instead of vacation, participants join ~50 peers in a no-curriculum, obsession-driven environment with workspace, prototyping facilities, mentorship from experienced founders, community events and workshops. The program culminates in a Demo Day where top teams may receive funding up to $250K. Applications are open until June 12, 2025 (late applications accepted until June 18, 2025).",
    openDate: "2026-06-01",
    closeDate: "2025-06-18",
    tags: ["residency", "funding-opportunity", "community"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "University students, recent graduates, and ambitious builders (including dropouts) who want to dedicate six weeks (June 23–August 1, 2025) to build projects in software, hardware, AI, robotics, etc.",
    applyLink: "https://f.inc/offseason",
    benefits: [
      "6-week equity-free residency at Fort Mason, San Francisco",
      "Access to 42,000 sq ft workspace and prototyping facilities",
      "Mentorship from experienced founders and experts",
      "Community of ~50 ambitious peers",
      "Demo Day with opportunity for funding up to $250K",
      "Access to community events, workshops and informal office hours",
    ],
    organizer: "Founders, Inc.",
  },
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
