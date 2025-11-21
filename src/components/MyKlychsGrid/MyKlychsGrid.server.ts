"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { Klych, klych } from "@/db/klychSchema";
import { getMyKlyches, getMyKlychesCount } from "@/db/queries/getMyKlyches";
import { getUserInServer } from "@/lib/getUserInServer";
import type { Pagination } from "@/lib/types/pagination";
import { mapKlychToCard } from "../LikesGrid/LikesGrid.utils";

export const fetchMyKlyches = async (
  pagination: Pagination,
  finished?: boolean,
) => {
  const user = await getUserInServer();
  if (!user) {
    return [];
  }
  const klychs = await getMyKlyches(user.id, pagination, finished);
  return klychs.map(mapKlychToCard);
};

export const fetchMyKlychsCount = async (finished?: boolean) => {
  const user = await getUserInServer();
  if (!user) {
    return 0;
  }
  return await getMyKlychesCount(user.id, finished);
};

export const updateKlychStatus = async (
  id: string,
  status: Klych["status"],
) => {
  const user = await getUserInServer();

  if (!user) {
    return;
  }

  const [{ authorId }] = await db
    .select({ authorId: klych.authorId })
    .from(klych)
    .where(eq(klych.id, id));

  if (authorId !== user.id) {
    return;
  }

  await db
    .update(klych)
    .set({
      status,
    })
    .where(eq(klych.id, id));
};
