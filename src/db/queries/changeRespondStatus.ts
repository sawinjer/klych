import { eq } from "drizzle-orm";
import { db } from "../db";
import { type KlychRepondStatus, klychResponds } from "../klychSchema";

export const changeRespondStatus = async (
  respondId: string,
  newStatus: KlychRepondStatus,
) => {
  await db
    .update(klychResponds)
    .set({ status: newStatus })
    .where(eq(klychResponds.id, respondId));
};
