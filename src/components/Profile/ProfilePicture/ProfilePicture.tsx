"use client";

import React, { useEffect, useId, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { fileToDataUrl } from "@/lib/fileToUrl";
import Image from "next/image";

export const ProfilePicture: React.FC = () => {
  const id = useId();
  const [profilePicture, setProfilePicture] = useState<string | undefined>();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setProfilePicture(data?.user?.image || undefined);
    });
  }, []);

  const onFilePick: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    let fileUploaded = false;

    fileToDataUrl(file).then((url) => {
      if (fileUploaded) {
        return;
      }

      setProfilePicture(url);
    });

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-profile-picture", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    fileUploaded = true;
    const url = data.url;
    setProfilePicture(url);
  };

  return (
    <>
      <label
        htmlFor={id}
        className="w-[320px] aspect-square rounded-full border-1 border-white flex justify-center items-center overflow-hidden cursor-pointer"
      >
        {profilePicture ? (
          <Image
            src={profilePicture}
            width={320}
            height={320}
            alt="Картинка користувача"
          />
        ) : (
          <ImageIcon size={83} />
        )}
      </label>
      <input
        className="hidden"
        id={id}
        type="file"
        accept="image/*"
        onChange={onFilePick}
      />
    </>
  );
};
