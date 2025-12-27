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

export interface Article {
  id: string;
  type: "article" | "guide";
  opportunityId?: string;
  category?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  structuredData?: Record<string, unknown>;
  keywords: string[];
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: "draft" | "published";
}