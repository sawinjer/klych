import { publicEnv } from "./publicEnv";

const protocol = publicEnv.NEXT_PUBLIC_MEILI_USE_SSL ? "https" : "http";
export const meiliUrl = `${protocol}://${publicEnv.NEXT_PUBLIC_MEILI_HOST}:${publicEnv.NEXT_PUBLIC_MEILI_PORT}`;
