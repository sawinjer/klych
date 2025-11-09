"use server";

import { headers } from "next/headers";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { type Klych, klych } from "@/db/klychSchema";
import { v4 as uuid } from "uuid";

export type KlychCreationPayload = Omit<
  Klych,
  "id" | "authorId" | "createdAt" | "updatedAt"
>;

export const createKlych = async (data: KlychCreationPayload) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    throw new Error("Not signed in user cannot create klych");
  }

  const id = uuid();

  await db.insert(klych).values({
    ...data,
    id,
    authorId: user.id,
  });

  return id;
};
