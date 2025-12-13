"use client";

import { useRouter } from "next/navigation";
import { createStory } from "@/actions/createStory";
import { StoryForm } from "./StoryForm";
import type { StoryFormSubmitResult } from "./StoryForm.interface";

export const StoryCreationForm: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (story: StoryFormSubmitResult) => {
    const id = await createStory(story);

    if (id) {
      router.push(`/stories/${id}`);
    }
  };

  return <StoryForm title="Створення історії" onSubmit={onSubmit} />;
};
