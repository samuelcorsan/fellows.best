export interface Opportunity {
  id: string;
  name: string;
  logoUrl: string;
  shareImageUrl?: string;
  description: string;
  fullDescription: string;
  openDate: string | null;
  closeDate: string | null | "closed";
  tags: string[];
  category:
    | "accelerator"
    | "fellowship"
    | "grant"
    | "residency"
    | "competition"
    | "research";
  region: string;
  country: string | null;
  eligibility: string;
  applyLink: string;
  benefits: string[];
  organizer: string;
  funding?: {
    amount: number;
    currency: string;
    equityPercentage: number;
    fundingType: "equity-based" | "equity-free" | "mixed";
    isApproximate?: boolean;
  };
  applicationVideo?: string;
}

export const fellowshipOpportunities: Opportunity[] = [
  {
    id: "antler-2025",
    name: "Antler",
    logoUrl: "https://cdn.fellows.best/logos/antler-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/antler-2025-banner.jpg",
    description:
      "Global early-stage investor providing $200–$250K for ~8–9% equity in a 6-week residency.",
    fullDescription:
      "Antler is a 'day-zero' global investor and accelerator. It hosts a 6-week in-person residency (in 30+ cities worldwide) where solo founders meet co-founders, validate ideas, and raise capital. After the program, Antler invests roughly $200–$250K per team for about 8–9% equity, plus living stipends. Applications are rolling for multiple city cohorts.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "global",
      "co-founder matching",
      "short-term",
      "pre-seed",
    ],
    category: "accelerator",
    region: "Global",
    country: "Various",
    eligibility:
      "Early-stage founders (solo or teams) from any background; must commit full-time to the 6-week residency and be open to international relocation for the program.",
    applyLink: "https://www.antler.co/apply",
    benefits: [
      "$200–$250K investment (post-program)",
      "6-week global residency with co-founder matching",
      "Living stipend during residency",
      "Follow-on support from Antler's global network",
    ],
    organizer: "Antler",
    funding: {
      amount: 225000,
      currency: "USD",
      equityPercentage: 8.5,
      fundingType: "equity-based",
    },
    applicationVideo: "https://www.youtube.com/embed/0ETl4Ge-hg0",
  },
  {
    id: "techstars-2025",
    name: "Techstars",
    logoUrl: "https://cdn.fellows.best/logos/techstars-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/techstars-2025-banner.jpg",
    description:
      "Global accelerator offering $220,000 in funding for ~5–7% total equity.",
    fullDescription:
      "Techstars runs 3-month, mentorship-driven accelerator programs in 40+ locations worldwide. Starting Fall 2025, accepted companies receive a $220,000 investment: $20K for 5% common stock and $200K as an uncapped MFN SAFE (total 5% plus SAFE conversion). The program includes intensive mentorship, partner perks, and a Demo Day at the end. Applications open early 2025 for various global cohorts.",
    openDate: "2025-04-08",
    closeDate: "2025-06-11",
    tags: [
      "equity-based",
      "accelerator",
      "mentorship",
      "global",
      "in-person",
      "pre-seed",
    ],
    category: "accelerator",
    region: "Global",
    country: "Various",
    eligibility:
      "Early-stage tech startups worldwide; open to any sector with prototype or early traction. Must be prepared for a 3-month commitment and to relocate for the program.",
    applyLink: "https://www.techstars.com/apply",
    benefits: [
      "$220,000 total investment ($20K for 5% equity + $200K SAFE)",
      "3-month intensive accelerator with mentorship",
      "Access to Techstars global network of mentors and investors",
      "$120K in partner perks (e.g. cloud credits, etc.)",
    ],
    organizer: "Techstars",
    funding: {
      amount: 220000,
      currency: "USD",
      equityPercentage: 6,
      fundingType: "equity-based",
    },
  },
  {
    id: "500-global-flagship-2025",
    name: "500 Global Flagship Accelerator",
    logoUrl:
      "https://cdn.fellows.best/logos/500-startup-flagship-accelerator.webp",
    shareImageUrl:
      "https://cdn.fellows.best/banners/500-global-flagship-2025-banner.jpg",
    description:
      "Early-stage accelerator by 500 Global offering $150,000 for 6% SAFE (plus fees).",
    fullDescription:
      "500 Global (formerly 500 Startups) runs the flagship accelerator in Palo Alto focused on early-stage tech startups. The program invests $150,000 for 6% equity via a SAFE, plus a $37,500 program fee. The 4-month program includes mentorship, workshops, and Demo Day. Batch 36 starts Q1 2025 (deadline Oct 11, 2025). The accelerator emphasizes global market reach, with 30–40% of participants coming from outside the US.",
    openDate: null,
    closeDate: "2025-10-11",
    tags: [
      "equity-based",
      "accelerator",
      "tech",
      "mentorship",
      "global",
      "pre-seed",
    ],
    category: "accelerator",
    region: "Global",
    country: "United States",
    eligibility:
      "Pre-seed to early-seed tech startups worldwide with a working product; teams must commit to the full 4-month in-person program in Palo Alto.",
    applyLink: "https://flagship.aplica.500.co",
    benefits: [
      "$150,000 seed investment (SAFE) for 6% equity",
      "4-month accelerator program with mentorship",
      "Access to 500 Global's investor network and resources",
      "Promotion to global markets (significant international cohort)",
    ],
    organizer: "500 Global",
    funding: {
      amount: 150000,
      currency: "USD",
      equityPercentage: 6,
      fundingType: "equity-based",
    },
  },
  {
    id: "south-park-commons-2025",
    name: "South Park Commons Fellowship",
    logoUrl: "https://cdn.fellows.best/logos/south-park-commons-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/south-park-commons-2025-banner.jpg",
    description:
      "Fellowship-style community program investing $400,000 for 7% equity + $600K follow-on.",
    fullDescription:
      "South Park Commons (SPC) offers a 1-year fellowship and early-stage accelerator for builders (not just idea stage). The fellowship provides community, mentorship, and resources instead of a fixed curriculum or Demo Day. SPC invests $400,000 for 7% equity in participating startups, with an additional $600K guaranteed follow-on investment from its fund. Applications are rolling and cohorts are small, led by partners one-on-one.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "fellowship",
      "community",
      "mentorship",
      "in-person",
    ],
    category: "fellowship",
    region: "North America",
    country: "United States",
    eligibility:
      "Founders (often technical) in exploratory phases, typically in hard tech, infra, or web3. Ideal for teams wanting a community-driven, unstructured fellowship rather than a formal accelerator.",
    applyLink: "https://www.southparkcommons.com/apply",
    benefits: [
      "$400,000 initial investment for 7% equity",
      "$600,000 guaranteed follow-on funding",
      "Community workspace in SF and weekly dinners",
      "1:1 partner mentorship and networking",
    ],
    organizer: "South Park Commons",
    funding: {
      amount: 400000,
      currency: "USD",
      equityPercentage: 7,
      fundingType: "equity-based",
    },
  },
  {
    id: "hf0-residency-2025",
    name: "HF0 Residency",
    logoUrl: "https://cdn.fellows.best/logos/hf0-residency-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/hf0-residency-2025-banner.jpg",
    description:
      "Intensive 12-week live-in accelerator writing a $1M SAFE for 5% (or $500K + 3%).",
    fullDescription:
      "HF0 (previously Hacking the Future Observatory) runs a 12-week live-in residency ('hacker monastery') in San Francisco for repeat technical founders. Participants receive $1,000,000 via an uncapped SAFE for 5% of the company (or an alternative $500K + 3% equity). The program is highly intensive, culture-focused, and invite-only. Only experienced startup builders are typically admitted.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "immersive", "tech", "in-person"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Repeat technical founders with prior startup experience; applicants must be ready for an all-in living program in SF and have a strong prototype or traction.",
    applyLink: "https://www.hf0.com",
    benefits: [
      "$1,000,000 funding (uncapped SAFE) for 5% (or $500K + 3%)",
      "12-week live-in residency in San Francisco",
      "Very hands-on technical and strategy support",
      "Access to private investor network for follow-on rounds",
    ],
    organizer: "HF0 (Residency)",
    funding: {
      amount: 1000000,
      currency: "USD",
      equityPercentage: 5,
      fundingType: "equity-based",
    },
  },
  {
    id: "neo-accelerator-2025",
    name: "NEO Accelerator",
    logoUrl: "https://cdn.fellows.best/logos/neo-accelerator-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/neo-accelerator-2025-banner.jpg",
    description:
      "3-month hybrid accelerator offering $600K via uncapped SAFE (with $10M floor) + equity.",
    fullDescription:
      "NEO runs a 3-month program starting with an Oregon bootcamp and continuing with Bay Area co-working. It invests $600K via an uncapped SAFE note (with a $10M valuation floor) plus 1.5% common stock. The program includes technical and business mentorship, plus priority access to GPU/AI resources. The next cohort's deadline is March 14, 2025.",
    openDate: null,
    closeDate: "2025-03-14",
    tags: ["equity-based", "accelerator", "AI", "retreat", "in-person"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Startup teams (particularly AI/ML) with technical founders; program requires relocation to Oregon/SF for 3 months and has an application deadline.",
    applyLink: "https://neo.com",
    benefits: [
      "$600,000 uncapped SAFE investment (with $10M floor) + 1.5% equity",
      "3-month intensive program (Oregon bootcamp + SF office)",
      "Priority GPU credits and enterprise partnerships (e.g. Azure, OpenAI)",
      "Dedicated mentorship and Demo Day",
    ],
    organizer: "NEO (Global)",
    funding: {
      amount: 600000,
      currency: "USD",
      equityPercentage: 1.5,
      fundingType: "equity-based",
    },
  },
  {
    id: "pearx-2025",
    name: "PearX",
    logoUrl: "https://cdn.fellows.best/logos/pearx-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/pearx-2025-banner.jpg",
    description:
      "12-week accelerator by Pear VC investing $250K–$2M in each startup.",
    fullDescription:
      "PearX is Pear VC's accelerator in Menlo Park for ambitious startups. It provides $250,000 to $2,000,000 in funding via a SAFE (no fixed equity %) and a 12-week program. Cohorts are limited (~20 teams), and graduates get 6 months of free office space in San Francisco. PearX is staffed by hands-on partners who were founders themselves.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "tech",
      "mentorship",
      "in-person",
      "seed-stage",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage startups (pre-seed to seed) typically in tech; teams should be prepared for intensive mentorship in SF. Applications are interviewed on a rolling basis.",
    applyLink: "https://pear.vc/pearx",
    benefits: [
      "$250K–$2M SAFE funding (terms negotiated per startup)",
      "12-week accelerator program",
      "Free office space in San Francisco for 6 months",
      "Intensive mentoring by former startup founders at Pear VC",
    ],
    organizer: "Pear VC",
    funding: {
      amount: 1125000,
      currency: "USD",
      equityPercentage: 0,
      fundingType: "equity-based",
      isApproximate: true,
    },
  },
  {
    id: "pioneer-2025",
    name: "Pioneer",
    logoUrl: "https://cdn.fellows.best/logos/pioneer-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/pioneer-2025-banner.jpg",
    description:
      "$20K for 1% equity (or advisory only); virtual startup contest with mentors.",
    fullDescription:
      "Pioneer is a global online startup competition/accelerator. Founders join for a multi-week 'tournament' where they report progress weekly. High-performing teams earn a $20,000 investment for 1–2% equity (or optionally only advisory support). The program is fully remote with optional summit in SF. Progress is quantified by points, and the top finalists can receive funding and other support.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "online", "remote", "global"],
    category: "accelerator",
    region: "Global",
    country: "Various",
    eligibility:
      "Startup founders at any stage worldwide; need to commit to weekly tasks and the online format. Solo or team entrants welcomed.",
    applyLink: "https://pioneer.app",
    benefits: [
      "$20,000 investment for 1% equity (for top participants)",
      "Remote program with mentorship",
      "Option to attend an SF summit",
      "Access to Pioneer alumni network",
    ],
    organizer: "Pioneer",
    funding: {
      amount: 20000,
      currency: "USD",
      equityPercentage: 1,
      fundingType: "equity-based",
    },
  },
  {
    id: "launch-accelerator-2025",
    name: "LAUNCH Accelerator",
    logoUrl: "https://cdn.fellows.best/logos/launch-accelerator-2025-logo.png",
    shareImageUrl:
      "https://cdn.fellows.best/banners/launch-accelerator-2025-banner.jpg",
    description:
      "$125K for 6–7% equity; 14-week accelerator founded by Jason Calacanis.",
    fullDescription:
      "LAUNCH is a San Francisco accelerator by Jason Calacanis that runs twice yearly. It invests $125,000 in exchange for roughly 6–7% equity. The 14-week program focuses heavily on fundraising, with intensive mentoring and exposure to 700+ angel investors. It is suited for startups with initial traction (e.g. >$2K MRR or >3K DAU).",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "tech",
      "mentorship",
      "in-person",
      "seed-stage",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage startups with some traction (e.g. existing users or revenue); teams should be prepared for a 14-week in-person program and active fundraising focus.",
    applyLink: "https://launchaccelerator.co/",
    benefits: [
      "$125,000 seed investment for ~6–7% equity",
      "14-week program with hands-on mentorship",
      "Access to a network of 700+ angel investors",
      "Personal coaching from experienced startup investors",
    ],
    organizer: "LAUNCH",
    funding: {
      amount: 125000,
      currency: "USD",
      equityPercentage: 6.5,
      fundingType: "equity-based",
      isApproximate: true,
    },
  },
  {
    id: "the-mint-2025",
    name: "The Mint (BTV)",
    logoUrl: "https://cdn.fellows.best/logos/the-mint-2025-logo.png",
    //TODO: improve banner quality
    shareImageUrl: "https://cdn.fellows.best/banners/the-mint-2025-banner.jpg",
    description: "10-week fintech accelerator; invests $500K for 10% SAFE.",
    fullDescription:
      "The Mint (run by BTV Capital) is a 10-week accelerator focused on fintech startups in NYC and SF. It provides $500,000 in exchange for 10% of the company via a SAFE agreement. The program includes intensive mentoring from fintech experts and a founder retreat. The next cohort opens in Q4 2025 (application period to be announced).",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "fintech",
      "mentorship",
      "short-term",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage fintech startups (no fixed revenue requirement), with a founding team capable of tackling financial technology challenges.",
    applyLink: "https://btv.vc/the-mint",
    benefits: [
      "$500,000 investment (SAFE) for 10% equity",
      "10-week fintech-focused accelerator",
      "Mentorship from fintech and banking leaders",
      "Annual founder retreat and network access",
    ],
    organizer: "BTV Capital (The Mint)",
    funding: {
      amount: 500000,
      currency: "USD",
      equityPercentage: 10,
      fundingType: "equity-based",
    },
  },
  {
    id: "angelpad-2025",
    name: "AngelPad",
    logoUrl: "https://cdn.fellows.best/logos/angelpad-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/angelpad-2025-banner.jpg",
    description: "10-week accelerator (NYC/SF) offering $120K for 7% equity.",
    fullDescription:
      "AngelPad is a seed-stage accelerator in NYC and San Francisco, accepting only ~15 startups per batch. It provides $120,000 for about 7% equity. The intensive 10-week program emphasizes company-building and has a highly competitive admission rate (<1%). Applications open twice a year and require a concise pitch deck and video.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "tech",
      "mentorship",
      "intensive",
      "pre-seed",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage tech startups; teams should have some initial product or traction. Strong teams are emphasized over the idea itself.",
    applyLink: "https://angelpad.org",
    benefits: [
      "$120,000 seed investment for ~7% equity",
      "10-week intensive accelerator",
      "Mentorship by experienced entrepreneurs",
      "Demo Day with major investors",
    ],
    organizer: "AngelPad",
    funding: {
      amount: 120000,
      currency: "USD",
      equityPercentage: 7,
      fundingType: "equity-based",
    },
  },
  {
    id: "betaworks-ai-camp-2026",
    name: "Betaworks AI Camp",
    logoUrl: "https://cdn.fellows.best/logos/betaworks-ai-camp-2026-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/betaworks-ai-camp-2026-banner.jpg",
    description:
      "$500K investment from a Betaworks-led syndicate for AI startups.",
    fullDescription:
      "Betaworks AI Camp is a 12-week program in New York City for early-stage AI startups (with focuses like agentic B2B, personalized AI, etc.). Participating teams receive a $500,000 investment from a syndicate led by Betaworks. The program runs cohort-based, culminating in a Demo Day. (Next application cycle opens in Q1 2026.)",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "AI",
      "technology",
      "mentorship",
      "pre-seed",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "AI-native startups at idea or prototype stage; teams must be prepared to work in NYC for 12 weeks and focus on one of the program's AI tracks.",
    applyLink: "https://betaworks.com/camp",
    benefits: [
      "$500,000 funding (via syndicate)",
      "12-week AI-focused accelerator program",
      "Guidance from Betaworks and AI experts",
      "Demo Day exposure",
    ],
    organizer: "Betaworks",
  },
  {
    id: "greylock-edge-2025",
    name: "Greylock Edge",
    logoUrl: "https://cdn.fellows.best/logos/greylock-edge-2025-logo.png",
    shareImageUrl:
      "https://cdn.fellows.best/banners/greylock-edge-2025-banner.jpg",
    description:
      "3-month program with custom SAFE or priced terms + $500K+ in partner credits.",
    fullDescription:
      "Greylock Edge is a year-round early-stage program for pre-idea to seed founders, especially in enterprise and AI. It provides capital on custom terms (often a SAFE or note) plus $500,000+ worth of partner credits (cloud, engineering, etc.). The 3-month program is flexible and tailored, with no fixed deadline (referral or direct application). Participants get mentorship and access to Greylock's AI and enterprise network.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "AI", "enterprise", "remote"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Technical founders (especially enterprise/AI) at idea or seed stage; application is invite-preferred (referrals valued).",
    applyLink: "https://greylock.com/edge",
    benefits: [
      "Custom convertible SAFE or priced investment",
      "$500K+ in partner credits (cloud, dev tools, etc.)",
      "3-month tailored advisory program",
      "Access to Greylock's network (AI experts, customers)",
    ],
    organizer: "Greylock",
  },
  {
    id: "conviction-embed-2025",
    name: "Conviction Embed",
    logoUrl: "https://cdn.fellows.best/logos/conviction-embed-2025-logo.png",
    shareImageUrl:
      "https://cdn.fellows.best/banners/conviction-embed-banner.png",
    description:
      "Hands-on embedded partner program offering a $150K uncapped SAFE (MFN).",
    fullDescription:
      "Conviction Embed is a remote-first accelerator that provides $150,000 via an uncapped SAFE (with MFN clause). Over 90 days, Conviction's partners work 'embedded' with the founding team to build the product and business. The focus is on B2B SaaS and developer tools. Cohorts are very small and invite-only (warm intros recommended).",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "SaaS", "software", "mentorship"],
    category: "accelerator",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders building B2B SaaS or infrastructure software; program is by referral/direct application, with a focus on execution during the cohort.",
    applyLink: "https://conviction.com/embed",
    benefits: [
      "$150,000 investment (uncapped SAFE, MFN) ",
      "90-day embedded support from Conviction's investor-partners",
      "Hands-on product and business coaching",
      "Access to Conviction's network",
    ],
    organizer: "Conviction",
  },
  {
    id: "openai-converge-2024",
    name: "OpenAI Converge",
    logoUrl: "https://cdn.fellows.best/logos/openai-logo.png",
    shareImageUrl:
      "https://cdn.fellows.best/banners/openai-converge-2024-banner.jpg",
    description:
      "6-week AI startup summit with $1M equity investment from OpenAI's Startup Fund.",
    fullDescription:
      "OpenAI Converge is an intensive 6-week program (in San Francisco) for AI-first startups. Selected teams receive a $1,000,000 equity investment from the OpenAI Startup Fund. The program includes deep technical sessions, researcher office hours, and mentorship with OpenAI engineers. The next cohort dates are TBA (Converge 2 applications closed Jan 26 2024).",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "AI", "summit", "mentorship"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Founders building ambitious AI applications with working prototypes; program is invitation-only (OpenAI may reach out to promising teams).",
    applyLink: "https://openai.fund",
    benefits: [
      "$1,000,000 equity investment from OpenAI Fund",
      "6-week intensive program with early access to models",
      "Mentorship and office hours with OpenAI researchers",
      "Networking with AI startup peers and investors",
    ],
    organizer: "OpenAI Startup Fund",
  },
  {
    id: "startup-wise-guys-2025",
    name: "Startup Wise Guys",
    logoUrl: "https://cdn.fellows.best/logos/startup-wise-guys-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/startup-wise-guys-2025-banner.jpg",
    description:
      "Europe-wide accelerator (HQ Tallinn) providing up to €65K seed funding plus follow-on up to €300K.",
    fullDescription:
      "Startup Wise Guys is a European accelerator headquartered in Tallinn, Estonia, with programs across Europe. It invests up to €65,000 in each pre-seed startup for equity (size varies by cohort), and can follow on with up to €300,000. The program is ~5 months hybrid (online + on-site), with tracks like SaaS, cybersecurity, and sustainability. Multiple cohorts run each year.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "tech",
      "mentorship",
      "Europe",
      "pre-seed",
    ],
    category: "accelerator",
    region: "Europe",
    country: "Estonia",
    eligibility:
      "Early-stage tech startups based in Europe (or global with EU ties); focus on SaaS, cybersecurity, sustainability, etc. The accelerator seeks teams ready for a 5-month program across locations.",
    applyLink: "https://startupwiseguys.com/all-programs/",
    benefits: [
      "Up to €65,000 equity investment",
      "5-month hybrid accelerator program",
      "Mentorship and training by startup experts",
      "Access to Startup Wise Guys investor network",
    ],
    organizer: "Startup Wise Guys",
  },
  {
    id: "apx-2025",
    name: "APX by Porsche & Axel Springer",
    logoUrl: "https://cdn.fellows.best/logos/apx-2025-logo.png",
    shareImageUrl: "https://cdn.fellows.best/banners/apx-2025-banner.jpg",
    description:
      "Berlin-based accelerator with up to €50K for 5% (and follow-on up to €500K).",
    fullDescription:
      "APX is an early-stage accelerator based in Berlin, backed by Porsche and Axel Springer. It offers a 100-day program plus optional follow-on funding. The initial investment is €50,000 for about 5% equity, with the option of up to €500,000 total invested per startup. APX focuses on consumer tech and provides corporate pilot access and rolling applications.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "corporate-backed", "tech", "Europe"],
    category: "accelerator",
    region: "Europe",
    country: "Germany",
    eligibility:
      "Early-stage startups (pre-seed/seed) in consumer or B2B tech; teams should be based in or willing to relocate to Berlin. Notable for corporate partnership access and startup support.",
    applyLink: "https://apx.vc/looking-for-funding",
    benefits: [
      "€50,000 investment for ~5% equity (initial round)",
      "100-day accelerator program with mentorship",
      "Access to pilot opportunities with Porsche/Axel Springer",
      "Up to €500,000 total funding potential",
    ],
    organizer: "APX (Porsche & Axel Springer)",
  },
  {
    id: "seedcamp-2025",
    name: "Seedcamp",
    logoUrl: "https://cdn.fellows.best/logos/seedcamp-2025-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/seedcamp-2025-banner.jpg",
    description: "Europe's flagship seed fund; invests €100–€200K for ~7–7.5%.",
    fullDescription:
      "Seedcamp is Europe's first seed accelerator and fund, based in London. It provides €100,000–€200,000 investment in exchange for roughly 7–7.5% equity. Unlike a fixed cohort model, Seedcamp runs rolling applications and periodic 'Seedcamp Weeks' where selected companies join workshops and pitch events. Seedcamp places emphasis on global scaling and has built a vast mentor network.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "venture", "Europe", "mentorship"],
    category: "accelerator",
    region: "Europe",
    country: "United Kingdom",
    eligibility:
      "European (and global) startups at the seed stage; typically tech-focused with a global ambition. Teams must be willing to engage in Seedcamp's workshops and events in Europe.",
    applyLink: "https://seedcamp.com",
    benefits: [
      "€100,000–€200,000 seed investment (7–7.5% equity)",
      "Year-long platform with rolling admissions",
      "Access to Seedcamp's mentor and investor network",
      "Participation in Seedcamp Week events",
    ],
    organizer: "Seedcamp",
  },
  {
    id: "google-for-startups-2025",
    name: "Google for Startups Accelerator",
    logoUrl: "https://cdn.fellows.best/logos/google-for-startups-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/google-for-startups-2025-banner.jpg",
    description:
      "Equity-free accelerator: no cash funding, but up to $100K GCP credits.",
    fullDescription:
      "Google for Startups runs various accelerator programs globally (e.g. AI, Women Founders, Climate). These are equity-free. Startups receive up to $100,000 in Google Cloud Platform credits (plus $350,000 in related support credits), and intensive mentorship from Google and partner experts. Programs run 3 times/year by region and support companies from seed to Series A with traction.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "accelerator", "cloud", "global", "partnership"],
    category: "accelerator",
    region: "Global",
    country: "United States",
    eligibility:
      "High-growth startups (seed to Series A) with demonstrated traction; program tracks vary by region and focus (AI, fintech, etc.).",
    applyLink: "https://startup.google.com/intl/en/programs/directory/",
    benefits: [
      "Up to $100,000 in Google Cloud credits",
      "Equity-free structured mentorship program",
      "Access to Google's startup community and events",
      "Specialized tracks (AI, climate, etc.)",
    ],
    organizer: "Google for Startups",
  },
  {
    id: "accel-atoms-2025",
    name: "Accel Atoms",
    logoUrl: "https://cdn.fellows.best/logos/accel-atoms-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/accel-atoms-2025-banner.jpg",
    description:
      "$500K–$1M seed participation by Accel for India-first startups.",
    fullDescription:
      "Accel Atoms is an India-focused initiative by VC firm Accel. It supports early-stage Indian startups by participating in their $500K–$1M seed rounds. There isn't a fixed curriculum; instead, companies join an ongoing founder network and benefit from Accel's mentorship and resources. The program cohorts begin annually, focusing on India's tech ecosystem.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "India", "tech", "network"],
    category: "accelerator",
    region: "Asia",
    country: "India",
    eligibility:
      "India-based startup founders in tech sectors; should be at pre-seed/seed stage looking for a lead investor. Selection is competitive and annual.",
    applyLink: "https://apply.accel-atoms.com",
    benefits: [
      "$500K–$1M investment participation",
      "Entry into Accel's exclusive startup network",
      "Mentorship from Accel's partners",
      "Ongoing cohort programming (not time-limited batch)",
    ],
    organizer: "Accel",
  },
  {
    id: "ai2-incubator-2025",
    name: "AI2 Incubator",
    logoUrl: "https://cdn.fellows.best/logos/ai2-incubator-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/ai2-incubator-2025-banner.jpg",
    description:
      "$50K–$150K seed funding in exchange for equity for AI startups.",
    fullDescription:
      "The Allen Institute for AI runs an incubator (Seattle-based) that provides $50,000–$150,000 in pre-seed funding to AI startups. Participant teams work alongside AI researchers at AI2's campus and have access to academic AI resources and labs. The program is hybrid (6-month residency in Seattle) and teams must relocate during the program. Rolling applications are accepted.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "incubator", "AI", "research", "Washington"],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage AI startups (often deep tech or spinoffs) required to relocate to Seattle for 6 months. Teams get mentorship from AI2 researchers and legal funding.",
    applyLink: "https://www.ai2incubator.com/apply",
    benefits: [
      "$50,000–$150,000 investment",
      "6-month residency at AI2's Seattle campus",
      "Mentoring by leading AI researchers",
      "Access to AI2's compute resources and labs",
    ],
    organizer: "Allen Institute for AI (Incubator)",
  },
  {
    id: "soma-capital-fellowship-2025",
    name: "Soma Capital Fellowship",
    logoUrl:
      "https://cdn.fellows.best/logos/soma-capital-fellowship-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/soma-capital-fellowship-2025-banner.jpg",
    description:
      "Semi-annual fellowship investing $100K SAFE (<1% equity) in founders.",
    fullDescription:
      "Soma Capital Fellowship is a virtual fellowship for ambitious early-stage founders, especially in AI or tech. Soma provides a $100,000 SAFE investment (with founders usually keeping <1% dilution). Accepted founders join a remote Slack community and receive workshops and potential follow-on funding up to $1M later. Applications are by referral or a short form.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "fellowship", "seed", "remote", "mentorship"],
    category: "fellowship",
    region: "Global",
    country: "United States",
    eligibility:
      "Tech founders at pre-seed stage (idea or early prototype), especially in AI/ML. Open to global applicants; admission is competitive and network-driven.",
    applyLink: "https://programs.somacap.com/fellows",
    benefits: [
      "$100,000 SAFE investment (minimal equity stake)",
      "Membership in a global founder community",
      "Workshops on product, tech, and fundraising",
      "Possibility of follow-on funding up to $1M",
    ],
    organizer: "Soma Capital",
  },
  {
    id: "founder-institute-2025",
    name: "Founder Institute",
    logoUrl: "https://cdn.fellows.best/logos/founder-institute-2025-logo.jpg",
    //TODO: improve quality
    shareImageUrl:
      "https://es.investinbogota.org/wp-content/uploads/2025/01/founder-logos.jpg",
    description:
      "16-week pre-seed accelerator/education program; participants share equity, often receive $10–$20K each.",
    fullDescription:
      "Founder Institute is a global idea-to-IPO accelerator operating in 200+ cities. It is equity-based: founders join cohorts and share equity in a central fund (each company typically gives ~4–5% to FI). The program lasts 16 weeks, guiding founders to develop a minimum viable product and company structure. Founders pay tuition by giving equity (~4–6%) or a small cash fee.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "accelerator", "education", "pre-seed", "global"],
    category: "accelerator",
    region: "Global",
    country: "Various",
    eligibility:
      "Idea-stage or pre-seed entrepreneurs; no requirement for a prototype or co-founder. Founder commitments include weekly meetings and an aptitude test. Operating across many cities and virtually.",
    applyLink: "https://fi.co/join/home",
    benefits: [
      "$10,000+ in initial funding per founder (via collective equity pool)",
      "16-week structured curriculum",
      "Mentorship from global entrepreneurs and investors",
      "Network of 20,000+ Founder Institute alumni",
    ],
    organizer: "Founder Institute",
  },
  {
    id: "boost-vc-2025",
    name: "Boost VC",
    logoUrl: "https://cdn.fellows.best/logos/boost-vc-2025-logo.png",
    shareImageUrl: "https://cdn.fellows.best/banners/boost-vc-2025-banner.jpg",
    description: "Deep tech accelerator investing $500,000 for ~15% equity.",
    fullDescription:
      "Boost VC runs a 3-month accelerator program in Silicon Valley (its 'Tribes') focused on sci-fi and frontier technologies. It leads pre-seed rounds with $500,000 checks (typically ~15% equity). Founders get mentorship, weekly dinners and a Demo Day, with optional housing and office space provided in San Mateo during the program.",
    openDate: null,
    closeDate: null,
    tags: [
      "equity-based",
      "accelerator",
      "deep-tech",
      "mentorship",
      "in-person",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage sci-fi tech founders; full-time commitment required and readiness to relocate to the Bay Area.",
    applyLink: "https://www.boost.vc",
    benefits: [
      "$500,000 seed investment (pre-seed)",
      "Three-month accelerator program in San Mateo, CA",
      "Office space and optional housing provided",
      "Weekly dinners, mentorship, and Demo Day",
    ],
    organizer: "Boost VC",
    funding: {
      amount: 500000,
      currency: "USD",
      equityPercentage: 15,
      fundingType: "equity-based",
    },
  },
  {
    id: "vercel-open-source-program",
    name: "Vercel Open Source Program",
    logoUrl:
      "https://cdn.fellows.best/logos/vercel-open-source-program-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/vercel-open-source-program-banner.jpg",
    description:
      "Seasonal cohort-based program offering impactful open source projects up to $3,600 in Vercel credits, third-party OSS starter-pack credits, and prioritized support.",
    fullDescription:
      "The Vercel Open Source Program runs quarterly cohorts that curate a small group of high-impact, actively maintained open source projects. Selected projects receive $3,600 in Vercel platform credits (valid over 12 months), additional credits from third-party partners to boost their stack, and prioritized community support and guidance via a dedicated Slack workspace. The program is open to any open source project hosted (or intended to be hosted) on Vercel that demonstrates measurable impact or growth potential, follows a Code of Conduct, and uses credits exclusively for open source work. Nonprofits and startups with open source projects are equally welcome to apply. Applications reopen each season (next cohort opens in July 2025).",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "mentorship", "short-term", "tech", "in-person"],
    category: "fellowship",
    region: "Global",
    country: null,
    eligibility:
      "Actively maintained open source projects hosted (or intended) on Vercel that demonstrate measurable impact or growth potential, adhere to a Code of Conduct; nonprofits and startups with OSS are eligible.",
    applyLink: "https://vercel.com/docs/open-source-program",
    benefits: [
      "$3,600 in Vercel platform credits over 12 months",
      "Additional OSS starter-pack credits from third-party partners",
      "Prioritized community support and guidance",
      "Access to a dedicated Slack workspace for cohort members",
    ],
    organizer: "Vercel",
  },
  {
    id: "afore-grants",
    name: "Afore Grants",
    logoUrl: "https://cdn.fellows.best/logos/afore-grants-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/afore-grants-banner.jpg",
    description:
      "100% non‐dilutive microgrants of $1,000 for high‐agency builders aged 21 or younger in North America, paired with mentorship and program support.",
    fullDescription:
      "Afore Grants support high‐agency builders (≤21 years old) in North America who want to explore bold ideas. Each recipient receives $1,000 in equity‐free funding, paired mentorship from an experienced founder and an investor, weekly office hours and talks, access to office space, and the option to join a demo day. Applications are reviewed on a rolling basis via a simple one‐question form.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "mentorship", "short-term", "under-25", "funding"],
    category: "grant",
    region: "North America",
    country: null,
    eligibility:
      "High‐agency builders aged 21 or younger based in North America; any project idea; no equity requirement; simple one‐question application followed by a short interview.",
    applyLink: "https://grants.afore.vc",
    benefits: [
      "$1,000 in non‐dilutive funding",
      "Paired mentorship from an experienced founder and an investor",
      "Weekly office hours, talks, and support",
      "Access to office space",
      "Option to join a demo day",
    ],
    organizer: "Afore Capital",
    funding: {
      amount: 1000,
      currency: "USD",
      equityPercentage: 0,
      fundingType: "equity-free",
    },
  },
  {
    id: "776-foundation-2025",
    name: "776 Foundation Fellowship",
    logoUrl: "https://cdn.fellows.best/logos/776-foundation-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/776-foundation-2025-banner.jpg",
    description:
      "Two-year full-time fellowship offering a $100,000 grant to young innovators aged 18–24 working on high-impact climate change projects; open globally and requires fellows to take a leave from or forgo university.",
    fullDescription:
      "The 776 Foundation Fellowship supports 20 exceptional individuals (18–24) for two years to work full-time on innovative solutions to climate change instead of pursuing a university degree. Fellows receive a $100,000 grant distributed quarterly, access to the 776 network and its operating system, Cerebro, and mentorship from industry experts. The 2025 cohort applications open on 2025-03-12 and close on 2025-04-14, with the fellowship beginning on 2025-06-23.",
    openDate: "2025-03-12",
    closeDate: "2025-04-14",
    tags: ["equity-free", "mentorship", "long-term", "climate", "under-25"],
    category: "fellowship",
    region: "Global",
    country: null,
    eligibility:
      "Applicants must be aged 18–24, globally located, with an original project addressing climate change, and able to commit full-time (skipping or pausing university) for two years.",
    applyLink: "https://www.776.org/",
    benefits: [
      "$100,000 grant over two years",
      "Access to the 776 network and Cerebro OS",
      "Quarterly funding disbursements",
      "Mentorship from climate experts",
      "Community of peers tackling climate change",
    ],
    organizer: "776 Foundation",
    funding: {
      amount: 100000,
      currency: "USD",
      equityPercentage: 0,
      fundingType: "equity-free",
    },
  },
  {
    id: "the-residency-startup",
    name: "The Residency",
    logoUrl: "https://cdn.fellows.best/logos/the-residency-startup-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/the-residency-startup-banner.jpg",
    description:
      "3–6-month in-person cohorts providing full-time housing, co-working space, and community for ambitious builders; locations include San Francisco, Berkeley, Cambridge (MA), Berlin, and Bangalore.",
    fullDescription:
      "The Residency runs 3–6-month immersive cohorts in hubs around the world—starting in Silicon Valley—and provides dedicated housing and co-working space so residents can go full-time on their ventures. Participants benefit from weekly syncs, one-on-one coaching, Demo Days with top investors (e.g., a16z, 1517 Fund, ZFellows), compute credits, food discounts, and community events that foster deep connections across locations in San Francisco, Berkeley, Cambridge (MA), Berlin, and Bangalore. Fees range from $500–$2,600/month depending on location; grants and visa support options available for eligible builders.",
    openDate: null,
    closeDate: null,
    tags: [
      "housing-included",
      "mentorship",
      "medium-term",
      "in-person",
      "community",
    ],
    category: "residency",
    region: "Global",
    country: null,
    eligibility:
      "Inventors, builders, or researchers who can commit full-time (no concurrent school or job) for 3–6 months and bring a high-agency, project-oriented mindset.",
    applyLink: "https://coda.io/form/the-residency-interest-form_dyWz6ArCkaE",
    benefits: [
      "Full-time housing and co-working space",
      "Weekly syncs and personalized coaching",
      "Demo Day with leading investors",
      "Compute credits, food discounts, and free therapy options",
    ],
    organizer: "The Residency",
  },
  {
    id: "edge-city",
    name: "Edge City Fellowship",
    logoUrl: "https://cdn.fellows.best/logos/edge-city-shift-grants-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/edge-city-shift-grants-banner.jpg",
    description:
      "Month-long immersive pop-up village experience for builders under 25, fully covered (housing & ticket) at Edge City's global sites.",
    fullDescription:
      "The Edge City Fellowship is a month-long in-person program empowering high-agency builders (under 25) to accelerate human flourishing across frontier tech, science & society. Fellows receive a full ride to one of Edge City's popup villages (e.g. Edge Esmeralda in Healdsburg, CA, May 24 – June 21 2025; Edge City LatAm in Argentina later in the year), access to a global mentorship network, and opportunities for follow-on funding via Long Journey VC and internal grant programs.",
    openDate: null,
    closeDate: "closed",
    tags: [
      "housing-included",
      "mentorship",
      "short-term",
      "under-25",
      "in-person",
    ],
    category: "fellowship",
    region: "Global",
    country: null,
    eligibility:
      "Curious, kind, high-agency builders under 25 with a strong proof-of-work portfolio; no formal education requirements.",
    applyLink:
      //TODO: look for 2026 opportunity on 2026-01-01
      "https://edgecity.notion.site/The-Edge-City-Fellowship-fc96ca95efca43d289388a45cd98c631",
    benefits: [
      "Full ride to a month-long popup village (housing & ticket)",
      "Access to Edge City's global mentorship & builder network",
      "Opportunities for follow-on funding (Inflection & SHIFT grants, VC pitches)",
    ],
    organizer: "Edge City",
  },
  {
    id: "edge-city-shift-grants",
    name: "Edge City SHIFT Grants",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1754493933625737216/5pr4yurq_400x400.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/edge-city-shift-grants-banner.jpg",
    description:
      "Tiered grants ($5K–$40K) for d/acc projects in biosecurity, cyber defense, info resilience, physical resilience, neurotech & social technology.",
    fullDescription:
      "The SHIFT Grants Program funds decentralized acceleration (d/acc) projects in six key areas: biosecurity & pandemic defense, cyber defense & cryptography, information resilience, physical resilience & infrastructure, neurotech & augmented cognition, and social technology & governance. We offer Micro Grants ($5 000–$15 000) for prototypes and exploratory experiments, and Development Grants ($20 000–$40 000) for milestone-driven teams, with potential for additional follow-on funding.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "funding", "short-term", "tech", "research"],
    category: "grant",
    region: "Global",
    country: null,
    eligibility:
      "Small teams, researchers, and startups developing real-world deployable projects in any of the six d/acc focus areas.",
    applyLink: "https://www.edgecity.live/shift",
    benefits: [
      "Micro Grants ($5 000–$15 000) for prototypes",
      "Development Grants ($20 000–$40 000) for milestone-driven execution",
      "Potential for follow-on funding and collaboration with Edge City",
    ],
    organizer: "Edge City",
  },
  {
    id: "entrepreneurs-first-fall-2025",
    name: "Entrepreneurs First",
    logoUrl:
      "https://cdn.fellows.best/logos/entrepreneurs-first-fall-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/entrepreneurs-first-fall-2025-banner.jpg",
    description:
      "12-week in-person talent-investor program across EF offices in London, Paris, Bangalore & San Francisco; Fall 2025 application deadlines: June 29 (Bangalore), July 14 (Paris), August 1 (London).",
    fullDescription:
      "Entrepreneurs First (EF) is an international talent investor that backs exceptional individuals pre-team and pre-idea. Participants join a 12-week 'FORM' program to find cofounders and validate their startup concepts, then a 12-week 'LAUNCH' in San Francisco culminating in Demo Day. Fellows receive a living stipend, equity-free grant, bespoke cofounder matching, office space, and hands-on support to build and scale their companies.",
    openDate: "2025-06-29",
    closeDate: "2025-08-01",
    tags: ["equity-based", "mentorship", "medium-term", "tech", "in-person"],
    category: "accelerator",
    region: "Global",
    country: null,
    eligibility:
      "Exceptional individuals (solo or small teams) with high potential to found tech startups; no prior idea or cofounder required.",
    applyLink: "https://apply.joinef.com/",
    benefits: [
      "Equity-free grant to support living costs during FORM",
      "Up to $250K pre-seed investment upon company formation",
      "Up to $3M in follow-on funding through Series B",
      "Over $600K in cloud and AI credits (Azure, OpenAI, Anthropic, GitHub…) ",
      "Office space for nine months in London, Paris, Bangalore & San Francisco",
      "Access to global network of top founders and investors",
    ],
    organizer: "Entrepreneurs First",
  },
  {
    id: "emergent-ventures",
    name: "Emergent Ventures Fellowship",
    logoUrl: "https://cdn.fellows.best/logos/emergent-ventures-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/emergent-ventures-banner.jpg",
    description:
      "Two-year flexible research grant and community designed to support high-impact thinkers tackling big, unconventional problems.",
    fullDescription:
      "Emergent Ventures, a program of the Mercatus Center at George Mason University, provides up to $100,000 over two years to exceptional researchers, entrepreneurs, and writers pursuing bold, high-leverage ideas. Fellows join a diverse cohort, receive mentorship from leading scholars and practitioners, and gain access to a vibrant community of innovators. There are no formal deadlines; applications are accepted on a rolling basis and reviewed monthly.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "mentorship", "long-term", "research", "funding"],
    category: "research",
    region: "Global",
    country: null,
    eligibility:
      "Independent researchers, entrepreneurs, and writers with high-potential, unconventional projects across any discipline.",
    applyLink: "https://mercatus.tfaforms.net/5099527",
    benefits: [
      "Up to $100,000 in funding over two years",
      "Direct mentorship from experts",
      "Access to a global community of fellows",
      "Flexible use of funds for salary, research expenses, or travel",
    ],
    organizer: "Mercatus Center",
    funding: {
      amount: 100000,
      currency: "USD",
      equityPercentage: 0,
      fundingType: "equity-free",
    },
  },
  {
    id: "y-combinator-fall-2025",
    name: "Y Combinator",
    logoUrl: "https://cdn.fellows.best/logos/y-combinator-fall-2025-logo.png",
    shareImageUrl: "https://cdn.fellows.best/banners/ycombinator-banner.png",
    description:
      "Seed-stage accelerator providing $500 000 in funding and mentorship for early-stage startups.",
    fullDescription:
      "Y Combinator runs a three-month accelerator program in Silicon Valley, investing $125 000 for 7% equity plus $375 000 on an uncapped SAFE (MFN clause). Participants get weekly dinners and office hours with top founders, culminating in Demo Day. Four batches run each year; applications for Fall 2025 are open now, with on-time deadline August 4, 2025 at 8 PM PT.",
    openDate: "2025-05-06",
    closeDate: "2025-08-04",
    tags: [
      "equity-based",
      "mentorship",
      "short-term",
      "tech",
      "in-person",
      "pre-seed",
    ],
    category: "accelerator",
    region: "North America",
    country: "United States",
    eligibility:
      "Early-stage startup teams with a working prototype or MVP; technical founders encouraged; open to any industry or geography.",
    applyLink: "https://www.ycombinator.com/apply",
    benefits: [
      "$125 000 for 7% equity",
      "$375 000 on an uncapped SAFE (MFN clause)",
      "Three-month intensive program",
      "Access to YC network and Demo Day",
    ],
    organizer: "Y Combinator",
    funding: {
      amount: 500000,
      currency: "USD",
      equityPercentage: 7,
      fundingType: "equity-based",
    },
    applicationVideo:
      "https://www.youtube.com/embed/B5tU2447OK8?si=qTJK_Bm_XSyaQQ02",
  },
  {
    id: "zfellows",
    name: "Z Fellows",
    logoUrl: "https://cdn.fellows.best/logos/zfellows-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/zfellows-banner.png",
    description:
      "One-week program offering a $10,000 stipend and mentorship from Silicon Valley's top founders for early technical builders.",
    fullDescription:
      "Z Fellows fast-tracks early technical tinkerers into Silicon Valley through a one-week intensive experience. Participants receive a $10K stipend to work full-time on their project alongside multi-billion-dollar founders, gain lifelong access to an elite network of mentors, and may opt into a $10K investment at a $1B valuation cap. Applications are reviewed on a rolling basis, cohorts run multiple times a year, and the final day culminates with in-person sessions in SF or NYC.",
    openDate: null,
    closeDate: null,
    tags: ["stipend", "mentorship", "short-term", "tech", "in-person"],
    category: "fellowship",
    region: "Global",
    country: null,
    eligibility:
      "Early-stage technical builders (solo or teams) working on side projects or startups; no prior company or age requirement.",
    applyLink:
      "https://docs.google.com/forms/d/1z5HG9Pj0hIxS2oZL_wcJS5QqDZlcVbkhYGHp5Kp_IGM/viewform?edit_requested=true",
    benefits: [
      "$10,000 stipend",
      "Mentorship from multi-billion-dollar founders",
      "Access to Silicon Valley network",
      "Optional $10K investment at a $1B valuation cap",
    ],
    organizer: "Z Fellows",
    funding: {
      amount: 10000,
      currency: "USD",
      equityPercentage: 0,
      fundingType: "mixed",
    },
  },
  {
    id: "a16z-crypto-startup-accelerator",
    name: "a16z Crypto Startup Accelerator",
    logoUrl:
      "https://cdn.fellows.best/logos/a16z-crypto-startup-accelerator-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/a16z-banner.png",
    description:
      "An intensive accelerator for early-stage blockchain and web3 startups, providing capital, mentorship, and network support.",
    fullDescription:
      "The a16z Crypto Startup Accelerator (CSX) is a cohort-based program for early-stage crypto/web3 startups. It connects founders with capital, industry experts, and a cohort of leading teams. Across locations like New York and London, it offers funding (historically up to ~$500K in exchange for equity), 10-week intensive curriculum on product-market fit, token design, go-to-market, legal/regulatory, and access to a16z's network of mentors, customers, and investors. Application windows vary by cohort—interested founders should subscribe for updates and check the accelerator page.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "mentorship", "medium-term", "web3", "hybrid"],
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
      "Access to a16z's broader network of advisors, potential customers, and investors",
      "Community events, workshops, and demo day to pitch to investors",
    ],
    organizer: "Andreessen Horowitz (a16z Crypto)",
  },
  {
    id: "ewor-fellowship",
    name: "EWOR Fellowship",
    logoUrl: "https://cdn.fellows.best/logos/ewor-fellowship-logo.png",
    shareImageUrl: "https://cdn.fellows.best/banners/ewor-banner.png",
    description:
      "A highly selective, virtual-first fellowship offering early-stage founders up to €500,000 in capital and 1:1 mentorship from unicorn founders to build global-impact ventures.",
    fullDescription:
      "The EWOR Fellowship is a rigorous program targeting the top 0.1% of founders worldwide. Founded in 2021 and based in Berlin, EWOR supports exceptional entrepreneurs through a virtual-first model that adapts to non-linear founder journeys. Fellows (just ~35 selected from over 35,000 applicants annually) receive up to €500,000 in capital (including €110,000 from EWOR GmbH plus €390,000 via an uncapped convertible instrument), intensive 1:1 mentorship (1–5 hours weekly) from unicorn founders, bespoke learning modules, and access to a curated network of over 2,000 mentors, VCs, and subject matter experts. The program embraces borderless participation—founders can be based anywhere—and focuses on those with the potential to build companies valued at €1B+ by combining scientific insight, real-world experience, and deep empathy for the founder's path. EWOR alumni typically raise €1–11M during the fellowship period and have achieved record-breaking funding rounds and exits. The selection uses ML-driven pattern recognition, intensive partner interviews, and evidence-based testing to identify visionaries, technical prodigies, and driven operators committed to solving significant global challenges.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "mentorship", "long-term", "tech", "virtual"],
    category: "fellowship",
    region: "Global",
    country: "",
    eligibility:
      "Exceptional early-stage founders worldwide (visionaries, technical prodigies, serial entrepreneurs) with demonstrated potential or traction; typically applicants who can benefit from intensive 1:1 mentorship and significant capital to scale ventures. Selection is highly competitive, with only ~35 fellows chosen from over 35,000 applicants annually.",
    applyLink: "https://ewor.com/apply",
    benefits: [
      "Up to €500,000 in capital (€110K from EWOR GmbH plus €390K via investment fund)",
      "1:1 mentorship (1–5 hours per week) with unicorn founders and seasoned entrepreneurs",
      "Bespoke learning modules tailored to each founder's needs",
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
    logoUrl: "https://cdn.fellows.best/logos/thiel-fellowship-2026-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/thiel-fellowship-banner.png",
    description:
      "A two-year, $200,000 grant program for innovators aged 22 or younger to pursue full-time projects instead of attending college.",
    fullDescription:
      "The Thiel Fellowship, founded by Peter Thiel through the Thiel Foundation in 2010, awards up to 20–30 fellows annually with $200,000 disbursed over two years and access to a global network of mentors, investors, and peers. Eligible applicants are individuals aged 22 or younger working on a concrete project—such as a startup, scientific research, social movement, or creative endeavor—and willing to drop out of or pause formal education to pursue it full-time. The program does not take equity in fellows' ventures. Applications are accepted on a rolling basis without fixed deadlines. Fellows receive guidance, networking opportunities, and support but are based globally and need not relocate to a specific location.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "mentorship", "long-term", "under-25", "funding"],
    category: "fellowship",
    region: "Global",
    country: "",
    eligibility:
      "Applicants must be aged 22 or younger at the time of application, have not yet received an undergraduate degree, and must be willing to drop out of or pause college if selected. Candidates should demonstrate meaningful progress on a concrete vision (e.g., startup, research, social initiative) and commitment to work full-time on it. No requirement for a team or prior incorporation, though evidence of traction or progress strengthens the application.",
    applyLink: "https://thielfellowship.org",
    benefits: [
      "US$200,000 grant disbursed over two years",
      "No equity taken in fellows' projects",
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
      "https://cdn.fellows.best/logos/global-good-fund-fellowship-2026-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/global-good-fund-banner.png",
    description:
      "A 12-month hybrid leadership program for social entrepreneurs worldwide, offering executive coaching, business mentorship, and a targeted $10,000 leadership development grant.",
    fullDescription:
      "The Global Good Fund Fellowship is a year-long hybrid leadership development program for social entrepreneurs and leaders of social enterprises globally. Fellows receive a comprehensive 360° leadership assessment, one-on-one executive coaching, and C-suite business mentorship, along with a $10,000 grant to invest in their leadership growth. Over 12 months, participants connect virtually with coaches and mentors, join a global cohort for peer learning, and convene at an annual in-person summit. The program is designed for founders or primary decision-makers running social enterprises that have been operational for at least two years with at least two full-time employees, fully committed to scaling impact. The Fellowship focuses on developing resilient, competent leaders who can tackle pressing social issues and drive sustainable growth for their organizations.",
    openDate: "2025-06-01",
    closeDate: "2025-07-01",
    tags: [
      "equity-free",
      "mentorship",
      "medium-term",
      "social-impact",
      "hybrid",
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
    logoUrl: "https://cdn.fellows.best/logos/localhost-france-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/localhost-banner.png",
    description:
      "A global, travelling fellowship with a hub in Tokyo for exceptional young builders to pursue full-time projects.",
    fullDescription:
      "LocalHost Fellowship offers free housing, travel grants, and support in Tokyo, Japan, as part of its global program backing founders, researchers, and creators to work full-time on ideas. Fellows in Japan benefit from co-working spaces, lab access, computing credits, mentorship, and community events, backed by LocalHost Ventures.",
    openDate: null,
    closeDate: null,
    tags: [
      "housing-included",
      "mentorship",
      "medium-term",
      "in-person",
      "travel-support",
    ],
    category: "residency",
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
    logoUrl: "https://cdn.fellows.best/logos/localhost-france-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/localhost-banner.png",
    description:
      "A global fellowship with hubs in Bangalore and New Delhi, supporting builders to pursue full-time projects.",
    fullDescription:
      "LocalHost Fellowship provides free housing and travel support in Bangalore and New Delhi, India, as part of its global program. Fellows gain access to co-working spaces, labs, computing credits, R&D grants, mentorship, and community events, backed by LocalHost Ventures to help turn ideas into real projects.",
    openDate: null,
    closeDate: null,
    tags: [
      "housing-included",
      "mentorship",
      "medium-term",
      "in-person",
      "travel-support",
    ],
    category: "residency",
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
    logoUrl: "https://cdn.fellows.best/logos/localhost-france-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/localhost-banner.png",
    description:
      "A global fellowship with a hub in Cluj-Napoca, Romania, for exceptional builders.",
    fullDescription:
      "LocalHost Fellowship offers free housing and support in Cluj-Napoca, Romania, as part of its global network. Fellows receive co-working access, lab facilities, computing credits, travel grants, mentorship, and community events, backed by LocalHost Ventures to help advance their projects.",
    openDate: null,
    closeDate: null,
    tags: [
      "housing-included",
      "mentorship",
      "medium-term",
      "in-person",
      "travel-support",
    ],
    category: "residency",
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
    logoUrl: "https://cdn.fellows.best/logos/localhost-france-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/localhost-banner.png",
    description:
      "A global fellowship with activities and events in Paris, France, supporting exceptional builders.",
    fullDescription:
      "LocalHost Fellowship hosts events and may offer residencies or travel grants for fellows to participate in Paris, France, as part of its global program. Participants benefit from co-working spaces, potential housing opportunities, computing credits, R&D grants, mentorship, and community events backed by LocalHost Ventures.",
    openDate: null,
    closeDate: null,
    tags: [
      "housing-included",
      "mentorship",
      "medium-term",
      "in-person",
      "travel-support",
    ],
    category: "residency",
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
    logoUrl: "https://cdn.fellows.best/logos/founders-inc-off-season-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/founders-inc.png",
    description:
      "6-week equity-free summer residency at Fort Mason for ambitious builders to obsess and build, ending in Demo Day with up to $250K funding opportunity.",
    fullDescription:
      "Off Season is a six-week intensive residency (June 23–August 1, 2025) at Founders Inc's 42,000 sq ft campus in Fort Mason, San Francisco. Instead of vacation, participants join ~50 peers in a no-curriculum, obsession-driven environment with workspace, prototyping facilities, mentorship from experienced founders, community events and workshops. The program culminates in a Demo Day where top teams may receive funding up to $250K. Applications are open until June 12, 2025 (late applications accepted until June 18, 2025).",
    openDate: "2026-06-01",
    closeDate: "2025-06-18",
    tags: ["equity-free", "mentorship", "short-term", "tech", "in-person"],
    category: "residency",
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
    id: "eu-lac-digital-accelerator-open-call-2025",
    name: "EU-LAC Digital Accelerator (Open Call)",
    logoUrl:
      "https://cdn.fellows.best/logos/eu-lac-digital-accelerator-open-call-2025-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/eu-lac-digital-accelerator-open-call-2025-banner.jpg",
    description:
      "Open call for partnerships between European and Latin American tech startups and corporates, offering acceleration services worth up to €30,000 and grants up to €10,500.",
    fullDescription:
      "The EU-LAC Digital Accelerator supports EU–Latin America/Caribbean collaborations on digital innovation projects. Selected partners receive customized acceleration services (coaching, pilot planning, market strategy) and grants for proof-of-concept development (up to €7K PoC grant, €2K travel, €1.5K equipment). Next open call is expected in summer 2025.",
    openDate: "2025-07-01",
    closeDate: "2025-10-31",
    tags: ["equity-free", "mentorship", "medium-term", "tech", "hybrid"],
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
  {
    id: "seven-seven-six",
    name: "Seven Seven Six (776)",
    logoUrl: "https://cdn.fellows.best/logos/seven-seven-six-logo.jpg",
    shareImageUrl:
      "https://cdn.fellows.best/banners/seven-seven-six-banner.webp",
    description:
      "Early-stage venture capital firm founded by Alexis Ohanian (also known as 776).",
    fullDescription:
      "Seven Seven Six (776) is an early-stage venture capital firm founded by Alexis Ohanian. The firm focuses on product-led startups across consumer, web3, sports, fintech and other sectors, runs operator programs (e.g. Operator-in-Residence), and backs companies from seed through Series A. 776 closed a $150M debut fund and later raised additional vehicles, growing its assets under management into the hundreds of millions / near $1B range. The firm also runs philanthropic and fellowship initiatives under the 776 brand.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "early-stage",
      "seed",
      "series-a",
      "operator-program",
      "web3",
      "sports",
      "founder-led",
      "diversity",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Seed to early growth stage startups (founder-led teams). Sector-agnostic emphasis with active interest in consumer, sports, web3, fintech and companies led by underrepresented founders.",
    applyLink: "https://sevensevensix.com/",
    benefits: [
      "Access to early-stage capital (seed → Series A)",
      "Operator-in-Residence program and hands-on operator support",
      "Founder/operator network and brand access",
      "Track record of investments across web3, consumer and sports",
      "Founder-focused, operator-first support and programs",
    ],
    organizer: "Seven Seven Six (776)",
  },
  {
    id: "hummingbird-vc",
    name: "Hummingbird VC",
    logoUrl: "https://cdn.fellows.best/logos/hummingbird-vc-logo.png",
    shareImageUrl:
      "https://cdn.fellows.best/banners/hummingbird-vc-banner.avif",
    description:
      "Global seed investors backing outlier founders across deep tech, AI, SaaS, fintech and healthcare.",
    fullDescription:
      "Hummingbird is a global early-stage venture capital firm (also known as Hummingbird Ventures) that partners very early with ambitious founders. The firm invests across sectors including AI, deep tech, SaaS, healthcare, gaming and marketplaces, and operates with hubs across multiple continents while maintaining in-house operations in Belgium. Hummingbird invests from seed checks (starting around $500K) and retains the ability to double or triple down later (writing follow-on capital up to tens of millions).",
    openDate: null,
    closeDate: null,
    tags: [
      "seed",
      "early-stage",
      "venture-capital",
      "deep-tech",
      "AI",
      "SaaS",
      "fintech",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "Belgium",
    eligibility:
      "Early-stage / seed founders building technology-enabled startups (sector-agnostic with particular interest in AI, deep tech, SaaS, healthcare, fintech, gaming and marketplaces).",
    applyLink: "https://www.hummingbird.vc",
    benefits: [
      "Seed-stage capital and follow-on funding (ability to scale checks substantially over time)",
      "Global operator network and hands-on support from investing & operations teams",
      "Access to Hummingbird's portfolio network and resources across multiple hubs",
      "Experienced investment team with founding partners and partners focused on founder support",
    ],
    organizer: "Hummingbird VC (Hummingbird Ventures)",
  },
  {
    id: "khosla-ventures",
    name: "Khosla Ventures",
    logoUrl: "https://cdn.fellows.best/logos/khosla-ventures-logo.jpg",
    //TODO: improve banner quality
    shareImageUrl: "https://cdn.fellows.best/logos/khosla-ventures-banner.webp",
    description:
      "Early-stage and growth venture capital firm founded by Vinod Khosla, investing in ambitious technology companies across enterprise, consumer, health, sustainability and frontier tech.",
    fullDescription:
      "Khosla Ventures is a Menlo Park–based venture capital firm founded by Vinod Khosla. The firm backs entrepreneurs across stages — from seed to growth — with a focus on enterprise software, consumer, digital health, medtech, sustainability/energy, fintech and frontier/deep technology (including AI and space-related ventures). Khosla has backed many notable startups and operates a hands-on investing approach that supports bold, technically ambitious founders.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "early-stage",
      "growth",
      "enterprise",
      "digital-health",
      "sustainability",
      "deep-tech",
      "AI",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and startups across seed through growth stages building technology-driven businesses; sector-agnostic but strong interest in enterprise software, health, sustainability and frontier tech.",
    applyLink: "https://www.khoslaventures.com/",
    benefits: [
      "Access to venture capital across seed → growth stages",
      "Hands-on partner support and technical/operator network",
      "Deep domain expertise in sustainability, healthcare, enterprise and frontier tech",
      "Track record of follow-on funding and exit support",
    ],
    organizer: "Khosla Ventures",
  },
  {
    id: "lightspeed-venture-partners",
    name: "Lightspeed Venture Partners (LSVP)",
    logoUrl: "https://cdn.fellows.best/logos/lightspeed-vc-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/lightspeed-vc-banner.png",
    description:
      "Multi-stage venture capital firm investing globally across Enterprise, Consumer, Health and Fintech.",
    fullDescription:
      "Lightspeed Venture Partners (LSVP) is a multi-stage venture capital firm founded in 2000 and headquartered in Menlo Park, California. The firm backs bold founders from Seed through late-stage (Series F and beyond), with active investing across Enterprise, Consumer, Health and Fintech sectors. Lightspeed operates globally with teams in the US, Europe, India, Israel and Southeast Asia, and has backed hundreds of companies including Affirm, Epic Games, Nutanix, Carta, and Anthropic. In recent years Lightspeed has also expanded activities into secondary-market investing alongside its primary venture practice.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "series-a",
      "series-f",
      "enterprise",
      "consumer",
      "health",
      "fintech",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and companies from Seed through growth stages seeking institutional venture capital — sector-agnostic with particular emphasis on enterprise software, consumer, health and fintech.",
    applyLink: "https://lsvp.com/launch/",
    benefits: [
      "Multi-stage capital from Seed through late rounds",
      "Global network and local teams across major startup markets",
      "Operator and advisory network (Advisory Council and Launch resources)",
      "Track record of large outcomes and follow-on support",
    ],
    organizer: "Lightspeed Venture Partners",
  },
  {
    id: "new-enterprise-associates",
    name: "New Enterprise Associates (NEA)",
    logoUrl: "https://cdn.fellows.best/logos/nea-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/nea-banner.jpg",
    description:
      "One of the world's largest multi-stage venture capital firms, investing across technology and healthcare since 1977.",
    fullDescription:
      "New Enterprise Associates (NEA) is a global, multi-stage venture capital firm founded in 1977. NEA backs companies from seed through growth and IPO, with a particular focus on technology and healthcare. The firm operates multiple offices (including Menlo Park, New York, London and Timonium/Chevy Chase), manages over $25 billion in assets, and has a long track record of supporting transformational companies across sectors and stages.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "early-stage",
      "growth",
      "late-stage",
      "technology",
      "healthcare",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Startups from seed through growth stage (pre-seed → IPO) in technology and healthcare sectors; NEA invests across stages and sectors and evaluates opportunities based on team, traction, and technical/market fit.",
    applyLink: "https://www.nea.com",
    benefits: [
      "Multi-stage capital (seed → growth → IPO) and follow-on capability",
      "Access to a large global network of investors, operators and portfolio companies",
      "Deep sector experience in technology and healthcare",
      "Long track record and significant capital reserves (enables large follow-on investments)",
      "Local presence across major startup markets (US, UK, Maryland area)",
    ],
    organizer: "New Enterprise Associates (NEA)",
  },
  {
    id: "spark-capital",
    name: "Spark Capital",
    logoUrl: "https://cdn.fellows.best/logos/spark-capital-logo.jpg",
    shareImageUrl: "https://cdn.fellows.best/banners/spark-capital-banner.png",
    description:
      "Multi-stage venture capital firm investing in products and founders across consumer, enterprise, infra, gaming, fintech and AI.",
    fullDescription:
      "Spark Capital is a multi-stage VC firm founded in 2005 with offices in San Francisco, New York and Boston. The firm invests across stages (early/seed → growth) and sectors including consumer internet, enterprise software, infrastructure, gaming, fintech, crypto and AI. Spark has led or participated in early rounds for many well-known companies and maintains separate early and growth investing teams to support founders through scale.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "growth",
      "consumer",
      "enterprise",
      "fintech",
      "gaming",
      "infrastructure",
      "AI",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders at seed through growth stages seeking institutional venture capital; Spark invests across sectors with dedicated early and growth teams.",
    applyLink: "https://www.sparkcapital.com",
    benefits: [
      "Multi-stage capital (seed → growth) and follow-on capability",
      "Dedicated early and growth teams with deep operator/investor experience",
      "Access to Spark's portfolio network and board-level support",
      "Track record of investments in notable outcomes (e.g., Slack, Discord, Oculus, Cruise, Anthropic)",
    ],
    organizer: "Spark Capital",
  },
  {
    id: "bessemer-venture-partners",
    name: "Bessemer Venture Partners (BVP)",
    logoUrl: "https://www.bvp.com/favicon.ico",
    shareImageUrl: "https://cdn.fellows.best/banners/bvp-banner.png",
    description:
      "Global multi-stage venture capital firm with a long history of backing enterprise, consumer and healthcare companies.",
    fullDescription:
      "Bessemer Venture Partners (BVP) is a global venture capital and growth firm that traces its roots to the Bessemer name in 1911. BVP invests across stages — from seed and early rounds through growth — and focuses on sectors including cloud & infrastructure, developer tools, consumer internet, fintech, healthcare and AI. The firm operates globally with multiple offices and a large portfolio (hundreds of companies) and a long track record of public outcomes and exits. BVP also runs growth-focused initiatives (e.g., BVP Forge) and publishes founder resources and playbooks for early-stage teams.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "early-stage",
      "growth",
      "cloud",
      "developer",
      "consumer",
      "healthcare",
      "ai",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and startups from seed through growth stage (pre-seed → late-stage) in technology-driven sectors; BVP invests globally with sector teams covering enterprise/cloud, consumer, healthcare and related areas.",
    applyLink: "https://www.bvp.com/",
    benefits: [
      "Multi-stage capital and follow-on capacity across seed → growth",
      "Large global portfolio and network of founders, operators and executives",
      "Dedicated growth resources (e.g., BVP Forge) and playbooks for founders",
      "Extensive track record of IPOs and public outcomes",
      "Regional presence and specialized teams across major startup markets",
    ],
    organizer: "Bessemer Venture Partners",
  },
  {
    id: "founders-fund",
    name: "Founders Fund",
    logoUrl: "https://foundersfund.com/favicon.ico",
    shareImageUrl:
      "https://cdn.healthtechalpha.com/static/resized/social_media_image/investorsById/770.png",
    description:
      "San Francisco-based venture capital firm backing companies building revolutionary technologies.",
    fullDescription:
      "Founders Fund is an American venture capital firm founded in 2005 and headquartered in San Francisco. The firm was started by PayPal alumni and angel / venture investors and invests across stages and sectors in companies that aim to transform industries. Founders Fund is known for early and sustained backing of transformational companies (SpaceX, Palantir, Stripe, Facebook, Airbnb among others) and for a partner base that includes founder-investors and operators. The firm manages multi-billion dollar capital pools and participates in large follow-on rounds for high-growth technology companies.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "early-stage",
      "growth",
      "deep-tech",
      "aerospace",
      "enterprise",
      "consumer",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and startups across seed to growth stages building technology-driven, category-defining companies; portfolio and investment activity are sector-agnostic but with notable exposure to aerospace, infrastructure, enterprise software, fintech and biotech.",
    applyLink: "https://foundersfund.com/",
    benefits: [
      "Access to multi-stage capital and the ability to lead/participate in large follow-on rounds",
      "Network and experience from founders / operator partners with a track record of major outcomes",
      "Long history of backing transformational companies and supporting scale (e.g., SpaceX, Palantir, Stripe)",
      "Hands-on partner involvement and portfolio support across technical and regulatory challenges",
    ],
    organizer: "Founders Fund",
  },
  {
    id: "battery-ventures",
    name: "Battery Ventures",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/battery-ventures.svg",
    shareImageUrl:
      "https://mms.businesswire.com/media/20200212005779/es/772923/5/Battery-AW-RGB-Core.jpg?download=1",
    description:
      "Global, technology-focused investment firm backing companies from early stage through buyouts.",
    fullDescription:
      "Battery Ventures is a global, technology-focused investment firm founded in 1983 that invests across stages — from early and growth rounds to buyouts — with sector coverage including application & infrastructure software, consumer, industrial tech and life-science tools. The firm has invested in 450+ companies over its history and is currently investing from its 14th flagship fund (Battery Ventures XIV) alongside a companion select fund; the two vehicles together were capitalized at roughly $3.8 billion as disclosed by the firm, and Battery has raised more than $13 billion since inception.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "early-stage",
      "growth",
      "buyout",
      "software",
      "infrastructure",
      "industrial-tech",
      "life-science-tools",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and companies across early, growth and buyout stages building technology-enabled businesses in software, consumer, industrial tech and life-science tools; Battery evaluates opportunities across stages and geographies.",
    applyLink: "https://www.battery.com/contact/",
    benefits: [
      "Multi-stage capital across early → growth → buyout",
      "Global investment team with offices across the U.S., Europe and Israel",
      "Dedicated portfolio services (business development, talent, marketing, growth leadership)",
      "Long track record (450+ investments) and deep sector experience",
      "Ability to lead follow-on and later-stage financings from the same firm",
    ],
    organizer: "Battery Ventures",
  },
  {
    id: "odf",
    name: "ODF",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNH4CZWbd7o1Dxje24daV1nQ8o2CcE8GP6g&s",
    shareImageUrl: "https://cdn.fellows.best/banners/odf-banner.png",
    description:
      "A one-week, in-person founder onboarding experience and year-round community that helps people start and scale venture-backable companies.",
    fullDescription:
      "ODF is an intense, one-week in-person onboarding sprint (hosted in San Francisco) plus a lifetime community of founders and builders. The program focuses on idea exploration, co-founder and team formation, early product/customer work, and fundraising preparation. ODF is non-dilutive and runs a pay-what-you-can model (suggested contribution) while providing >$800k in perks (AWS, Stripe Atlas, Mercury, Carta, etc.), workshops, and ongoing community support. ODF alumni have collectively raised over $2B and include companies such as Levels, Cal.com, Finch, and Loyal.",
    openDate: null,
    closeDate: null,
    tags: [
      "accelerator",
      "founder-program",
      "onboarding-week",
      "in-person",
      "san-francisco",
      "non-dilutive",
      "early-stage",
      "pre-seed",
      "community",
      "co-founder-matching",
    ],
    category: "fellowship",
    region: "Global (primarily US-focused)",
    country: "United States",
    eligibility:
      "Founders (or soon-to-be founders) with a track record of shipping work who are 100% committed (or soon committing) to starting a company. Not a fit if you’ve already raised beyond pre-seed / reached product-market fit, are building a non-venture-scale business, have a primary customer base outside the US, or already have a full team.",
    applyLink: "https://forms.joinodf.com/",
    benefits: [
      "One-week onboarding sprint in San Francisco with 80–100 high-momentum founders",
      "Lifetime access to a 3,000+ member community and ongoing events",
      ">$800k in partner perks (AWS, Stripe Atlas, Mercury, Carta, etc.)",
      "Non-dilutive, pay-what-you-can model (suggested contribution covers venue & food)",
      "Workshops, how-tos (fundraising, product, hiring), and active alumni network",
    ],
    organizer: "ODF (nZero Labs, Inc.)",
  },
  {
    id: "general-catalyst",
    name: "General Catalyst",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDtB71dB4rW3erjCV6W7C7Atjq3A2_XIUrw&s",
    shareImageUrl:
      "https://i.cdn.newsbytesapp.com/images/l97220240620121144.jpeg",
    description:
      "Global investment and transformation firm partnering with founders from seed through growth to build resilient, AI-enabled companies.",
    fullDescription:
      "General Catalyst is a global investment and transformation company founded in 2000 that backs entrepreneurs across stages—from seed and early-stage to growth and later-stage—focusing on applied AI, health, fintech, industrials, climate & energy, and defense & intelligence. The firm combines capital with operational support and industry-specific expertise, and has expanded its global presence with offices across the U.S. and Europe.",
    openDate: null,
    closeDate: null,
    tags: [
      "venture-capital",
      "multi-stage",
      "seed",
      "early-stage",
      "growth",
      "late-stage",
      "applied-ai",
      "health",
      "fintech",
      "industrial-tech",
      "climate",
      "defense",
      "global",
    ],
    category: "grant",
    region: "Global",
    country: "United States",
    eligibility:
      "Founders and companies building transformative, technology-enabled businesses at seed through growth stages in areas such as applied AI, healthcare, fintech, industrials, climate & energy, defense & intelligence; General Catalyst evaluates companies across geographies and stages.",
    applyLink: "https://www.generalcatalyst.com/contact",
    benefits: [
      "Multi-stage capital from seed through growth and later-stage financings",
      "Large, global investment platform with specialist teams (AI, Health, Fintech, Industrials, Climate, Defense)",
      "Dedicated portfolio support and transformation resources",
      "Deep domain expertise and track record of supporting category-defining companies",
      "Global offices and the ability to support cross-border growth",
    ],
    organizer: "General Catalyst",
  },
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return fellowshipOpportunities.find((opp) => opp.id === id);
}

export function getActiveOpportunities(): Opportunity[] {
  return fellowshipOpportunities.filter(
    (opportunity) => opportunity.closeDate !== "closed"
  );
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

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: {
    categories: string[];
    regions: string[];
    tags: string[];
    fundingAmount?: { min: number; max: number };
    equityPercentage?: { min: number; max: number };
  }
): Opportunity[] {
  return opportunities.filter((opp) => {
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(opp.category);

    const regionMatch =
      filters.regions.length === 0 || filters.regions.includes(opp.region);

    const tagMatch =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => opp.tags.includes(tag));

    const isDefaultFundingRange =
      !filters.fundingAmount ||
      (filters.fundingAmount.min === 0 &&
        filters.fundingAmount.max === 2000000);

    const fundingMatch =
      isDefaultFundingRange ||
      (opp.funding &&
        filters.fundingAmount &&
        opp.funding.amount >= filters.fundingAmount.min &&
        opp.funding.amount <= filters.fundingAmount.max);

    const isDefaultEquityRange =
      !filters.equityPercentage ||
      (filters.equityPercentage.min === 0 &&
        filters.equityPercentage.max === 20);

    const equityMatch =
      isDefaultEquityRange ||
      (opp.funding &&
        filters.equityPercentage &&
        opp.funding.equityPercentage >= filters.equityPercentage.min &&
        opp.funding.equityPercentage <= filters.equityPercentage.max);

    return (
      categoryMatch && regionMatch && tagMatch && fundingMatch && equityMatch
    );
  });
}
