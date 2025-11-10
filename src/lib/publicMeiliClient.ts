import { Meilisearch } from "meilisearch";
import { meiliUrl } from "@/env/meiliUrl";
import { publicEnv } from "@/env/publicEnv";

console.log(process.env, publicEnv, meiliUrl);

export const publicMeiliClient = new Meilisearch({
  host: meiliUrl,
  apiKey: process.env.NEXT_PUBLIC_MEILI_TOKEN,
});
