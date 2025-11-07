"use server";

import { Klych } from "@/db/klychSchema";

type Input = Omit<Klych, "id" | "authorId">;

export const createKlych = async (data: Input) => {
  // data.
};
