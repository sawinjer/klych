import zod from "zod";
import { MAX_PORT_NUMBER } from "./constants";
import { dbEnvSchema, escapeProcessEnvForDbEnv } from "./dbEnv";
import { escapeProcessEnvForS3UrlEnv, s3UrlEnvSchema } from "./s3UrlEnv";

const envSchema = zod.object({
  ...dbEnvSchema,
  ADMIN_EMAILS: zod.array(zod.string().email()).optional(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),

  EMAIL_HOST: zod.string(),
  EMAIL_PORT: zod.number().int().positive().max(MAX_PORT_NUMBER),
  EMAIL_USER: zod.string().nonempty(),
  EMAIL_PASSWORD: zod.string().nonempty(),

  MINIO_ACCESS_KEY: zod.string(),
  MINIO_SECRET_KEY: zod.string(),
  ...s3UrlEnvSchema,

  MEILI_MASTER_KEY: zod.string(),
});

export const env = envSchema.parse({
  ...process.env,
  ...escapeProcessEnvForS3UrlEnv(),
  ...escapeProcessEnvForDbEnv(),
  ADMIN_EMAILS: process.env.ADMIN_EMAILS?.split(","),
  EMAIL_PORT: +(process.env.EMAIL_PORT || ""),
});
