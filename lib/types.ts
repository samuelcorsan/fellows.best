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

export type DiscordEmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type DiscordWebhookPayload = {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    fields?: DiscordEmbedField[];
    timestamp?: string;
    footer?: { text: string };
  }>;
};
