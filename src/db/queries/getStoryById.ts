import { eq } from "drizzle-orm";
import { user } from "../authSchema";
import { db } from "../db";
import { story as storyTable } from "../storySchema";

export const getStoryById = async (id: string) => {
  const [result] = await db
    .select({
      story: storyTable,
      author: {
        id: user.id,
        name: user.name,
        surname: user.surname,
      },
    })
    .from(storyTable)
    .innerJoin(user, eq(user.id, storyTable.authorId))
    .where(eq(storyTable.id, id));

  if (!result) {
    return undefined;
  }

  return {
    ...result.story,
    author: result.author,
  };
};
