"use client";
import Image from "next/image";
import Link from "next/link";
import type { AuthorsRepond } from "@/db/queries/getResponds";
import { Button } from "../Button/Button";

interface Props {
  respond: AuthorsRepond;
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export const RespondGridItem: React.FC<Props> = (props) => {
  const { respond } = props;
  const profilePicture = respond.responder.image;
  const responderName = [respond.responder.name, respond.responder.surname]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      key={respond.id}
      className="flex flex-col gap-2 border-b-1 border-b-white flex-wrap pb-2"
    >
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          {profilePicture && (
            <Image
              width={50}
              height={50}
              className="rounded-full"
              src={profilePicture}
              alt="Картинка профілю"
            />
          )}
          <p className="max-w-[fit-content] w-full">{responderName}</p>
        </div>
        <p>відгукнувся (відгукнулась) на клич</p>
        <Link className="underline" href={`/klych/${respond.klych.id}`}>
          {respond.klych.title}
        </Link>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant={respond.status === "accepted" ? "contained" : "outlined"}
          disabled={props.disabled}
          onClick={props.onAccept}
        >
          Прийняти
        </Button>
        <Button
          variant={respond.status === "declined" ? "contained" : "outlined"}
          disabled={props.disabled}
          onClick={props.onReject}
        >
          Відхилити
        </Button>
      </div>
    </li>
  );
};
