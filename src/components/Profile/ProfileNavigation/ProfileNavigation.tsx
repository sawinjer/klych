"use client";

import { Megaphone, Search, User } from "lucide-react";
import type React from "react";
import { LinkButton } from "@/components/Button/LinkBuntton";
import { SignOutButton } from "@/components/SignOutButton/SignOutButton";

export const ProfileNavigation: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 flex-wrap justify-center">
      <LinkButton icon={<Search />} href="/profile" activeVariant="outlined">
        Моя стрічка
      </LinkButton>
      <LinkButton
        icon={<User />}
        href="/profile/my-info"
        activeVariant="outlined"
      >
        Профіль
      </LinkButton>
      <LinkButton
        icon={<Megaphone />}
        href="/profile/my-klychs"
        activeVariant="outlined"
      >
        Мої кличі
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
