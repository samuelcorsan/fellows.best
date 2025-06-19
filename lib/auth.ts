import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      fellowship_ids: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship IDs",
      },
      fellowship_names: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship names",
      },
      fellowship_organizers: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship organizers",
      },
      fellowship_years: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship years",
      },
      fellowship_statuses: {
        type: "string",
        required: false,
        defaultValue: "",
        description:
          "Comma-separated list of fellowship statuses (completed/ongoing)",
        validate: (value: string) => {
          if (!value) return true;
          return value
            .split(",")
            .every((status) =>
              ["completed", "ongoing"].includes(status.trim())
            );
        },
      },
      fellowship_image_urls: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship image URLs",
      },
      fellowship_descriptions: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship descriptions",
      },
      fellowship_categories: {
        type: "string",
        required: false,
        defaultValue: "",
        description: "Comma-separated list of fellowship categories",
      },
    },
  },
});
