import type { Story } from "@/db/storySchema";

export type StoryFormSubmitResult = Omit<
  Story,
  "id" | "authorId" | "createdAt" | "updatedAt"
>;
