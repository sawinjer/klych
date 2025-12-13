import { Meilisearch } from "meilisearch";
import { meiliUrl } from "@/env/meiliUrl";
import { publicEnv } from "@/env/publicEnv";

export const publicMeiliClient = new Meilisearch({
  host: meiliUrl,
  apiKey: publicEnv.NEXT_PUBLIC_MEILI_TOKEN,
});
