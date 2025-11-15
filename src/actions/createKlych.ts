"use server";

import { headers } from "next/headers";
import { v4 as uuid } from "uuid";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { type Klych, klych as klychTable } from "@/db/klychSchema";
import { meiliClient } from "@/lib/meiliClient";
import { stripTags } from "@/lib/stripTags";

export type KlychCreationPayload = Omit<
  Klych,
  "id" | "authorId" | "createdAt" | "updatedAt" | "status"
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
  const klych = {
    ...data,
    id,
    authorId: user.id,
  };

  await db.insert(klychTable).values(klych);

  const index = meiliClient.index("klych");
  const { waitTask } = index.updateDocuments(
    [
      {
        id: klych.id,
        title: klych.title,
        description: stripTags(klych.description),
        category: klych.category,
        online: klych.online,
        datetimeOfOccurance__timestamp: klych.datetimeOfOccurance.getTime(),
        _geo: klych.location && {
          lat: klych?.location?.x,
          lng: klych.location?.y,
        },
      },
    ],
    { primaryKey: "id" },
  );
  await waitTask();

  return id;
};
