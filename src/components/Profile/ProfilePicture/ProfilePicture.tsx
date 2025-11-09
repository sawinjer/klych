"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ImageUploadButton } from "@/components/ImageUploadButton/ImageUploadButton";
import { authClient } from "@/lib/auth-client";

export const ProfilePicture: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | undefined>();

  const onUploadDone = (url: string) => {
    authClient.updateUser({
      image: url,
    });
  };

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setProfilePicture(data?.user?.image || undefined);
    });
  }, []);

  return (
    <ImageUploadButton
      imageUrl={profilePicture}
      onUploadDone={onUploadDone}
      width={320}
      height={320}
      alt="Картинка профілю"
    />
  );
};
