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
    | "incubator"
    | "venture_capital"
    | "grant"
    | "residency"
    | "competition"
    | "research"
    | "developer_program";
  region: string;
  country: string | null;
  eligibility: string;
  applyLink: string;
  benefits: string[];
  organizer: string;
  duration?: {
    value: number;
    unit: "weeks" | "months" | "years";
  };
  funding?: {
    amount: number;
    currency: string;
    equityPercentage: number;
    fundingType: "equity-based" | "equity-free" | "mixed";
    isApproximate?: boolean;
  };
  applicationVideo?: string;
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
    duration?: { min: number; max: number; unit: "weeks" | "months" | "years" };
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

    const isDefaultDurationRange =
      !filters.duration ||
      (filters.duration.min === 0 &&
        ((filters.duration.unit === "weeks" && filters.duration.max === 52) ||
          (filters.duration.unit === "months" && filters.duration.max === 12) ||
          (filters.duration.unit === "years" && filters.duration.max === 5)));

    const durationMatch =
      isDefaultDurationRange ||
      (opp.duration &&
        filters.duration &&
        (() => {
          let oppValueInFilterUnit = opp.duration.value;
          if (
            opp.duration.unit === "weeks" &&
            filters.duration.unit === "months"
          ) {
            oppValueInFilterUnit = opp.duration.value / 4.33;
          } else if (
            opp.duration.unit === "weeks" &&
            filters.duration.unit === "years"
          ) {
            oppValueInFilterUnit = opp.duration.value / 52;
          } else if (
            opp.duration.unit === "months" &&
            filters.duration.unit === "weeks"
          ) {
            oppValueInFilterUnit = opp.duration.value * 4.33;
          } else if (
            opp.duration.unit === "months" &&
            filters.duration.unit === "years"
          ) {
            oppValueInFilterUnit = opp.duration.value / 12;
          } else if (
            opp.duration.unit === "years" &&
            filters.duration.unit === "weeks"
          ) {
            oppValueInFilterUnit = opp.duration.value * 52;
          } else if (
            opp.duration.unit === "years" &&
            filters.duration.unit === "months"
          ) {
            oppValueInFilterUnit = opp.duration.value * 12;
          }
          return (
            oppValueInFilterUnit >= filters.duration.min &&
            oppValueInFilterUnit <= filters.duration.max
          );
        })());

    return (
      categoryMatch &&
      regionMatch &&
      tagMatch &&
      fundingMatch &&
      equityMatch &&
      durationMatch
    );
  });
}
