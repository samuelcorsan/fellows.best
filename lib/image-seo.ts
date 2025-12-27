import type { Opportunity } from "./data";

/**
 * Generate alt text for opportunity logos/images
 */
export function generateAltText(opportunity: Opportunity): string {
  if (opportunity.organizer && opportunity.organizer !== opportunity.name) {
    return `${opportunity.name} - ${opportunity.organizer} logo`;
  }
  return `${opportunity.name} logo`;
}

