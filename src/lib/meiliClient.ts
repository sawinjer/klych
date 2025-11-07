import { Meilisearch } from "meilisearch";
import { env } from "@/env/env";
import { meiliUrl } from "@/env/meiliUrl";

export const meiliClient = new Meilisearch({
  host: meiliUrl,
  apiKey: env.MEILI_MASTER_KEY,
});
