"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { isPassowrdValid } from "./SignUpForm.utils";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { addSideEffect } from "@/lib/addSideEffect";
import { usePromise } from "@/lib/hooks/usePromise";
import { authClient } from "@/lib/auth-client";

export const SignUpForm: React.FC = () => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState<string | undefined>();
	const touched = useBoolean();
	const [loading, wrapPromise] = usePromise();

	const alertPasswordError = () => {
		setPasswordError(
			"Мінімум вісім символів, принаймні одна велика літера, одна мала літера, одна цифра та один спеціальний символ:",
		);
	};

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		touched.setTrue();
		if (!isPassowrdValid(password)) {
			alertPasswordError();
			return;
		}

		wrapPromise(
			authClient.signUp.email({
				email,
				password,
				name,
				surname,
			}),
		);
	};

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
			<Input required label="Ім'я" value={name} onValueChange={setName} />
			<Input label="Прізвище" value={surname} onValueChange={setSurname} />
			<Input
				required
				label="Email"
				type="email"
				value={email}
				onValueChange={setEmail}
			/>
			<Input
				required
				label="Пароль"
				type="password"
				error={passwordError}
				value={password}
				onValueChange={addSideEffect(validatePassword, setPassword)}
			/>
			<Button type="submit" disabled={loading}>
				Зареєструватись
			</Button>
		</form>
	);
};
