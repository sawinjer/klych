"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { klychLike } from "@/db/klychSchema";

export const getLikes = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return [];
  }

  const likes = await db
    .select({ klychId: klychLike.klychId })
    .from(klychLike)
    .where(eq(klychLike.authorId, user.id));

  return likes.map((like) => like.klychId);
};
