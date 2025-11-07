import { env } from "./env";

const protocol = env.MINIO_USE_SSL ? "https" : "http";
export const s3Url = `${protocol}://${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET}`;

export const getFilePath = (objectName: string) => {
  return `${s3Url}/${env.MINIO_BUCKET}/${objectName}`;
};
