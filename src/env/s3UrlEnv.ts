import zod from "zod";

export const s3UrlEnvSchema = {
  MINIO_ENDPOINT: zod.string(),
  MINIO_BUCKET: zod.string(),
  MINIO_USE_SSL: zod.boolean(),
} as const;

export const escapeProcessEnvForS3UrlEnv = () => {
  return {
    MINIO_USE_SSL: process.env.MINIO_USE_SSL === "true",
  };
};

export const s3UrlEnv = zod.object(s3UrlEnvSchema).parse({
  ...process.env,
  ...escapeProcessEnvForS3UrlEnv(),
});
