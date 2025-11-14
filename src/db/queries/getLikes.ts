import { and, count, desc, eq } from "drizzle-orm";
import type { Pagination } from "@/lib/types/pagination";
import { db } from "../db";
import { klych, klychLike } from "../klychSchema";

const getConfition = (userId: string, klychId?: string) => {
  const userIdCondition = eq(klychLike.authorId, userId);

  if (!klychId) {
    return userIdCondition;
  }

  return and(userIdCondition, eq(klych.id, klychId));
};

export const getLikes = async (userId: string, klychId?: string) => {
  return await db
    .select({ id: klychLike.id, klychId: klychLike.klychId })
    .from(klychLike)
    .orderBy(desc(klychLike.createdAt))
    .where(getConfition(userId, klychId));
};

export const getLikesWithKlychs = async (
  userId: string,
  pagination?: Pagination,
) => {
  const query = db
    .select({ klych, klychId: klychLike.klychId })
    .from(klychLike)
    .innerJoin(klych, eq(klych.id, klychLike.klychId))
    .orderBy(desc(klychLike.createdAt))
    .where(getConfition(userId));

  if (pagination) {
    query.limit(pagination.itemsPerPage);
    query.offset((pagination.page - 1) * pagination.itemsPerPage);
  }

  return await query;
};

export const getLikesCount = async (userId: string) => {
  const klychsCount = await db
    .select({ count: count() })
    .from(klychLike)
    .where(getConfition(userId));

  return klychsCount[0]?.count || 0;
};
