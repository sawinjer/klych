import { s3UrlEnv } from "./s3UrlEnv";
const protocol = s3UrlEnv.MINIO_USE_SSL ? "https" : "http";
export const s3Url = `${protocol}://${s3UrlEnv.MINIO_ENDPOINT}/${s3UrlEnv.MINIO_BUCKET}`;

export const getFilePath = (objectName: string) => {
  return `${s3Url}/${s3UrlEnv.MINIO_BUCKET}/${objectName}`;
};
