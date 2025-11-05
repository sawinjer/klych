import { S3Client } from "@aws-sdk/client-s3";
import { s3Url } from "../env/s3Url";
import { env } from "../env/env";

export const s3 = new S3Client({
  endpoint: s3Url,
  region: "us-east-1", // MinIO ignores region but it’s required
  credentials: {
    accessKeyId: env.MINIO_ACCESS_KEY,
    secretAccessKey: env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});
