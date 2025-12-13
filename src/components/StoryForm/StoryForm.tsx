"use client";

import type React from "react";
import { useState } from "react";
import "react-datetime/css/react-datetime.css";
import { usePromise } from "@/lib/hooks/usePromise";
import { Button } from "../Button/Button";
import { ImageUploadButton } from "../ImageUploadButton/ImageUploadButton";
import { Input } from "../Input/Input";
import { TextEditor } from "../TextEditor/TextEditor";
import type { StoryFormSubmitResult } from "./StoryForm.interface";

interface Props {
  initialValue?: StoryFormSubmitResult;
  title: string;
  onSubmit: (payload: StoryFormSubmitResult) => Promise<void>;
}

export const StoryForm: React.FC<Props> = (props) => {
  const initialValue = props.initialValue;

  const [loading, wrapSubmit] = usePromise();
  const [coverImage, setCoverImage] = useState<string | undefined>(
    initialValue?.coverImage,
  );
  const [title, setTitle] = useState(initialValue?.title || "");
  const [category, setCategory] = useState(initialValue?.category || "");
  const [description, setDescription] = useState(
    initialValue?.description || "",
  );

  const hasAllRequiredData = [title, coverImage, category, description].every(
    (item) => !!item,
  );

  const onSubmit: React.FormEventHandler = wrapSubmit(async (e) => {
    e.preventDefault();

    if (!hasAllRequiredData) {
      return;
    }

    const story = {
      title,
      description,
      coverImage,
      category,
    };

    props.onSubmit(story as StoryFormSubmitResult);
  });

  return (
    <form
      className="flex flex-col items-center gap-4 max-w-[800px] w-full overflow-auto"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl">{props.title}</h1>
      <ImageUploadButton
        alt="Обкладинка історії"
        uploadScale={2}
        width={550}
        height={390}
        onUploadDone={setCoverImage}
      />
      <Input
        label="Заголовок"
        name="title"
        required
        value={title}
        onValueChange={setTitle}
      />
      <Input
        label="Категорія"
        name="category"
        required
        value={category}
        onValueChange={setCategory}
      />
      <TextEditor onValueChange={setDescription} />
      <div className="w-full flex justify-end">
        <Button
          type="submit"
          className="w-fit"
          disabled={!hasAllRequiredData || loading}
        >
          Підтвердити
        </Button>
      </div>
    </form>
  );
};
