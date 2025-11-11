"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { klychResponds } from "@/db/klychSchema";

export const getResponds = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("Not signed in user cannot retrive responses");
  }

  const responses = await db
    .select({
      id: klychResponds.klychId,
    })
    .from(klychResponds)
    .where(eq(klychResponds.authorId, user.id));

  return responses.map((response) => response.id);
};
