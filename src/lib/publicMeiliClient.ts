import { Meilisearch } from "meilisearch";
import { meiliUrl } from "@/env/meiliUrl";

export const publicMeiliClient = new Meilisearch({
  host: meiliUrl,
  apiKey: process.env.NEXT_PUBLIC_MEILI_TOKEN,
});
