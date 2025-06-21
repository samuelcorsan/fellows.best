export interface AiRecommendation {
  id: string;
  matchScore: number;
  reason: string;
  name: string;
  description: string;
  logoUrl: string;
  category: string;
  organizer: string;
}

export interface AiResponse {
  recommendations: AiRecommendation[];
}
