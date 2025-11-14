import { count, desc, eq } from "drizzle-orm";
import type { Pagination } from "@/lib/types/pagination";
import { db } from "../db";
import { klych, klychResponds } from "../klychSchema";

export const getKlychsResponds = async (
  userId: string,
  pagination: Pagination,
) => {
  return await db
    .select({
      id: klychResponds.id,
      status: klychResponds.status,
      klych,
    })
    .from(klychResponds)
    .innerJoin(klych, eq(klych.id, klychResponds.klychId))
    .where(eq(klychResponds.authorId, userId))
    .orderBy(desc(klychResponds.createdAt))
    .limit(pagination.itemsPerPage)
    .offset((pagination.page - 1) * pagination.itemsPerPage);
};

export const getRespondsCount = async (userId: string) => {
  const countOfResponds = await db
    .select({ count: count() })
    .from(klychResponds)
    .where(eq(klychResponds.authorId, userId));

  return countOfResponds[0]?.count || 0;
};
