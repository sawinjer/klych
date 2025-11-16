"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LinkButton } from "../Button/LinkBuntton";
import { Logo } from "../Logo/Logo";

export const Header: React.FC = () => {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  return (
    <header className="flex gap-8 items-center justify-center">
      <Logo />
      <nav className="flex gap-8">
        <Link href="/klychi">Кличі</Link>
        <Link href="/request">Кинути клич</Link>
        <Link href="/stories">Історії</Link>
        <Link href="/partners">Партнерам</Link>
        <Link href="/about-us">Про нас</Link>
        <Link href="/rating">Рейтинг</Link>
        <Link href="/support">Підтримати</Link>
      </nav>
      {!isPending && !session && (
        <LinkButton href="/sign-up">Стати своїм</LinkButton>
      )}
      {!isPending && !!session && (
        <Link href="/profile">Привіт {session.user.name}!</Link>
      )}
    </header>
  );
};
