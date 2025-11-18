import { and, eq, sql } from "drizzle-orm";
import type { KlychCategory } from "@/lib/enums/KlychCategory";
import { user } from "../authSchema";
import { db } from "../db";
import { klychResponds, klych as klychTable } from "../klychSchema";

export const getKlychById = async (id: string) => {
  const [klych] = await db
    .select({
      klych: klychTable,
      author: {
        id: user.id,
        name: user.name,
        surname: user.surname,
      },
      respondsCount: sql<number>`COUNT(${klychResponds.id})`.as(
        "respondsCount",
      ),
    })
    .from(klychTable)
    .innerJoin(user, eq(user.id, klychTable.authorId))
    .leftJoin(
      klychResponds,
      and(eq(klychResponds.klychId, id), eq(klychResponds.status, "accepted")),
    )
    .where(eq(klychTable.id, id))
    .groupBy(klychTable.id, user.id);

  if (!klych) {
    return undefined;
  }

  return {
    ...klych.klych,
    category: klych.klych.category as KlychCategory,
    respondsCount: klych.respondsCount,
    author: klych.author,
  };
};
