import { env } from "./env";

const protocol = env.MEILI_USE_SSL ? "https" : "http";
export const meiliUrl = `${protocol}://${env.MEILI_HOST}:${env.MEILI_PORT}`;
