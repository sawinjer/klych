"use server";

import { v4 } from "uuid";
import type { StoryFormSubmitResult } from "@/components/StoryForm/StoryForm.interface";
import { db } from "@/db/db";
import { story as storyTable } from "@/db/storySchema";
import { UserRole } from "@/lib/enums/UserRole";
import { getUserInServer } from "@/lib/getUserInServer";
import { meiliClient } from "@/lib/meiliClient";

export const createStory = async (story: StoryFormSubmitResult) => {
  const user = await getUserInServer();

  if (!user || user.role !== UserRole.Admin) {
    return;
  }

  const id = v4();
  await db.insert(storyTable).values({
    id,
    authorId: user.id,
    ...story,
  });

  const index = meiliClient.index("stories");
  const { waitTask } = index.updateDocuments([{ ...story, id }], {
    primaryKey: "id",
  });
  await waitTask();

  return id;
};
