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
}

export const fellowshipOpportunities: Opportunity[] = [
  {
    id: "vercel-open-source-program",
    name: "Vercel Open Source Program",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFggf9yNRN9xCYku8XMEkSE0LU9uMhkYbehQ&s",
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
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVIZtjevkGlPattYIUlcpxkTvbz8EcZifXqQ&s",
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
  },
  {
    id: "776-foundation-2025",
    name: "776 Foundation Fellowship",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-rE_hcajytWETqX5IyNz6-7dVwxiuwa2qtQ&s",
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
  },
  {
    id: "angelpad",
    name: "AngelPad",
    logoUrl: "https://angelpad.com/wp-content/uploads/angelpad-logo.jpg",
    description:
      "12-week, seed-stage on-site accelerator based in San Francisco and New York; invests $120,000 for ~7% equity and provides intensive mentorship, fundraising prep, and access to a top-tier founder network.",
    fullDescription:
      "AngelPad, founded in 2010 by Thomas Korte and Carine Magescas, selects about 15 startups twice a year from ~2,000 applicants for its 12-week cohorts in San Francisco or New York. Participating teams receive a $120,000 seed investment (2% equity plus 5% common stock), access to over $300,000 in cloud credits, 1:1 mentorship from experienced founders, regular investor prep sessions, and culminate the program with a Demo Day to top investors. Applications are highly competitive (<1% acceptance) and the next cohort schedule is announced via their mailing list.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "mentorship", "short-term", "tech", "in-person"],
    category: "accelerator",
    region: "North America",
    country: "USA",
    eligibility:
      "Seed-stage startups with a working prototype or MVP; founding teams typically of two or more; must relocate to SF or NYC for the duration; open to applicants worldwide, acceptance rate under 1%.",
    applyLink: "https://angelpad.com/#apply",
    benefits: [
      "$120,000 investment for ~7% equity",
      "12-week intensive on-site program",
      "1:1 mentorship from top founders",
      "$300,000+ in cloud credits",
      "Demo Day with prominent investors",
    ],
    organizer: "AngelPad",
  },
  {
    id: "the-residency-startup",
    name: "The Residency",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgPUDl4LKZbxLf0Z2JIlQkB_sXBLf7PYm6Mg&s",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1754493933625737216/5pr4yurq_400x400.jpg",
    description:
      "Month-long immersive pop-up village experience for builders under 25, fully covered (housing & ticket) at Edge City's global sites.",
    fullDescription:
      "The Edge City Fellowship is a month-long in-person program empowering high-agency builders (under 25) to accelerate human flourishing across frontier tech, science & society. Fellows receive a full ride to one of Edge City's popup villages (e.g. Edge Esmeralda in Healdsburg, CA, May 24 – June 21 2025; Edge City LatAm in Argentina later in the year), access to a global mentorship network, and opportunities for follow-on funding via Long Journey VC and internal grant programs.",
    openDate: null,
    closeDate: null,
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
      "https://edgecity.notion.site/The-Edge-City-Fellowship-fc96ca95efca43d289388a45cd98c631",
    benefits: [
      "Full ride to a month-long popup village (housing & ticket)",
      "Access to Edge City's global mentorship & builder network",
      "Opportunities for follow-on funding (Inflection & SHIFT grants, VC pitches)",
    ],
    organizer: "Edge City",
  },
  {
    id: "edge-city-inflection-grants",
    name: "Edge City Inflection Grants",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1754493933625737216/5pr4yurq_400x400.jpg",
    description:
      "Micro-grant of $2 000 for creative builders under 25 to turn unusual ideas into reality.",
    fullDescription:
      "Inflection Grants provide a $2 000 award to creative young builders (under 25) to pursue high-impact, unconventional projects anywhere in the world. Recipients gain access to the Edge City ecosystem, community support, and mentorship, plus the option to apply for follow-on funding through our broader grant programs.",
    openDate: null,
    closeDate: null,
    tags: ["equity-free", "mentorship", "short-term", "under-25", "funding"],
    category: "grant",
    region: "Global",
    country: null,
    eligibility:
      "Creative builders under 25 with a clear proof-of-work portfolio and an unusual idea ready for a small but catalytic push.",
    applyLink: "https://www.edgecity.live/grants-fellowships",
    benefits: [
      "$2 000 to build and experiment",
      "Access to Edge City's global community & resources",
      "Pathway to follow-on funding (SHIFT, VC partnerships)",
    ],
    organizer: "Edge City",
  },
  {
    id: "edge-city-shift-grants",
    name: "Edge City SHIFT Grants",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1754493933625737216/5pr4yurq_400x400.jpg",
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
    id: "ashoka-fellowship",
    name: "Ashoka Fellowship",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxOghHespezyoNolFyTtOchC_7S0OibiWlA&s",
    description:
      "Lifelong network for leading social entrepreneurs, offering needs-assessed stipends and strategic support to champion system-changing solutions globally.",
    fullDescription:
      "For over 40 years, Ashoka has elected world-leading social entrepreneurs as Fellows. Selected changemakers join a lifelong, non-residential Fellowship—receiving an unrestricted, needs-assessed stipend (up to three years), pro-bono legal advice, coaching, leadership development, and access to online courses and trainings on systems change and social finance. Ashoka's global community of peers provides personalized and ad hoc support throughout Fellows' entrepreneurial journeys.",
    openDate: null,
    closeDate: null,
    tags: ["stipend", "mentorship", "long-term", "social-impact", "global"],
    category: "fellowship",
    region: "Global",
    country: null,
    eligibility:
      "Exceptional social entrepreneurs (founders/co-founders of non-profits) with proven, system-changing ideas, committed to working full-time on their initiative for at least three years.",
    applyLink: "https://www.ashoka.org/en/fellows/nominate",
    benefits: [
      "Needs-assessed living stipend for up to three years",
      "Access to a global community of social entrepreneurs",
      "Pro-bono legal advice, coaching, and leadership development",
      "Structured courses, webinars, and ad hoc strategic support",
    ],
    organizer: "Ashoka",
  },
  {
    id: "entrepreneurs-first-fall-2025",
    name: "Entrepreneurs First",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRUA_aYiiXgyGi7W9as6RswttrMywi6Re8mA&s",
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
    id: "founder-institute",
    name: "Founder Institute",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuOhMwPG-8dCs76XzBVayTG-3MkKZfXCkrUQ&s",
    description:
      '14-week pre-seed startup accelerator providing structured training, mentorship, and access to a global network of mentors and entrepreneurs; requires a refundable entrance fee of $799 (early, by Aug 17, 2025) or $999 (standard), refundable if withdrawn before the "Revenue & Business Models" session.',
    fullDescription:
      "The Founder Institute, based in Palo Alto, California, runs a 14-week part-time program for idea-stage to pre-seed founders. Participants work through weekly sprints on vision, customer development, business models, legal, go-to-market, and fundraising, with constant feedback from local and global mentors. Cohorts start quarterly—with the Fall 2025 cycle having an Early Admissions Deadline of August 17, 2025, Final Admissions Deadline of September 21, 2025, and kickoff on October 8, 2025. Graduates join an equity collective and gain ongoing support through advanced programs and investor networks.",
    openDate: null,
    closeDate: null,
    tags: ["equity-based", "mentorship", "medium-term", "tech", "hybrid"],
    category: "accelerator",
    region: "North America",
    country: "USA",
    eligibility:
      "Aspiring founders and early-stage startups (solo or teams) at idea or pre-seed stage, across tech and tech-enabled industries.",
    applyLink: "https://fi.co/join",
    benefits: [
      "Structured 14-week curriculum",
      "Weekly feedback sessions with mentors",
      "Access to a global network of 35,000+ mentors",
      "Alumni equity collective and investor introductions",
    ],
    organizer: "Founder Institute",
  },
  {
    id: "emergent-ventures",
    name: "Emergent Ventures Fellowship",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8aVTqEo-OBmgqD8yEeSdhgGnjfglNQOozw&s",
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
  },
  {
    id: "y-combinator-fall-2025",
    name: "Y Combinator",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png",
    description:
      "Seed-stage accelerator providing $500 000 in funding and mentorship for early-stage startups.",
    fullDescription:
      "Y Combinator runs a three-month accelerator program in Silicon Valley, investing $125 000 for 7% equity plus $375 000 on an uncapped SAFE (MFN clause). Participants get weekly dinners and office hours with top founders, culminating in Demo Day. Four batches run each year; applications for Fall 2025 are open now, with on-time deadline August 4, 2025 at 8 PM PT.",
    openDate: "2025-05-06",
    closeDate: "2025-08-04",
    tags: ["equity-based", "mentorship", "short-term", "tech", "in-person"],
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
  },
  {
    id: "zfellows",
    name: "Z Fellows",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65Ro-jLqs28yBKfyD8cp9PgepjaH9IUEgGg&s",
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
  },
  {
    id: "a16z-crypto-startup-accelerator",
    name: "a16z Crypto Startup Accelerator",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1582168997134422016/HcmVyKwV_400x400.jpg",
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
    logoUrl: "https://i.ibb.co/sJDKj0MD/image.png",
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
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQID1xMTmAZzfe1EBazgth2MBqA_dZa77DQuQ&s",
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
      "https://i0.wp.com/www.scholarshipsinindia.com/wp-content/uploads/global-good-fund-fellowship.jpg?fit=200%2C200&ssl=1",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1904750912540991488/R5CIeeW3_400x400.jpg",
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
    logoUrl:
      "https://pbs.twimg.com/profile_images/1934781639198167040/24emfYDA_400x400.jpg",
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
    tags: ["mentorship", "short-term", "tech", "virtual", "pre-seed"],
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
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return fellowshipOpportunities.find((opp) => opp.id === id);
}

export function getUpcomingDeadlines(count: number = 5): Opportunity[] {
  const now = new Date();
  return fellowshipOpportunities
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
  const parts = region
    .split(/[–—,&()]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const normalizedRegions = parts.map((part) => {
    if (part.toLowerCase().includes("latin america")) return "Latin America";
    if (part.toLowerCase().includes("caribbean")) return "Caribbean";
    return part;
  });

  return Array.from(new Set(normalizedRegions));
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

export const SYSTEM_PROMPT = `You are a fellowship matching assistant. Your primary goal is to find the most relevant opportunities based on the user's location, background, and interests. Analyze the user's situation and return a JSON response matching this EXACT format:

{
  "recommendations": [
    {
      "id": "exact-id-from-opportunities",
      "matchScore": number between 0-100,
      "reason": "One sentence explaining why this is a good match"
    }
  ]
}

CRITICAL REQUIREMENTS:
1. Response MUST be valid JSON
2. ONLY use fellowship IDs from the provided opportunities
3. matchScore must be number 0-100
4. Include max 3 best matches (score > 70)
5. Sort by matchScore descending
6. NO additional text or explanation outside JSON
7. NO markdown or formatting
8. If no good matches found, return empty recommendations array

MATCHING PRIORITIES (in order):
1. Location Match: Strongly prioritize opportunities in the user's mentioned location/region
   - If user mentions a city/region, prioritize opportunities there
   - Only suggest international opportunities if explicitly relevant to user's goals
   - Reduce match score by 30-50 points for location mismatches

2. Eligibility Match:
   - Ensure user meets basic eligibility criteria mentioned
   - If eligibility unclear, prioritize more inclusive opportunities
   - Reduce match score if eligibility requirements might not be met

3. Interest/Background Match:
   - Match opportunity category with user's mentioned interests/background
   - Consider the opportunity description and how it aligns with user's goals
   - Reduce match score for weak interest alignment

4. General Guidelines:
   - Be conservative with match scores - only give high scores (>85) for very strong matches
   - Include specific reasons why each match is relevant to the user's situation
   - If user provides limited information, focus on matching what is known
   - Better to return fewer, more relevant matches than many weak matches`;
