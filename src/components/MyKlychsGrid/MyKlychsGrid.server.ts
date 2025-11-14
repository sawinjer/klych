"use server";

import { getMyKlyches } from "@/db/queries/getMyKlyches";
import type { Pagination } from "@/lib/types/pagination";
import { mapKlychToCard } from "../LikesGrid/LikesGrid.utils";

export const loadMoreKlychs = async (
  userId: string,
  pagination: Pagination,
  finished?: boolean,
) => {
  const klychs = await getMyKlyches(userId, pagination, finished);
  return klychs.map(mapKlychToCard);
};
