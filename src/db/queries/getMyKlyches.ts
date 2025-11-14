import { and, count, desc, eq } from "drizzle-orm";
import type { Pagination } from "@/lib/types/pagination";
import { db } from "../db";
import { klych } from "../klychSchema";

const getCondition = (userId: string, finished?: boolean) => {
  const userCondition = eq(klych.authorId, userId);
  if (finished !== undefined) {
    return and(
      userCondition,
      eq(klych.status, finished ? "finished" : "active"),
    );
  }

  return userCondition;
};
export const getMyKlyches = async (
  userId: string,
  pagination: Pagination,
  finished?: boolean,
) => {
  const klychs = await db
    .select()
    .from(klych)
    .where(getCondition(userId, finished))
    .orderBy(desc(klych.createdAt))
    .limit(pagination.itemsPerPage)
    .offset((pagination.page - 1) * pagination.itemsPerPage);

  return klychs;
};

export const getMyKlychesCount = async (userId: string, finished?: boolean) => {
  const response = await db
    .select({ count: count() })
    .from(klych)
    .where(getCondition(userId, finished));

  return response[0]?.count || 0;
};
