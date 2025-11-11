"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { authClient } from "@/lib/auth-client";
import { useRespond } from "@/providers/RespondsProvider/RespondsProvider";
import { Button } from "../Button/Button";

interface Props {
  klychId: string;
  authorId: string;
  onRespond?: () => void;
}

export const RespondButton: React.FC<Props> = (props) => {
  const { isPending, data } = authClient.useSession();
  const router = useRouter();
  const { respond, responds, loading } = useRespond();

  const klychBelongsToCurrentUser = data?.user.id === props.authorId;
  const alreadyResponded = responds.includes(props.klychId);
  const disabled =
    alreadyResponded || klychBelongsToCurrentUser || isPending || loading;

  let tooltip: string | undefined;

  if (klychBelongsToCurrentUser) {
    tooltip = "Ви не можете відгукнутися на власний клич";
  }

  if (alreadyResponded) {
    tooltip = "Ви уже надіслали заявку";
  }

  const onClick = () => {
    if (!data) {
      router.push(
        `/sign-in?callback=${encodeURIComponent(`/klych/${props.klychId}`)}`,
      );

      return;
    }

    respond(props.klychId).then(() => {
      props.onRespond?.();
    });
  };

  return (
    <Button
      variant={alreadyResponded ? "outlined" : "contained"}
      tooltip={tooltip}
      disabled={disabled}
      onClick={onClick}
    >
      Відгукнутися
    </Button>
  );
};
