import type { GuideConfig } from "./guide-generator";
import type { Opportunity } from "./data";

const CATEGORY_NAMES: Record<string, string> = {
  accelerator: "Accelerator",
  fellowship: "Fellowship",
  incubator: "Incubator",
  venture_capital: "Venture Capital",
  grant: "Grant",
  residency: "Residency",
  competition: "Competition",
  research: "Research",
  developer_program: "Developer Program",
};

const CATEGORY_DESCRIPTIONS: Record<string, string[]> = {
  fellowship: [
    "Fellowships provide structured programs for professional development, mentorship, and networking opportunities in the tech industry.",
    "Tech fellowships offer immersive experiences combining hands-on work, mentorship from industry leaders, and access to exclusive networks.",
    "Fellowship programs are designed to accelerate your career through structured learning, real-world projects, and connections with top tech companies.",
  ],
  accelerator: [
    "Accelerators offer intensive programs designed to help startups grow rapidly through mentorship, funding, and access to networks.",
    "Startup accelerators provide structured programs that combine seed funding, mentorship, and workspace to help early-stage companies scale quickly.",
    "Accelerator programs offer entrepreneurs access to experienced mentors, investor networks, and resources needed to take their startups to the next level.",
  ],
  incubator: [
    "Incubators provide early-stage startups with resources, workspace, and support to develop their business ideas.",
    "Startup incubators offer a nurturing environment with office space, mentorship, and resources to help entrepreneurs turn ideas into viable businesses.",
    "Incubator programs focus on providing foundational support, including workspace, mentorship, and access to early-stage resources for new startups.",
  ],
  grant: [
    "Grants offer non-dilutive funding for projects, research, and initiatives without requiring equity in return.",
    "Tech grants provide funding that doesn't require giving up equity, making them ideal for research projects, open-source initiatives, and early-stage development.",
    "Grant programs offer financial support for innovative tech projects, research initiatives, and community-driven programs without equity requirements.",
  ],
  venture_capital: [
    "Venture capital programs provide funding and strategic support for high-growth potential startups.",
    "VC programs offer substantial funding rounds along with strategic guidance, industry connections, and resources to help startups scale rapidly.",
    "Venture capital opportunities provide significant investment capital and strategic partnerships for startups ready to accelerate their growth.",
  ],
  residency: [
    "Residencies offer dedicated time and space for creators, developers, and entrepreneurs to focus on their projects.",
    "Tech residencies provide immersive environments where creators can work on projects with access to resources, mentorship, and collaborative spaces.",
    "Residency programs offer structured time away from daily routines, allowing developers and entrepreneurs to focus deeply on innovative projects.",
  ],
  competition: [
    "Competitions provide opportunities to showcase skills, win prizes, and gain recognition in the tech community.",
    "Tech competitions offer platforms to demonstrate your skills, compete for prizes, and gain visibility among industry leaders and potential employers.",
    "Competition programs challenge participants to solve real-world problems while offering prizes, recognition, and opportunities to connect with tech leaders.",
  ],
  research: [
    "Research programs support academic and industry research initiatives with funding and resources.",
    "Tech research programs provide funding, resources, and collaboration opportunities for groundbreaking research in technology and innovation.",
    "Research opportunities offer financial support and access to cutting-edge resources for academic and industry research projects.",
  ],
  developer_program: [
    "Developer programs offer tools, resources, and support for software developers building innovative solutions.",
    "Developer programs provide access to APIs, tools, technical support, and resources to help developers build and scale their applications.",
    "These programs offer developers early access to platforms, technical documentation, community support, and resources to accelerate development.",
  ],
};

const TAG_DESCRIPTIONS: Record<string, string[]> = {
  remote: [
    "Remote opportunities allow you to work from anywhere, providing flexibility and access to global programs regardless of your location.",
    "Location-independent programs enable you to participate from anywhere in the world, breaking down geographical barriers to tech opportunities.",
    "Remote-friendly programs offer the flexibility to work from home or travel while participating, perfect for digital nomads and distributed teams.",
  ],
  "equity-free": [
    "Equity-free programs provide funding and support without requiring you to give up ownership in your company or project.",
    "Non-dilutive opportunities offer financial support and resources while allowing you to maintain full control and ownership of your work.",
    "Equity-free funding means you keep 100% ownership of your startup or project while receiving financial support and resources.",
  ],
  students: [
    "Student-focused programs are designed specifically for those currently enrolled in academic programs, offering flexible schedules and academic credit opportunities.",
    "Programs tailored for students provide opportunities that work around academic schedules and offer valuable experience alongside studies.",
    "Student-friendly opportunities are structured to complement your education, offering real-world experience without disrupting your academic progress.",
  ],
  student: [
    "Student programs offer opportunities designed for those in academic settings, with flexible requirements and schedules that accommodate coursework.",
    "These programs understand the constraints of student life and provide opportunities that enhance your education while building practical skills.",
    "Student-focused opportunities bridge the gap between academic learning and real-world application, perfect for building your portfolio while studying.",
  ],
  "pre-seed": [
    "Pre-seed opportunities are designed for the earliest stage startups, providing initial funding and support to validate ideas and build MVPs.",
    "Pre-seed programs focus on helping entrepreneurs turn concepts into viable products, offering funding, mentorship, and resources for idea validation.",
    "Early-stage pre-seed opportunities provide the foundational support needed to transform ideas into testable products and validate market fit.",
  ],
  "early-stage": [
    "Early-stage programs support startups in their initial phases, providing resources to develop products, validate markets, and build founding teams.",
    "Programs for early-stage startups offer the foundational support needed to move from concept to product-market fit.",
    "Early-stage opportunities focus on helping entrepreneurs navigate the critical first steps of building a startup, from ideation to initial traction.",
  ],
  mentorship: [
    "Mentorship-focused programs connect you with experienced industry leaders who provide guidance, advice, and support throughout your journey.",
    "Programs emphasizing mentorship offer one-on-one access to successful entrepreneurs and industry experts who can accelerate your learning curve.",
    "Mentorship opportunities provide structured guidance from experienced professionals, helping you avoid common pitfalls and accelerate your progress.",
  ],
  funding: [
    "Funding-focused programs prioritize providing capital to help you build, scale, and grow your project or startup.",
    "These opportunities emphasize financial support, offering grants, investments, or stipends to help you focus on building without financial stress.",
    "Funding programs provide the capital resources needed to turn your ideas into reality, covering expenses from development to scaling.",
  ],
  networking: [
    "Networking-focused programs prioritize connecting you with industry leaders, potential partners, investors, and like-minded entrepreneurs.",
    "These opportunities emphasize building relationships within the tech ecosystem, providing access to exclusive events and communities.",
    "Networking programs offer structured opportunities to meet industry leaders, potential collaborators, and build relationships that can accelerate your career.",
  ],
  research: [
    "Research-focused opportunities support academic and industry research initiatives, providing funding and resources for innovative investigations.",
    "These programs emphasize scientific inquiry and innovation, offering support for research projects that advance technology and knowledge.",
    "Research opportunities provide the resources and funding needed to conduct groundbreaking research in technology, science, and innovation.",
  ],
  academic: [
    "Academic programs are designed for researchers, students, and academics, offering opportunities that complement scholarly work and research.",
    "These opportunities support academic pursuits, providing funding and resources for research, publication, and scholarly activities.",
    "Academic-focused programs understand the needs of researchers and scholars, offering support that enhances academic work and research outcomes.",
  ],
};

const REGION_DESCRIPTIONS: Record<string, string[]> = {
  "North America": [
    "North American programs offer access to one of the world's largest tech ecosystems, with opportunities in Silicon Valley, New York, and emerging tech hubs.",
    "Programs in North America provide access to leading tech companies, investors, and innovation centers across the United States and Canada.",
    "North American opportunities connect you with the vibrant tech scene spanning major cities from San Francisco to Toronto, offering diverse ecosystems.",
  ],
  "South America": [
    "South American programs tap into rapidly growing tech ecosystems in Brazil, Argentina, and Chile, offering unique opportunities in emerging markets.",
    "These programs provide access to Latin America's expanding tech scene, with growing startup ecosystems and increasing investment in innovation.",
    "South American opportunities offer entry into dynamic tech markets with growing startup scenes and increasing venture capital investment.",
  ],
  Europe: [
    "European programs offer access to diverse tech ecosystems across the continent, from London's fintech scene to Berlin's startup culture.",
    "Programs in Europe provide opportunities across multiple countries, each with unique tech strengths and growing startup ecosystems.",
    "European opportunities connect you with tech hubs across the continent, offering diverse cultures, languages, and innovation approaches.",
  ],
  Asia: [
    "Asian programs provide access to some of the world's fastest-growing tech markets, from Singapore's innovation hub to India's startup ecosystem.",
    "These programs offer opportunities in Asia's dynamic tech scene, spanning from Japan's deep tech focus to Southeast Asia's rapid growth.",
    "Asian opportunities connect you with diverse tech ecosystems, from established innovation centers to rapidly emerging startup markets.",
  ],
  "Middle East": [
    "Middle Eastern programs offer access to rapidly developing tech ecosystems, with significant investment in innovation and entrepreneurship.",
    "These programs provide opportunities in emerging tech hubs like Dubai, Tel Aviv, and Riyadh, where innovation is heavily supported.",
    "Middle Eastern opportunities connect you with tech ecosystems experiencing rapid growth and substantial investment in technology and startups.",
  ],
  Africa: [
    "African programs tap into the continent's growing tech scene, with emerging hubs in Lagos, Nairobi, and Cape Town driving innovation.",
    "These programs offer opportunities in Africa's expanding tech ecosystem, where mobile-first solutions and fintech are transforming markets.",
    "African opportunities provide access to rapidly growing tech markets with unique challenges and opportunities for innovative solutions.",
  ],
  Oceania: [
    "Oceania programs offer access to tech ecosystems in Australia and New Zealand, known for strong innovation cultures and quality of life.",
    "These programs provide opportunities in well-developed tech markets with strong support for entrepreneurship and innovation.",
    "Oceanian opportunities connect you with tech scenes known for innovation, quality of life, and growing startup ecosystems.",
  ],
  Global: [
    "Global programs offer opportunities that transcend geographical boundaries, allowing participation from anywhere in the world.",
    "These programs provide access to international networks and resources, regardless of your physical location.",
    "Global opportunities break down geographical barriers, offering worldwide access to tech programs and resources.",
  ],
};

const FUNDING_DESCRIPTIONS: Record<string, string[]> = {
  "under-25k": [
    "Programs with funding under $25,000 are perfect for early-stage projects, MVPs, and proof-of-concept development.",
    "Smaller funding amounts provide essential capital for validating ideas, building prototypes, and covering initial operational costs.",
    "These funding levels are ideal for bootstrapped founders and early-stage projects that need capital to get started without significant dilution.",
  ],
  "under-50k": [
    "Funding under $50,000 supports early-stage development, allowing you to build MVPs, validate markets, and reach initial milestones.",
    "These amounts provide substantial support for early-stage startups to develop products, conduct market research, and begin customer acquisition.",
    "Mid-range funding levels offer enough capital to make meaningful progress while keeping equity requirements reasonable.",
  ],
  "under-100k": [
    "Programs offering up to $100,000 provide significant capital for product development, team building, and initial market entry.",
    "These funding levels support substantial development work, allowing startups to build full products and begin scaling operations.",
    "Higher funding amounts enable more comprehensive product development and provide runway for reaching key business milestones.",
  ],
  "over-100k": [
    "High-value funding opportunities provide substantial capital for scaling operations, expanding teams, and accelerating growth.",
    "These programs offer significant investment for startups ready to scale, providing resources for marketing, hiring, and market expansion.",
    "Large funding amounts support rapid growth, enabling startups to invest in infrastructure, talent, and aggressive market expansion.",
  ],
};

const BENEFIT_TEMPLATES: Record<string, string[]> = {
  funding: [
    "Access to non-dilutive funding that doesn't require giving up equity in your company",
    "Financial support to cover development costs, team expenses, and operational needs",
    "Capital resources to accelerate product development and market entry",
  ],
  mentorship: [
    "One-on-one mentorship from successful entrepreneurs and industry experts",
    "Access to experienced advisors who can guide you through critical decisions",
    "Structured mentorship programs designed to accelerate your learning and growth",
  ],
  networking: [
    "Exclusive access to industry events, conferences, and networking opportunities",
    "Connections with potential investors, partners, and customers in your industry",
    "Access to alumni networks and communities of successful entrepreneurs",
  ],
  remote: [
    "Flexibility to work from anywhere, eliminating geographical constraints",
    "Access to global opportunities regardless of your physical location",
    "Work-life balance through location-independent program participation",
  ],
  students: [
    "Programs designed to fit around your academic schedule and commitments",
    "Opportunities to gain real-world experience while completing your studies",
    "Academic credit options and flexible participation requirements",
  ],
};

const TIP_TEMPLATES: Record<string, string[]> = {
  general: [
    "Start preparing your application materials well in advance of deadlines to ensure quality submissions",
    "Research each program thoroughly to understand their specific requirements and what they're looking for",
    "Reach out to program alumni or current participants to gain insights into the application process",
    "Tailor your application to highlight how your project aligns with the program's goals and values",
    "Keep track of application deadlines using a calendar system to avoid missing opportunities",
  ],
  funding: [
    "Understand the difference between equity-based and equity-free funding to make informed decisions",
    "Consider how much funding you actually need versus what's available to avoid over-dilution",
    "Review the terms carefully, including any equity requirements, repayment terms, or program obligations",
    "Calculate the true cost of funding, including equity given up, time commitments, and program requirements",
  ],
  accelerator: [
    "Research the accelerator's track record, including success stories and portfolio companies",
    "Understand the time commitment required, as most accelerators are intensive full-time programs",
    "Prepare to move quickly, as accelerators often require rapid iteration and decision-making",
    "Consider the equity percentage requested and whether the program's value justifies the cost",
  ],
  remote: [
    "Verify timezone requirements and whether the program accommodates your location",
    "Ensure you have reliable internet and a suitable workspace for remote participation",
    "Understand any travel requirements, as some remote programs still include in-person events",
  ],
};

// Special content for popular tag combinations
const TAG_COMBINATION_CONTENT: Record<string, {
  overview: string[];
  whatYoullFind: string[];
  benefits: string[];
  tips: string[];
}> = {
  "remote+equity-free": {
    overview: [
      "Discover remote equity-free opportunities that let you build from anywhere while maintaining full ownership.",
      "Find location-independent programs offering non-dilutive funding, perfect for global entrepreneurs.",
      "Explore remote-friendly opportunities with equity-free funding, combining flexibility with financial independence.",
    ],
    whatYoullFind: [
      "Remote-first programs that eliminate geographical barriers to participation",
      "Equity-free funding opportunities that preserve your full ownership stake",
      "Global access to programs regardless of your physical location",
      "Non-dilutive capital that doesn't require giving up company equity",
      "Flexible participation models designed for distributed teams and remote work",
    ],
    benefits: [
      "Work from anywhere while accessing world-class programs and resources",
      "Maintain 100% ownership of your company or project",
      "Access global opportunities without relocation requirements",
      "Combine location flexibility with non-dilutive funding",
      "Build your startup on your own terms, from anywhere in the world",
    ],
    tips: [
      "Verify timezone compatibility for remote programs, especially for mentorship sessions",
      "Ensure stable internet connectivity for virtual meetings and program activities",
      "Consider the value of equity-free funding versus equity-based programs",
      "Look for programs that offer both remote flexibility and substantial funding",
      "Prepare a strong remote work setup to maximize your program participation",
    ],
  },
  "students+remote": {
    overview: [
      "Find student-friendly remote opportunities that fit around your academic schedule.",
      "Discover programs designed for students that offer location flexibility and academic compatibility.",
      "Explore remote opportunities tailored for students, combining education with real-world experience.",
    ],
    whatYoullFind: [
      "Programs designed to work around academic schedules and commitments",
      "Remote participation options that eliminate commute time and location constraints",
      "Opportunities that complement your studies without disrupting coursework",
      "Flexible time commitments that accommodate exam periods and academic deadlines",
      "Student-focused programs with understanding of academic priorities",
    ],
    benefits: [
      "Participate from your dorm, home, or anywhere you study",
      "Balance program participation with academic responsibilities",
      "Gain real-world experience without leaving your academic environment",
      "Access global opportunities without travel or relocation",
      "Build your portfolio while maintaining your student status",
    ],
    tips: [
      "Check if programs offer academic credit or can be integrated into your coursework",
      "Verify time commitments to ensure they fit around your class schedule",
      "Look for programs with flexible deadlines that accommodate exam periods",
      "Consider programs that offer mentorship relevant to your field of study",
      "Ensure you have a quiet workspace for remote participation and meetings",
    ],
  },
  "pre-seed+early-stage": {
    overview: [
      "Discover pre-seed and early-stage opportunities designed for the earliest phases of startup development.",
      "Find programs focused on idea validation, MVP development, and initial market testing.",
      "Explore opportunities for founders at the concept stage, from ideation to first customers.",
    ],
    whatYoullFind: [
      "Programs specifically designed for idea validation and concept testing",
      "Funding amounts appropriate for MVP development and initial market research",
      "Mentorship focused on early-stage challenges like product-market fit",
      "Resources for building minimum viable products and testing assumptions",
      "Support for founders before they have significant traction or revenue",
    ],
    benefits: [
      "Access to funding when you need it most - at the very beginning",
      "Mentorship from founders who've navigated the earliest startup stages",
      "Resources to validate your idea before investing significant time and money",
      "Networking with other early-stage founders facing similar challenges",
      "Support for turning concepts into testable products",
    ],
    tips: [
      "Have a clear problem statement and initial solution hypothesis ready",
      "Prepare to demonstrate market research and understanding of your target customers",
      "Be ready to pivot quickly based on feedback and validation results",
      "Focus on programs that offer both funding and structured mentorship",
      "Consider equity-free options to preserve ownership at this critical stage",
    ],
  },
  "mentorship+networking": {
    overview: [
      "Find opportunities that combine expert mentorship with powerful networking connections.",
      "Discover programs offering both one-on-one guidance and access to industry networks.",
      "Explore opportunities that provide mentorship and networking to accelerate your growth.",
    ],
    whatYoullFind: [
      "Structured mentorship programs with experienced entrepreneurs and industry experts",
      "Access to exclusive networking events, conferences, and industry gatherings",
      "Connections with potential investors, partners, and customers",
      "Alumni networks of successful program graduates",
      "Both individual guidance and community support",
    ],
    benefits: [
      "One-on-one mentorship from successful entrepreneurs in your industry",
      "Access to exclusive events and networking opportunities",
      "Connections with investors, partners, and potential customers",
      "Alumni networks that provide ongoing support and opportunities",
      "Combined guidance and networking to accelerate your learning and growth",
    ],
    tips: [
      "Come prepared with specific questions and challenges for your mentor",
      "Actively participate in networking events and community activities",
      "Follow up with connections made during program events",
      "Leverage alumni networks for introductions and advice",
      "Be proactive in seeking mentorship and making the most of networking opportunities",
    ],
  },
  "equity-free+funding": {
    overview: [
      "Discover equity-free funding opportunities that provide capital without requiring ownership.",
      "Find non-dilutive funding programs that let you maintain full control of your company.",
      "Explore funding opportunities that don't require giving up equity in your startup.",
    ],
    whatYoullFind: [
      "Non-dilutive funding that preserves your ownership percentage",
      "Grant programs and equity-free investments",
      "Funding amounts ranging from small grants to substantial investments",
      "Programs that provide capital without equity requirements",
      "Financial support that doesn't dilute your founder's stake",
    ],
    benefits: [
      "Maintain 100% ownership of your company or project",
      "Access capital without giving up equity or control",
      "Retain full decision-making power over your startup",
      "Keep more value for yourself and future investors",
      "Combine funding with other program benefits like mentorship",
    ],
    tips: [
      "Understand the difference between grants, equity-free investments, and equity-based funding",
      "Review all terms carefully, including any repayment obligations or program requirements",
      "Consider the total value of equity-free funding versus equity-based alternatives",
      "Look for programs that combine funding with mentorship and resources",
      "Calculate the true cost of equity-based alternatives to appreciate equity-free value",
    ],
  },
  "early-stage+equity-free": {
    overview: [
      "Find early-stage equity-free opportunities perfect for startups in their initial phases.",
      "Discover non-dilutive funding and support for early-stage companies preserving ownership.",
      "Explore equity-free programs designed for startups at the earliest stages of development.",
    ],
    whatYoullFind: [
      "Funding specifically designed for early-stage startups and MVPs",
      "Equity-free capital that preserves ownership during critical early phases",
      "Support for product development and initial market validation",
      "Resources for building founding teams and validating business models",
      "Non-dilutive funding that keeps more value for founders",
    ],
    benefits: [
      "Access capital at the earliest stage without giving up equity",
      "Preserve ownership percentage for future funding rounds",
      "Maintain control over strategic decisions and company direction",
      "Combine early-stage support with equity-free funding",
      "Keep more value for yourself and co-founders",
    ],
    tips: [
      "Focus on programs that offer both funding and early-stage mentorship",
      "Consider equity-free options to maximize ownership retention",
      "Prepare to demonstrate your idea's potential even without significant traction",
      "Look for programs that understand early-stage challenges and timelines",
      "Balance funding needs with maintaining founder equity",
    ],
  },
  "remote+students": {
    overview: [
      "Discover remote opportunities designed specifically for students, offering flexibility and academic compatibility.",
      "Find student-friendly programs that eliminate location barriers and work around academic schedules.",
      "Explore remote programs tailored for students, combining education with practical experience.",
    ],
    whatYoullFind: [
      "Remote participation options that fit around your class schedule",
      "Programs designed with student academic commitments in mind",
      "Flexible time requirements that accommodate exam periods",
      "Location-independent opportunities accessible from anywhere",
      "Student-focused support and understanding of academic priorities",
    ],
    benefits: [
      "Participate from anywhere without travel or relocation",
      "Balance program participation with academic responsibilities",
      "Gain real-world experience alongside your studies",
      "Access global opportunities regardless of your location",
      "Build your portfolio while maintaining student status",
    ],
    tips: [
      "Verify program schedules don't conflict with your class times",
      "Look for programs offering academic credit or course integration",
      "Ensure you have reliable internet and a quiet workspace",
      "Check if programs accommodate exam periods and academic deadlines",
      "Consider time commitments to ensure they fit your academic workload",
    ],
  },
};

function formatFundingRange(fundingAmount?: { min: number; max: number }): string {
  if (!fundingAmount) return "";
  
  const { min, max } = fundingAmount;
  
  if (max === Infinity || max >= 2000000) {
    return min === 0 ? "any funding amount" : `funding of $${min.toLocaleString()} or more`;
  }
  
  if (min === 0) {
    return `funding under $${max.toLocaleString()}`;
  }
  
  return `funding between $${min.toLocaleString()} and $${max.toLocaleString()}`;
}

function getFundingRangeKey(fundingAmount?: { min: number; max: number }): string {
  if (!fundingAmount) return "";
  
  const { min, max } = fundingAmount;
  
  if (max <= 25000) return "under-25k";
  if (max <= 50000) return "under-50k";
  if (max <= 100000) return "under-100k";
  if (min >= 100000) return "over-100k";
  return "";
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface GuideContent {
  overview: string;
  whatYoullFind: string[];
  benefits: string[];
  tips: string[];
}

// Helper function to detect tag combinations
function detectTagCombination(tags: string[]): string | null {
  if (!tags || tags.length < 2) return null;
  
  const normalizedTags = tags.map(t => t.toLowerCase().trim()).sort();
  const tagSet = new Set(normalizedTags);
  
  // Check for specific combinations (order-independent)
  const combinations = [
    { tags: ["remote", "equity-free"], key: "remote+equity-free" },
    { tags: ["students", "remote"], key: "students+remote" },
    { tags: ["student", "remote"], key: "students+remote" },
    { tags: ["pre-seed", "early-stage"], key: "pre-seed+early-stage" },
    { tags: ["mentorship", "networking"], key: "mentorship+networking" },
    { tags: ["equity-free", "funding"], key: "equity-free+funding" },
    { tags: ["early-stage", "equity-free"], key: "early-stage+equity-free" },
    { tags: ["remote", "students"], key: "remote+students" },
    { tags: ["remote", "student"], key: "remote+students" },
  ];
  
  for (const combo of combinations) {
    if (combo.tags.every(tag => tagSet.has(tag))) {
      return combo.key;
    }
  }
  
  return null;
}

export function generateGuideContent(
  config: GuideConfig,
  opportunities: Opportunity[]
): GuideContent {
  const { filters } = config;
  const categoryNames = filters.categories?.map(c => CATEGORY_NAMES[c] || c) || [];
  const hasFunding = !!filters.fundingAmount;
  const hasRegion = !!filters.regions?.length;
  const hasTags = !!filters.tags?.length;
  const tags = filters.tags || [];
  
  // Check for tag combinations
  const tagCombination = hasTags ? detectTagCombination(tags) : null;
  const combinationContent = tagCombination ? TAG_COMBINATION_CONTENT[tagCombination] : null;

  // Generate overview - prioritize tag combination content
  let overview = "";
  if (combinationContent && combinationContent.overview.length > 0) {
    overview = getRandomItem(combinationContent.overview);
  } else if (categoryNames.length > 0) {
    const categoryText = categoryNames.length === 1 
      ? categoryNames[0].toLowerCase()
      : categoryNames.join(" and ").toLowerCase();
    
    // Enhanced templates with tag combinations
    if (hasTags && tags.length >= 2) {
      const tagDisplay = tags.map(t => 
        t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " ")
      ).join(" and ");
      const baseTemplates = [
        `Discover ${categoryText} opportunities for ${tagDisplay.toLowerCase()}`,
        `Find ${categoryText} programs combining ${tagDisplay.toLowerCase()}`,
        `Explore ${categoryText} opportunities with ${tagDisplay.toLowerCase()}`,
      ];
      overview = getRandomItem(baseTemplates);
    } else {
      const baseTemplates = [
        `Discover the best ${categoryText} opportunities`,
        `Find top ${categoryText} programs`,
        `Explore curated ${categoryText} opportunities`,
      ];
      overview = getRandomItem(baseTemplates);
      
      // Add one additional detail, prioritizing the most specific filter
      if (hasTags && tags.length > 0) {
        const primaryTag = tags[0];
        const tagDisplay = primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1).replace(/-/g, " ");
        overview += ` for ${tagDisplay.toLowerCase()}`;
      } else if (hasRegion) {
        overview += ` in ${filters.regions![0]}`;
      } else if (hasFunding) {
        const fundingKey = getFundingRangeKey(filters.fundingAmount);
        if (fundingKey === "under-25k") {
          overview += ` with funding under $25k`;
        } else if (fundingKey === "under-100k") {
          overview += ` with funding under $100k`;
        } else if (fundingKey === "over-100k") {
          overview += ` with funding over $100k`;
        }
      }
    }
    
    overview += ".";
  } else {
    // No category, check for tag combinations
    if (hasTags && tags.length >= 2) {
      const tagDisplay = tags.map(t => 
        t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " ")
      ).join(" and ");
      const baseTemplates = [
        `Discover opportunities combining ${tagDisplay.toLowerCase()}`,
        `Find programs for ${tagDisplay.toLowerCase()}`,
        `Explore ${tagDisplay.toLowerCase()} opportunities`,
      ];
      overview = getRandomItem(baseTemplates);
    } else {
      const baseTemplates = [
        "Explore curated tech opportunities",
        "Discover handpicked technology programs",
        "Find the best tech opportunities",
      ];
      overview = getRandomItem(baseTemplates);
      
      // Add one detail only
      if (hasTags && tags.length > 0) {
        const primaryTag = tags[0];
        const tagDisplay = primaryTag.charAt(0).toUpperCase() + primaryTag.slice(1).replace(/-/g, " ");
        overview += ` for ${tagDisplay.toLowerCase()}`;
      } else if (hasRegion) {
        overview += ` in ${filters.regions![0]}`;
      } else if (hasFunding) {
        const fundingKey = getFundingRangeKey(filters.fundingAmount);
        if (fundingKey === "under-25k") {
          overview += ` with funding under $25k`;
        } else if (fundingKey === "under-100k") {
          overview += ` with funding under $100k`;
        } else if (fundingKey === "over-100k") {
          overview += ` with funding over $100k`;
        }
      }
    }
    
    overview += ".";
  }

  // Calculate average funding and duration from actual opportunities
  const fundingAmounts: number[] = [];
  const durations: { value: number; unit: string }[] = [];
  
  opportunities.forEach(opp => {
    if (opp.funding?.amount) {
      fundingAmounts.push(opp.funding.amount);
    }
    if (opp.duration) {
      // Convert all durations to weeks for comparison
      let weeks = opp.duration.value;
      if (opp.duration.unit === "months") {
        weeks = opp.duration.value * 4.33;
      } else if (opp.duration.unit === "years") {
        weeks = opp.duration.value * 52;
      }
      durations.push({ value: weeks, unit: "weeks" });
    }
  });
  
  const avgFunding = fundingAmounts.length > 0
    ? fundingAmounts.reduce((a, b) => a + b, 0) / fundingAmounts.length
    : null;
  
  const avgDurationWeeks = durations.length > 0
    ? durations.reduce((a, b) => a + b.value, 0) / durations.length
    : null;
  
  // Format average duration
  function formatAverageDuration(weeks: number): string {
    if (weeks < 4) {
      return `${Math.round(weeks)} weeks`;
    } else if (weeks < 52) {
      const months = Math.round(weeks / 4.33);
      return `${months} ${months === 1 ? "month" : "months"}`;
    } else {
      const years = Math.round(weeks / 52);
      return `${years} ${years === 1 ? "year" : "years"}`;
    }
  }

  // Generate "What You'll Find" section with varied content
  const whatYoullFind: string[] = [];
  
  // Use tag combination content if available
  if (combinationContent && combinationContent.whatYoullFind.length > 0) {
    // Use combination content, but limit to 3-4 items and supplement with other info
    const comboItems = combinationContent.whatYoullFind.slice(0, 3);
    whatYoullFind.push(...comboItems);
  }
  
  if (categoryNames.length > 0) {
    categoryNames.forEach(category => {
      const key = category.toLowerCase().replace(/\s+/g, "_");
      const descriptions = CATEGORY_DESCRIPTIONS[key];
      if (descriptions && descriptions.length > 0) {
        const description = getRandomItem(descriptions);
        // Only add if not already covered by combination content
        if (!whatYoullFind.some(item => item.toLowerCase().includes(category.toLowerCase()))) {
          whatYoullFind.push(`${category}: ${description}`);
        }
      }
    });
  }
  
  // Add average funding if available
  if (avgFunding && avgFunding > 0) {
    const formattedFunding = avgFunding >= 1000
      ? `$${Math.round(avgFunding / 1000)}k`
      : `$${Math.round(avgFunding)}`;
    whatYoullFind.push(`Average funding: ${formattedFunding} per opportunity`);
  } else if (hasFunding && !combinationContent) {
    const fundingKey = getFundingRangeKey(filters.fundingAmount);
    if (fundingKey && FUNDING_DESCRIPTIONS[fundingKey]) {
      whatYoullFind.push(`Funding: ${getRandomItem(FUNDING_DESCRIPTIONS[fundingKey])}`);
    } else {
      whatYoullFind.push(`Funding opportunities: ${formatFundingRange(filters.fundingAmount)}`);
    }
  }
  
  // Add average duration if available
  if (avgDurationWeeks && avgDurationWeeks > 0) {
    whatYoullFind.push(`Average duration: ${formatAverageDuration(avgDurationWeeks)}`);
  }
  
  if (hasRegion && !combinationContent) {
    filters.regions!.forEach(region => {
      if (REGION_DESCRIPTIONS[region]) {
        whatYoullFind.push(`${region}: ${getRandomItem(REGION_DESCRIPTIONS[region])}`);
      } else {
        whatYoullFind.push(`Regional focus: Programs available in ${region}`);
      }
    });
  }
  
  // Enhanced tag descriptions for combinations
  if (hasTags) {
    if (tags.length >= 2 && !combinationContent) {
      // Multiple tags - create combination-aware descriptions
      tags.forEach(tag => {
        if (TAG_DESCRIPTIONS[tag]) {
          const description = getRandomItem(TAG_DESCRIPTIONS[tag]);
          const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
          whatYoullFind.push(`${tagDisplay}: ${description}`);
        }
      });
    } else if (tags.length === 1) {
      // Single tag
      const tag = tags[0];
      if (TAG_DESCRIPTIONS[tag]) {
        const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ");
        whatYoullFind.push(`${tagDisplay}: ${getRandomItem(TAG_DESCRIPTIONS[tag])}`);
      } else {
        whatYoullFind.push(`Specialized programs: Opportunities tagged with ${tag}`);
      }
    }
  }

  // Extract actual benefits from opportunities
  const allBenefits: string[] = [];
  opportunities.forEach(opp => {
    if (opp.benefits && Array.isArray(opp.benefits)) {
      allBenefits.push(...opp.benefits);
    }
  });
  
  // Count benefit frequency and normalize
  const benefitCounts = new Map<string, number>();
  const benefitNormalized = new Map<string, string>();
  
  allBenefits.forEach(benefit => {
    if (!benefit || typeof benefit !== "string") return;
    
    const normalized = benefit.toLowerCase().trim();
    if (normalized.length < 10) return; // Skip very short benefits
    
    // Find similar benefits (fuzzy matching)
    let found = false;
    const normalizedEntries = Array.from(benefitNormalized.entries());
    for (const [key, value] of normalizedEntries) {
      const similarity = calculateSimilarity(normalized, key);
      if (similarity > 0.7) {
        benefitCounts.set(key, (benefitCounts.get(key) || 0) + 1);
        found = true;
        break;
      }
    }
    
    if (!found) {
      benefitNormalized.set(normalized, benefit);
      benefitCounts.set(normalized, 1);
    }
  });
  
  // Sort by frequency and get top benefits
  const sortedBenefits = Array.from(benefitCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([normalized]) => benefitNormalized.get(normalized)!)
    .filter(b => b && b.length > 0);
  
  // If we have tag combination content, prioritize it
  let curatedBenefits: string[] = [];
  if (combinationContent && combinationContent.benefits.length > 0) {
    // Use combination benefits, but merge with actual benefits from opportunities
    curatedBenefits = [...combinationContent.benefits];
    // Add top actual benefits that aren't redundant
    const benefitSet = new Set(curatedBenefits.map(b => b.toLowerCase()));
    for (const benefit of sortedBenefits) {
      if (curatedBenefits.length >= 5) break;
      const normalized = benefit.toLowerCase();
      // Check if this benefit is already covered
      const isRedundant = Array.from(benefitSet).some(existing => 
        calculateSimilarity(normalized, existing) > 0.7
      );
      if (!isRedundant) {
        curatedBenefits.push(benefit);
        benefitSet.add(normalized);
      }
    }
  } else {
    // Use actual benefits from opportunities
    curatedBenefits = [...sortedBenefits];
    const benefitSet = new Set(sortedBenefits.map(b => b.toLowerCase()));
    
    // Add funding info if available and not already mentioned
    if (hasFunding && !benefitSet.has("funding") && !benefitSet.has("grant") && !benefitSet.has("stipend")) {
      const fundingKey = getFundingRangeKey(filters.fundingAmount);
      if (fundingKey === "over-100k") {
        curatedBenefits.push("High-value funding opportunities");
      } else if (fundingKey === "under-25k" || fundingKey === "under-50k") {
        curatedBenefits.push("Accessible funding amounts");
      }
    }
    
    // Add equity-free if tag exists and not mentioned
    if (hasTags && tags.some(t => t === "equity-free") && 
        !benefitSet.has("equity") && !benefitSet.has("ownership")) {
      curatedBenefits.push("Equity-free funding");
    }
    
    // Add tag-specific benefits
    if (hasTags) {
      tags.forEach(tag => {
        if (BENEFIT_TEMPLATES[tag] && curatedBenefits.length < 5) {
          const tagBenefits = BENEFIT_TEMPLATES[tag];
          const benefit = getRandomItem(tagBenefits);
          const normalized = benefit.toLowerCase();
          if (!Array.from(benefitSet).some(existing => 
            calculateSimilarity(normalized, existing) > 0.7
          )) {
            curatedBenefits.push(benefit);
            benefitSet.add(normalized);
          }
        }
      });
    }
  }
  
  // Limit to 5 benefits
  const uniqueBenefits = curatedBenefits.slice(0, 5);
  
  // Helper function to calculate string similarity
  function calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }
  
  function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  // Generate tips with varied templates
  const tips: string[] = [];
  
  // Use tag combination tips if available
  if (combinationContent && combinationContent.tips.length > 0) {
    tips.push(...combinationContent.tips);
  } else {
    // Add general tips
    tips.push(...getRandomItem([
      TIP_TEMPLATES.general.slice(0, 3),
      TIP_TEMPLATES.general.slice(1, 4),
      TIP_TEMPLATES.general.slice(0, 2).concat(TIP_TEMPLATES.general.slice(3)),
    ]));
    
    if (hasFunding) {
      tips.push(...getRandomItem([
        TIP_TEMPLATES.funding.slice(0, 2),
        TIP_TEMPLATES.funding.slice(1, 3),
        TIP_TEMPLATES.funding.slice(0, 1).concat(TIP_TEMPLATES.funding.slice(2)),
      ]));
    }
    
    if (categoryNames.some(c => c.toLowerCase().includes("accelerator"))) {
      tips.push(...getRandomItem([
        TIP_TEMPLATES.accelerator.slice(0, 2),
        TIP_TEMPLATES.accelerator.slice(1, 3),
      ]));
    }
    
    if (hasTags) {
      // Add tips for each tag
      tags.forEach(tag => {
        if (TIP_TEMPLATES[tag] && tips.length < 6) {
          tips.push(...TIP_TEMPLATES[tag].slice(0, 2));
        }
      });
      
      // Special handling for tag combinations (even if not in TAG_COMBINATION_CONTENT)
      if (tags.length >= 2) {
        if (tags.includes("remote") && tags.includes("equity-free") && tips.length < 6) {
          tips.push("Consider timezone differences when applying to remote programs");
          tips.push("Verify that equity-free programs don't have hidden equity requirements");
        }
        if ((tags.includes("students") || tags.includes("student")) && tags.includes("remote") && tips.length < 6) {
          tips.push("Ensure remote program schedules align with your academic calendar");
        }
      }
    }
  }
  
  // Limit to 5-6 tips
  const finalTips = tips.slice(0, 6);

  return {
    overview,
    whatYoullFind: whatYoullFind.length > 0 ? whatYoullFind : [
      "Curated list of tech opportunities",
      "Current application deadlines",
      "Direct links to program applications",
    ],
    benefits: uniqueBenefits.length > 0 ? uniqueBenefits : [
      "Access to curated opportunities",
      "Up-to-date deadline information",
      "Easy application process",
    ],
    tips: finalTips.length > 0 ? finalTips : [
      "Start preparing your application materials well in advance of deadlines",
      "Research each program thoroughly to understand their specific requirements",
      "Reach out to program alumni for insights and advice",
    ],
  };
}

// Keyword synonyms and variations
const KEYWORD_SYNONYMS: Record<string, string[]> = {
  fellowship: ["fellowships", "tech fellowship", "fellowship program", "fellowship opportunities", "fellowship application"],
  accelerator: ["accelerators", "startup accelerator", "tech accelerator", "accelerator program", "startup program"],
  incubator: ["incubators", "startup incubator", "incubator program", "business incubator"],
  grant: ["grants", "tech grants", "grant funding", "grant program", "funding grants"],
  remote: ["remote work", "remote opportunities", "work from home", "location independent", "distributed", "online"],
  "equity-free": ["non-dilutive", "equity free", "no equity", "non-dilutive funding", "equity-free funding"],
  students: ["student", "college students", "university students", "graduate students", "undergraduate"],
  "pre-seed": ["pre seed", "pre-seed funding", "idea stage", "concept stage", "very early stage"],
  "early-stage": ["early stage", "early stage startup", "startup early stage", "early phase"],
  mentorship: ["mentor", "mentoring", "mentorship program", "mentor guidance", "advisor"],
  networking: ["network", "networking events", "connections", "community", "industry connections"],
  funding: ["funding opportunities", "capital", "investment", "financial support", "funding programs"],
};

// Action keywords
const ACTION_KEYWORDS = [
  "apply", "application", "applications", "apply now", "how to apply",
  "find", "discover", "search", "browse", "explore",
  "deadline", "deadlines", "application deadline", "apply by",
  "opportunities", "programs", "fellowships", "grants", "competitions",
];

// Long-tail keyword templates
const LONG_TAIL_TEMPLATES = [
  "{category} {tag} opportunities",
  "{tag} {category} programs",
  "best {category} {tag}",
  "{category} {tag} {region}",
  "{tag} {category} {funding}",
  "how to apply {category} {tag}",
  "{category} {tag} application",
  "{tag} {category} deadline",
  "{category} {tag} {region} {funding}",
  "find {category} {tag}",
];

/**
 * Generate comprehensive keywords for guide pages
 */
export function generateGuideKeywords(config: GuideConfig): string {
  const { filters } = config;
  const keywords: Set<string> = new Set();
  
  // Add base keywords
  ACTION_KEYWORDS.forEach(kw => keywords.add(kw));
  
  // Category keywords
  if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach(category => {
      const categoryName = CATEGORY_NAMES[category] || category;
      const normalized = categoryName.toLowerCase();
      
      keywords.add(normalized);
      keywords.add(category);
      keywords.add(`${normalized} opportunities`);
      keywords.add(`${normalized} programs`);
      keywords.add(`best ${normalized}`);
      keywords.add(`apply ${normalized}`);
      
      // Add synonyms
      if (KEYWORD_SYNONYMS[category]) {
        KEYWORD_SYNONYMS[category].forEach(syn => keywords.add(syn));
      }
    });
  }
  
  // Tag keywords
  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => {
      const normalized = tag.toLowerCase().replace(/-/g, " ");
      keywords.add(normalized);
      keywords.add(tag);
      keywords.add(`${normalized} opportunities`);
      keywords.add(`${normalized} programs`);
      
      // Add synonyms
      if (KEYWORD_SYNONYMS[tag]) {
        KEYWORD_SYNONYMS[tag].forEach(syn => keywords.add(syn));
      }
      
      // Tag-specific long-tail keywords
      if (tag === "remote") {
        keywords.add("remote work opportunities");
        keywords.add("work from home programs");
        keywords.add("location independent");
        keywords.add("distributed teams");
      } else if (tag === "equity-free") {
        keywords.add("equity free funding");
        keywords.add("non-dilutive funding");
        keywords.add("no equity required");
        keywords.add("equity-free programs");
      } else if (tag === "students" || tag === "student") {
        keywords.add("student opportunities");
        keywords.add("college student programs");
        keywords.add("university students");
        keywords.add("graduate student opportunities");
      } else if (tag === "pre-seed") {
        keywords.add("pre seed funding");
        keywords.add("idea stage funding");
        keywords.add("concept stage");
        keywords.add("very early stage");
      } else if (tag === "early-stage") {
        keywords.add("early stage startup");
        keywords.add("startup early stage");
        keywords.add("early phase funding");
      } else if (tag === "mentorship") {
        keywords.add("mentorship programs");
        keywords.add("mentor guidance");
        keywords.add("mentoring opportunities");
      } else if (tag === "networking") {
        keywords.add("networking events");
        keywords.add("industry connections");
        keywords.add("networking opportunities");
      }
    });
    
    // Tag combination keywords
    if (filters.tags.length >= 2) {
      const tagCombination = detectTagCombination(filters.tags);
      if (tagCombination === "remote+equity-free") {
        keywords.add("remote equity-free opportunities");
        keywords.add("equity-free remote programs");
        keywords.add("non-dilutive remote funding");
        keywords.add("remote work equity-free");
      } else if (tagCombination === "students+remote" || tagCombination === "remote+students") {
        keywords.add("remote student opportunities");
        keywords.add("student remote programs");
        keywords.add("remote work for students");
        keywords.add("online student programs");
      } else if (tagCombination === "pre-seed+early-stage") {
        keywords.add("pre-seed early stage");
        keywords.add("very early stage funding");
        keywords.add("idea stage startup");
        keywords.add("concept stage programs");
      } else if (tagCombination === "mentorship+networking") {
        keywords.add("mentorship and networking");
        keywords.add("mentor network programs");
        keywords.add("mentorship networking opportunities");
      } else if (tagCombination === "equity-free+funding") {
        keywords.add("equity-free funding opportunities");
        keywords.add("non-dilutive funding programs");
        keywords.add("equity-free capital");
      } else if (tagCombination === "early-stage+equity-free") {
        keywords.add("early stage equity-free");
        keywords.add("equity-free early stage");
        keywords.add("non-dilutive early stage funding");
      }
      
      // Generic tag combination keywords
      const tagDisplay = filters.tags.map(t => t.replace(/-/g, " ")).join(" ");
      keywords.add(`${tagDisplay} opportunities`);
      keywords.add(`${tagDisplay} programs`);
    }
  }
  
  // Region keywords
  if (filters.regions && filters.regions.length > 0) {
    filters.regions.forEach(region => {
      keywords.add(region.toLowerCase());
      keywords.add(`${region.toLowerCase()} opportunities`);
      keywords.add(`programs in ${region.toLowerCase()}`);
      keywords.add(`${region.toLowerCase()} tech programs`);
      
      // Region-specific variations
      if (region === "North America") {
        keywords.add("north american");
        keywords.add("usa programs");
        keywords.add("canada opportunities");
        keywords.add("silicon valley");
      } else if (region === "Europe") {
        keywords.add("european");
        keywords.add("eu programs");
        keywords.add("europe opportunities");
      } else if (region === "Asia") {
        keywords.add("asian");
        keywords.add("asia programs");
        keywords.add("asian opportunities");
      } else if (region === "Global") {
        keywords.add("international");
        keywords.add("worldwide");
        keywords.add("global programs");
      }
    });
  }
  
  // Funding keywords
  if (filters.fundingAmount) {
    const { min, max } = filters.fundingAmount;
    const fundingKey = getFundingRangeKey(filters.fundingAmount);
    
    keywords.add("funding opportunities");
    keywords.add("funding programs");
    keywords.add("grants and funding");
    
    if (fundingKey === "under-25k") {
      keywords.add("funding under 25k");
      keywords.add("small grants");
      keywords.add("under $25000");
      keywords.add("early stage funding");
      keywords.add("seed funding");
    } else if (fundingKey === "under-50k") {
      keywords.add("funding under 50k");
      keywords.add("under $50000");
      keywords.add("mid-range funding");
    } else if (fundingKey === "under-100k") {
      keywords.add("funding under 100k");
      keywords.add("under $100000");
      keywords.add("substantial funding");
    } else if (fundingKey === "over-100k") {
      keywords.add("funding over 100k");
      keywords.add("high-value funding");
      keywords.add("over $100000");
      keywords.add("large grants");
      keywords.add("significant funding");
    }
    
    // Add specific amount keywords if relevant
    if (min > 0) {
      keywords.add(`funding from $${min.toLocaleString()}`);
    }
    if (max < 2000000 && max !== Infinity) {
      keywords.add(`funding up to $${max.toLocaleString()}`);
    }
  }
  
  // Generate long-tail keywords from templates
  if (filters.categories && filters.categories.length > 0 && filters.tags && filters.tags.length > 0) {
    const category = (CATEGORY_NAMES[filters.categories[0]] || filters.categories[0]).toLowerCase();
    const tag = filters.tags[0].replace(/-/g, " ");
    
    LONG_TAIL_TEMPLATES.forEach(template => {
      let longTail = template
        .replace("{category}", category)
        .replace("{tag}", tag);
      
      if (filters.regions && filters.regions.length > 0) {
        longTail = longTail.replace("{region}", filters.regions[0].toLowerCase());
      }
      if (filters.fundingAmount) {
        const fundingKey = getFundingRangeKey(filters.fundingAmount);
        longTail = longTail.replace("{funding}", fundingKey.replace(/-/g, " "));
      }
      
      // Only add if all placeholders are replaced
      if (!longTail.includes("{") && !longTail.includes("}")) {
        keywords.add(longTail);
      }
    });
  }
  
  // Add conversational keywords
  keywords.add("how to find");
  keywords.add("where to apply");
  keywords.add("when to apply");
  keywords.add("application process");
  keywords.add("eligibility requirements");
  keywords.add("application deadline");
  
  // Add opportunity count context if available
  keywords.add("active opportunities");
  keywords.add("current deadlines");
  keywords.add("open applications");
  
  // Convert to comma-separated string, limit to reasonable length
  const keywordArray = Array.from(keywords);
  // Prioritize: category/tag combinations, then individual terms, then generic
  const prioritized = [
    ...keywordArray.filter(k => k.includes(" ") && (k.includes("opportunities") || k.includes("programs"))),
    ...keywordArray.filter(k => k.includes(" ") && !k.includes("opportunities") && !k.includes("programs")),
    ...keywordArray.filter(k => !k.includes(" ")),
  ];
  
  // Limit to ~30-40 keywords max (meta keywords should be reasonable length)
  return prioritized.slice(0, 40).join(", ");
}

