import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db";
import { env } from "./env/env";

export const auth = betterAuth({
  user: {
    additionalFields: {
      surname: {
        type: "string",
        input: true,
      },
      age: {
        type: "number",
        input: true,
        required: false,
      },
      gender: {
        type: "string",
        input: true,
        required: false,
      },
      shortInfo: {
        type: "string",
        input: true,
        required: false,
      },
      placeOfVolunteering: {
        type: "string",
        input: true,
        required: false,
      },
      placeOfWork: {
        type: "string",
        input: true,
        required: false,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
