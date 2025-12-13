import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db";
import { env } from "./env/env";
import { UserRole } from "./lib/enums/UserRole";

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
      role: {
        type: "string",
        required: false,
        input: false,
        defaultValue: UserRole.User,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = env.ADMIN_EMAILS || [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.Admin } };
          }

          return { data: user };
        },
      },
    },
  },
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
