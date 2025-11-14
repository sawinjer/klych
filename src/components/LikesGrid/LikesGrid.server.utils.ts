"use server";

import { getLikesWithKlychs } from "@/db/queries/getLikes";
import type { Pagination } from "@/lib/types/pagination";
import { mapKlychToCard } from "./LikesGrid.utils";

export const loadMoreLikes = async (userId: string, pagination: Pagination) => {
  const likes = await getLikesWithKlychs(userId, pagination);
  return likes.map((like) => like.klych).map(mapKlychToCard);
};
