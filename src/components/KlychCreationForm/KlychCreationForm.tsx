"use client";

import type React from "react";
import { useState } from "react";
import "react-datetime/css/react-datetime.css";
import { createKlych, type KlychCreationPayload } from "@/actions/createKlych";
import type { KlychCategory } from "@/lib/enums/KlychCategory";
import type { LocationSuggestion } from "@/lib/hooks/useLocationAutoComplete";
import { useNumericState } from "@/lib/hooks/useNumericState";
import { Button } from "../Button/Button";
import { ImageUploadButton } from "../ImageUploadButton/ImageUploadButton";
import { Input } from "../Input/Input";
import { LocationInput } from "../LocationInput/LocationInput";
import { Select } from "../Select/Select";
import { KlychCategorySelect } from "./KlychCategorySelect";
import { Calendar24 } from "../ui/datepicker";
import { TextEditor } from "../TextEditor/TextEditor";
import { usePromise } from "@/lib/hooks/usePromise";
import { useRouter } from "next/navigation";

export const KlychCreationForm: React.FC = () => {
  const [loading, wrapSubmit] = usePromise()
  const [coverImage, setCoverImage] = useState<string>();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<KlychCategory>();
  const [format, setFormat] = useState("");
  const [requiredPeoplesAmount, setRequiredPeoplesAmount] = useNumericState();
  const [location, setLocation] = useState<LocationSuggestion>();
  const [klychDate, setKlychDate] = useState<Date>();
  const [description, setDescription] = useState("");
  const router = useRouter();

  const hasAllRequiredData = [
    title,
    coverImage,
    category,
    format,
    location,
    klychDate,
    description,
  ].every((item) => !!item);

  const onSubmit: React.FormEventHandler = wrapSubmit(async (e) => {
    e.preventDefault();
    const locationXY = location ? { x: location.lat, y: location.lng } : null;

    if (!hasAllRequiredData) {
      return;
    }

    const klych: KlychCreationPayload = {
      title,
      description: description as string,
      coverImage: coverImage as string,
      category: category as string,
      online: format === "online",
      requiredPeoplesAmount: requiredPeoplesAmount?.toString() || null,
      locationName: location?.name || null,
      location: locationXY,
      datetimeOfOccurance: klychDate as Date,
    };

    const id = await createKlych(klych);
    router.push(`/klych/${id}`);
  });

  return (
    <form
      className="flex flex-col gap-4 max-w-[800px] w-full"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl">Створення клича</h1>
      <ImageUploadButton
        alt="Обкладинка клича"
        width={800}
        height={450}
        onUploadDone={setCoverImage}
      />
      <Input
        label="Заголовок"
        name="title"
        required
        value={title}
        onValueChange={setTitle}
      />
      <div className="flex gap-4">
        <KlychCategorySelect
          required
          name="category"
          value={category}
          onValueChange={setCategory}
        />
        <Select
          name="format"
          required
          label="Формат"
          value={format}
          options={[
            { value: "ofline", label: "Офлайн" },
            { value: "online", label: "Онлайн" },
          ]}
          onValueChange={setFormat}
        />
        <Input
          name="max_members"
          label="Скільки потрібно людей"
          className="w-full"
          value={requiredPeoplesAmount || ""}
          onValueChange={setRequiredPeoplesAmount}
        />
      </div>
      <LocationInput
        required
        name="location"
        label="Місце проведення"
        onLocationPick={setLocation}
      />
      <Calendar24 date={klychDate} onDateChange={setKlychDate} />
      <TextEditor onValueChange={setDescription} />
      <div className="flex justify-end">
        <Button type="submit" className="w-fit" disabled={!hasAllRequiredData || loading}>
          Опублікувати
        </Button>
      </div>
    </form>
  );
};
