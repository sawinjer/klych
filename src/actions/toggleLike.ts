"use server";

import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { v4 as uuid } from "uuid";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { klychLike } from "@/db/klychSchema";

export const toggleLike = async (klychId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("Not signed in user cannot like klychs");
  }

  const like = await db
    .select({ id: klychLike.id })
    .from(klychLike)
    .where(
      and(eq(klychLike.klychId, klychId), eq(klychLike.authorId, user.id)),
    );

  if (like.length) {
    await db.delete(klychLike).where(
      inArray(
        klychLike.id,
        like.map((like) => like.id),
      ),
    );
  } else {
    await db.insert(klychLike).values({
      id: uuid(),
      klychId,
      authorId: user.id,
    });
  }
};
