"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../Button/Button";
import { usePromise } from "@/lib/hooks/usePromise";
import { useRouter } from "next/navigation";

export const SignOutButton: React.FC = () => {
  const [loading, wrap] = usePromise();
  const router = useRouter();

  const onSignout = wrap(async () => {
    await authClient.signOut();
    router.push("/");
  });

  return (
    <div>
      <Button onClick={onSignout} disabled={loading}>
        Вийти з аккаунту
      </Button>
    </div>
  );
};
