"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { authClient } from "@/lib/auth-client";
import { usePromise } from "@/lib/hooks/usePromise";

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, wrapPromise] = usePromise();
  const [signInError, setSignInError] = useState("");
  const router = useRouter();

  const onSubmit: React.FormEventHandler = wrapPromise(async (e) => {
    e.preventDefault();

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
        setSignInError("Неправильний email або пароль");
      } else {
        setSignInError("Не вдалось увійти через невідому помилку");
      }
    } else {
      router.push("/");
    }
  });

  return (
    <form className="flex flex-col gap-10 w-full" onSubmit={onSubmit}>
      <Input
        required
        disabled={loading}
        label="Email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        required
        disabled={loading}
        label="Пароль"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      {signInError && <p className="text-red-500">{signInError}</p>}
      <Button type="submit" disabled={loading}>
        Увійти
      </Button>
      <Link href="/sign-up">Немає аккаунту? Не проблема! Тицяй тут</Link>
    </form>
  );
};
