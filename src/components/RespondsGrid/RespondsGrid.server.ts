"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { type KlychRepondStatus, klych, klychResponds } from "@/db/klychSchema";
import { changeRespondStatus as persistRespondStatus } from "@/db/queries/changeRespondStatus";
import {
  getKlychsRepondsByKlychAuthorId,
  getRespondsCountByAuthorId,
} from "@/db/queries/getResponds";
import type { Pagination } from "@/lib/types/pagination";

export const getRespondsCount = async (status?: KlychRepondStatus) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return 0;
  }

  return await getRespondsCountByAuthorId(session.user.id, status);
};

export const loadMoreAuthorResponds = async (
  pagination: Pagination,
  status?: KlychRepondStatus,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return [];
  }

  const responds = await getKlychsRepondsByKlychAuthorId(
    session.user.id,
    pagination,
    status,
  );

  return responds;
};

export const changeRespondStatus = async (
  respondId: string,
  newStatus: KlychRepondStatus,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return [];
  }

  const responds = await db
    .select({ authorId: klych.authorId })
    .from(klychResponds)
    .innerJoin(klych, eq(klych.id, klychResponds.klychId))
    .where(eq(klychResponds.id, respondId));

  const authorsIds = responds.map((respond) => respond.authorId);

  if (!authorsIds.includes(session.user.id)) {
    throw new Error(
      "Cannot change respond status if you are not an owner of respond",
    );
  }

  await persistRespondStatus(respondId, newStatus);
};
