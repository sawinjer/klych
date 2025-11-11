"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { v4 as uuid } from "uuid";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { klychResponds } from "@/db/klychSchema";

export const createRespond = async (klychId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("Not signed in user cannot respond");
  }

  const prevRespond = await db
    .select({ id: klychResponds.id })
    .from(klychResponds)
    .where(
      and(
        eq(klychResponds.klychId, klychId),
        eq(klychResponds.authorId, user.id),
      ),
    );

  if (prevRespond.length) {
    return;
  }

  const id = uuid();
  await db.insert(klychResponds).values({
    id,
    klychId,
    authorId: user.id,
  });
};
