"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { isPassowrdValid } from "./SignUpForm.utils";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { addSideEffect } from "@/lib/addSideEffect";
import { usePromise } from "@/lib/hooks/usePromise";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [signUpError, setSignUpError] = useState<string | undefined>();
  const touched = useBoolean();
  const [loading, wrapPromise] = usePromise();
  const router = useRouter();

  const alertPasswordError = () => {
    setPasswordError(
      "Мінімум вісім символів, принаймні одна велика літера, одна мала літера, одна цифра та один спеціальний символ:",
    );
  };

  const onSubmit: React.FormEventHandler = wrapPromise(async (e) => {
    e.preventDefault();
    touched.setTrue();
    if (!isPassowrdValid(password)) {
      alertPasswordError();
      return;
    }

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      surname,
    });

    if (error) {
      if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        setSignUpError("Користувач з таким email уже існує");
      } else {
        setSignUpError("Не вдалось створити аккаунт через невідому помилку");
      }
    } else {
      router.push("/");
    }
  });

  const validatePassword = (password: string) => {
    if (!touched.state) {
      return;
    }

    if (isPassowrdValid(password)) {
      setPasswordError(undefined);
    } else {
      alertPasswordError();
    }
  };

  return (
    <form className="flex flex-col gap-10 w-full" onSubmit={onSubmit}>
      <Input
        disabled={loading}
        required
        label="Ім'я"
        value={name}
        onValueChange={setName}
      />
      <Input
        disabled={loading}
        label="Прізвище"
        value={surname}
        onValueChange={setSurname}
      />
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
        error={passwordError}
        value={password}
        onValueChange={addSideEffect(validatePassword, setPassword)}
      />
      {signUpError && <p className="text-red-500">{signUpError}</p>}
      <Button type="submit" disabled={loading}>
        Зареєструватись
      </Button>
    </form>
  );
};
