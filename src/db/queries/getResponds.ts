import { and, count, desc, eq, type SQL } from "drizzle-orm";
import type { Pagination } from "@/lib/types/pagination";
import { user } from "../authSchema";
import { db } from "../db";
import { type KlychRepondStatus, klych, klychResponds } from "../klychSchema";

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

export const getKlychsRepondsByKlychAuthorId = async (
  authorId: string,
  pagination: Pagination,
  status?: KlychRepondStatus,
) => {
  const condition: SQL[] = [eq(klych.authorId, authorId)];

  if (status) {
    condition.push(eq(klychResponds.status, status));
  }

  return await db
    .select({
      id: klychResponds.id,
      status: klychResponds.status,
      klych,
      responder: {
        id: user.id,
        image: user.image,
        name: user.name,
        surname: user.surname,
      },
    })
    .from(klychResponds)
    .innerJoin(klych, eq(klych.id, klychResponds.klychId))
    .innerJoin(user, eq(user.id, klychResponds.authorId))
    .where(and(...condition))
    .orderBy(desc(klychResponds.createdAt))
    .limit(pagination.itemsPerPage)
    .offset((pagination.page - 1) * pagination.itemsPerPage);
};

export type AuthorsRepond = Awaited<
  ReturnType<typeof getKlychsRepondsByKlychAuthorId>
>[number];

export const getRespondsCount = async (userId: string) => {
  const countOfResponds = await db
    .select({ count: count() })
    .from(klychResponds)
    .where(eq(klychResponds.authorId, userId));

  return countOfResponds[0]?.count || 0;
};

export const getRespondsCountByAuthorId = async (
  authorId: string,
  status?: KlychRepondStatus,
) => {
  const condition: SQL[] = [eq(klych.authorId, authorId)];

  if (status) {
    condition.push(eq(klychResponds.status, status));
  }

  const countOfResponds = await db
    .select({ count: count() })
    .from(klychResponds)
    .innerJoin(klych, eq(klych.id, klychResponds.klychId))
    .where(and(...condition));

  return countOfResponds[0]?.count || 0;
};
