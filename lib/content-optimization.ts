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
 * Format array or object for display
 */
function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not specified";
  }
  if (typeof value === "object" && value !== null) {
    if ("min" in value || "max" in value) {
      const range = value as { min?: number; max?: number };
      if (range.min && range.max) {
        return `${range.min}-${range.max}`;
      }
      if (range.min) return `${range.min}+`;
      if (range.max) return `Up to ${range.max}`;
    }
    return JSON.stringify(value);
  }
  return String(value || "Not specified");
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

  // Funding comparison - enhanced with extracted data
  if (opportunity1.funding || opportunity2.funding) {
    const funding1 = opportunity1.funding;
    const funding2 = opportunity2.funding;
    
    if (funding1?.amount && funding2?.amount) {
      let opp1Funding = `${funding1.amount} ${funding1.currency}`;
      if (funding1.equityPercentage > 0) {
        opp1Funding += ` (${funding1.equityPercentage}% equity)`;
      }
      if (funding1.conditions && funding1.conditions.length > 0) {
        opp1Funding += ` - ${funding1.conditions[0]}`;
      }
      
      let opp2Funding = `${funding2.amount} ${funding2.currency}`;
      if (funding2.equityPercentage > 0) {
        opp2Funding += ` (${funding2.equityPercentage}% equity)`;
      }
      if (funding2.conditions && funding2.conditions.length > 0) {
        opp2Funding += ` - ${funding2.conditions[0]}`;
      }
      
      points.push({
        aspect: "Funding",
        opp1: opp1Funding,
        opp2: opp2Funding,
      });
    } else if (funding1?.amount) {
      points.push({
        aspect: "Funding",
        opp1: `${funding1.amount} ${funding1.currency}`,
        opp2: "Not specified",
      });
    } else if (funding2?.amount) {
      points.push({
        aspect: "Funding",
        opp1: "Not specified",
        opp2: `${funding2.amount} ${funding2.currency}`,
      });
    }
  }

  // Eligibility comparison - using extracted data
  if (opportunity1.eligibilityDetails || opportunity2.eligibilityDetails) {
    const elig1 = opportunity1.eligibilityDetails;
    const elig2 = opportunity2.eligibilityDetails;
    
    // Education level
    if (elig1?.educationLevel || elig2?.educationLevel) {
      points.push({
        aspect: "Education Level",
        opp1: formatValue(elig1?.educationLevel),
        opp2: formatValue(elig2?.educationLevel),
      });
    }
    
    // Age range
    if (elig1?.ageRange || elig2?.ageRange) {
      points.push({
        aspect: "Age Range",
        opp1: formatValue(elig1?.ageRange),
        opp2: formatValue(elig2?.ageRange),
      });
    }
    
    // Location restrictions
    if (elig1?.locationRestrictions || elig2?.locationRestrictions) {
      points.push({
        aspect: "Location Restrictions",
        opp1: formatValue(elig1?.locationRestrictions),
        opp2: formatValue(elig2?.locationRestrictions),
      });
    }
    
    // Industry focus
    if (elig1?.industryFocus || elig2?.industryFocus) {
      points.push({
        aspect: "Industry Focus",
        opp1: formatValue(elig1?.industryFocus),
        opp2: formatValue(elig2?.industryFocus),
      });
    }
  }

  // Benefits comparison - using extracted data
  if (opportunity1.benefitsDetails || opportunity2.benefitsDetails) {
    const benefits1 = opportunity1.benefitsDetails;
    const benefits2 = opportunity2.benefitsDetails;
    
    // Financial benefits
    if (benefits1?.financial || benefits2?.financial) {
      points.push({
        aspect: "Financial Benefits",
        opp1: formatValue(benefits1?.financial),
        opp2: formatValue(benefits2?.financial),
      });
    }
    
    // Mentorship
    if (benefits1?.mentorship || benefits2?.mentorship) {
      points.push({
        aspect: "Mentorship",
        opp1: formatValue(benefits1?.mentorship),
        opp2: formatValue(benefits2?.mentorship),
      });
    }
    
    // Networking
    if (benefits1?.networking || benefits2?.networking) {
      points.push({
        aspect: "Networking",
        opp1: formatValue(benefits1?.networking),
        opp2: formatValue(benefits2?.networking),
      });
    }
  }

  // Program structure comparison
  if (opportunity1.program || opportunity2.program) {
    const prog1 = opportunity1.program;
    const prog2 = opportunity2.program;
    
    // Location type
    if (prog1?.location?.type || prog2?.location?.type) {
      points.push({
        aspect: "Program Location",
        opp1: prog1?.location?.type || "Not specified",
        opp2: prog2?.location?.type || "Not specified",
      });
    }
    
    // Structure
    if (prog1?.structure || prog2?.structure) {
      points.push({
        aspect: "Program Structure",
        opp1: prog1?.structure || "Not specified",
        opp2: prog2?.structure || "Not specified",
      });
    }
  }

  // Selection process comparison
  if (opportunity1.selection || opportunity2.selection) {
    const sel1 = opportunity1.selection;
    const sel2 = opportunity2.selection;
    
    // Cohort size
    if (sel1?.typicalCohortSize || sel2?.typicalCohortSize) {
      points.push({
        aspect: "Typical Cohort Size",
        opp1: sel1?.typicalCohortSize || "Not specified",
        opp2: sel2?.typicalCohortSize || "Not specified",
      });
    }
    
    // Selection criteria
    if (sel1?.criteria || sel2?.criteria) {
      points.push({
        aspect: "Selection Criteria",
        opp1: formatValue(sel1?.criteria),
        opp2: formatValue(sel2?.criteria),
      });
    }
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
  if (opportunity1.duration || opportunity2.duration) {
    points.push({
      aspect: "Duration",
      opp1: opportunity1.duration
        ? `${opportunity1.duration.value} ${opportunity1.duration.unit}`
        : "Not specified",
      opp2: opportunity2.duration
        ? `${opportunity2.duration.value} ${opportunity2.duration.unit}`
        : "Not specified",
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

