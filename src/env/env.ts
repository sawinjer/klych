import zod from "zod";

const MAX_PORT_NUMBER = 65535;

const envSchema = zod.object({
  DB_PORT: zod.number().int().positive().min(1).max(MAX_PORT_NUMBER),
  DB_USER: zod.string().nonempty(),
  DB_PASSWORD: zod.string().nonempty(),
  DB_NAME: zod.string().nonempty(),
  DB_HOST: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),

  EMAIL_HOST: zod.string(),
  EMAIL_PORT: zod.number().int().positive().max(MAX_PORT_NUMBER),
  EMAIL_USER: zod.string().nonempty(),
  EMAIL_PASSWORD: zod.string().nonempty(),

  MINIO_ENDPOINT: zod.string(),
  MINIO_ACCESS_KEY: zod.string(),
  MINIO_SECRET_KEY: zod.string(),
  MINIO_BUCKET: zod.string(),
  MINIO_USE_SSL: zod.boolean(),

  MEILI_MASTER_KEY: zod.string(),
});

export const env = envSchema.parse({
  ...process.env,
  DB_PORT: +(process.env.DB_PORT || ""),
  EMAIL_PORT: +(process.env.EMAIL_PORT || ""),
  MINIO_USE_SSL: process.env.MINIO_USE_SSL === "true",
});

export const getDatabaseUrl = () => {
  return `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
};
