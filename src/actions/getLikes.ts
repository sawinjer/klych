"use server";

import { headers } from "next/headers";
import { auth } from "@/auth";
import { getLikes as queryLikes } from "@/db/queries/getLikes";

export const getLikes = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return [];
  }

  const likes = await queryLikes(user.id);

  return likes.map((like) => like.klychId);
};
