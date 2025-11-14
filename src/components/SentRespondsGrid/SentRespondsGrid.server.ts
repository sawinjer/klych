"use server";

import { getKlychsResponds } from "@/db/queries/getResponds";
import type { Pagination } from "@/lib/types/pagination";
import { mapRespondToCard } from "./SentRespondsGrid.utils";

export const loadMoreResponds = async (
  userId: string,
  pagination: Pagination,
) => {
  const responds = await getKlychsResponds(userId, pagination);
  return responds.map(mapRespondToCard);
};
