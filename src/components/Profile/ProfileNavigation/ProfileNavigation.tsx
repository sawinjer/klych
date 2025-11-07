"use client";

import { Search } from "lucide-react";
import type React from "react";
import { LinkButton } from "@/components/Button/LinkBuntton";
import { SignOutButton } from "@/components/SignOutButton/SignOutButton";

export const ProfileNavigation: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 flex-wrap justify-center">
      <LinkButton icon={<Search />} href="/profile" activeVariant="outlined">
        Мій профіль
      </LinkButton>
      <LinkButton href="/profile/my-klychs" activeVariant="outlined">
        Мої кличі
      </LinkButton>
      <LinkButton href="/profile/saved" activeVariant="outlined">
        Збережені кличі
      </LinkButton>
      <LinkButton href="/profile/rating" activeVariant="outlined">
        Рейтинг
      </LinkButton>
      <LinkButton href="/profile/notifications" activeVariant="outlined">
        Сповіщення
      </LinkButton>
      <SignOutButton />
    </div>
  );
};
