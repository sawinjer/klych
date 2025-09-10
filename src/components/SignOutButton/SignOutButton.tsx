"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../Button/Button";

export const SignOutButton: React.FC = () => {
	const onClick = () => {
		authClient.signOut();
	};

	return <Button onClick={onClick}>Вийти з аккаунту</Button>;
};
