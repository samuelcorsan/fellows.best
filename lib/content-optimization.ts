import type { Opportunity } from "./data";

/**
 * Generate "How to Apply" guide steps
 */
export function generateHowToApplySteps(
  opportunity: Opportunity
): string[] {
  const steps: string[] = [];

  steps.push(`Review the eligibility requirements: ${opportunity.eligibility}`);
  
  if (opportunity.benefits.length > 0) {
    steps.push(
      `Understand what you'll receive: ${opportunity.benefits.join(", ")}`
    );
  }

  steps.push(`Prepare your application materials (resume, portfolio, etc.)`);
  
  if (opportunity.funding) {
    steps.push(
      `Review the funding terms: ${opportunity.funding.amount} ${opportunity.funding.currency}`
    );
  }

  steps.push(`Submit your application through the official link`);
  
  if (opportunity.closeDate && opportunity.closeDate !== "closed") {
    steps.push(
      `Ensure you submit before the deadline: ${new Date(
        opportunity.closeDate
      ).toLocaleDateString()}`
    );
  }

  return steps;
}

/**
 * Generate comparison content structure
 */
export function generateComparisonStructure(
  opportunity1: Opportunity,
  opportunity2: Opportunity
): {
  title: string;
  points: Array<{ aspect: string; opp1: string; opp2: string }>;
} {
  const points: Array<{ aspect: string; opp1: string; opp2: string }> = [];

  // Funding comparison
  if (opportunity1.funding && opportunity2.funding) {
    points.push({
      aspect: "Funding",
      opp1: `${opportunity1.funding.amount} ${opportunity1.funding.currency}`,
      opp2: `${opportunity2.funding.amount} ${opportunity2.funding.currency}`,
    });
  }

  // Category comparison
  points.push({
    aspect: "Type",
    opp1: opportunity1.category,
    opp2: opportunity2.category,
  });

  // Region comparison
  points.push({
    aspect: "Region",
    opp1: opportunity1.region,
    opp2: opportunity2.region,
  });

  // Duration comparison
  if (opportunity1.duration && opportunity2.duration) {
    points.push({
      aspect: "Duration",
      opp1: `${opportunity1.duration.value} ${opportunity1.duration.unit}`,
      opp2: `${opportunity2.duration.value} ${opportunity2.duration.unit}`,
    });
  }

  return {
    title: `${opportunity1.name} vs ${opportunity2.name}: Which is Right for You?`,
    points,
  };
}

/**
 * Extract long-tail conversational keywords
 */
export function extractConversationalKeywords(
  opportunity: Opportunity
): string[] {
  const keywords: string[] = [];

  // How to questions
  keywords.push(`how to apply to ${opportunity.name}`);
  keywords.push(`how to get into ${opportunity.name}`);
  
  // What questions
  keywords.push(`what is ${opportunity.name}`);
  keywords.push(`what does ${opportunity.name} offer`);

  // When questions
  if (opportunity.closeDate && opportunity.closeDate !== "closed") {
    keywords.push(`when does ${opportunity.name} deadline close`);
  }

  // Requirements questions
  keywords.push(`${opportunity.name} requirements`);
  keywords.push(`${opportunity.name} eligibility`);

  // Benefits questions
  keywords.push(`${opportunity.name} benefits`);
  keywords.push(`what do you get from ${opportunity.name}`);

  return keywords;
}

