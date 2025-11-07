import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { authClient } from "@/lib/auth-client";
import type { Gender } from "@/lib/enums/Gender";
import { useUpdateUser } from "@/lib/hooks/useUpdateUser";
import { gendersOptions } from "./ProfileDetails.utils";

export const ProfileDetails: React.FC = () => {
  const [shortInfo, setShortInfo] = useState<string>();
  const [gender, setGender] = useState<Gender>();
  const [age, setAge] = useState<number>();
  const [placeOfVolunteering, setPlaceOfVolunteering] = useState<string>();
  const [placeOfWork, setPlaceOfWork] = useState<string>();
  const updateUser = useUpdateUser();

  const onShortInfoUpdate = (info: string) => {
    updateUser({ shortInfo: info });
    setShortInfo(info);
  };

  const onGenderUpdate = (gender: string | undefined) => {
    updateUser({ gender });
    setGender(gender as Gender);
  };

  const onPlaceOfVolunteeringUpdate = (place: string | undefined) => {
    updateUser({ placeOfVolunteering: place });
    setPlaceOfVolunteering(place);
  };

  const onPlaceOfWorkUpdate = (place: string | undefined) => {
    updateUser({ placeOfWork: place });
    setPlaceOfWork(place);
  };

  const onAgeInput = (value: string) => {
    if (!value.length) {
      setAge(undefined);
      updateUser({ age: undefined });
    }

    const valueParsed = parseInt(value, 10);

    if (Number.isNaN(valueParsed) || valueParsed <= 0) {
      return;
    }

    setAge(valueParsed);
    updateUser({ age: valueParsed });
  };

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      const { gender, age, placeOfVolunteering, placeOfWork, shortInfo } =
        data?.user || {};

      setShortInfo(shortInfo || undefined);
      setGender((gender as Gender) || undefined);
      setAge(age || undefined);
      setPlaceOfVolunteering(placeOfVolunteering || undefined);
      setPlaceOfWork(placeOfWork || undefined);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Короткий опис"
        value={shortInfo || ""}
        onValueChange={onShortInfoUpdate}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input value={age || ""} onValueChange={onAgeInput} label="Вік" />
        <Select
          label="Cтать"
          value={gender || ""}
          options={gendersOptions}
          onValueChange={onGenderUpdate}
        />
        <Input
          label="Місце волонтерки"
          value={placeOfVolunteering || ""}
          onValueChange={onPlaceOfVolunteeringUpdate}
        />
        <Input
          label="Місце роботи"
          value={placeOfWork || ""}
          onValueChange={onPlaceOfWorkUpdate}
        />
      </div>
    </div>
  );
};
