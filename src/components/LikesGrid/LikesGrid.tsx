"use server";

import { Heart } from "lucide-react";
import { getLikesCount, getLikesWithKlychs } from "@/db/queries/getLikes";
import { LikesGridClient } from "./LikesGridClient";

interface Props {
  userId: string;
}

export const LikesGrid: React.FC<Props> = async (props) => {
  const likes = await getLikesWithKlychs(props.userId, {
    page: 1,
    itemsPerPage: 3,
  });
  const totalLikes = await getLikesCount(props.userId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 text-[36px] font-bold items-center">
        <Heart size={32} color="red" /> <h2>Вподобані кличі</h2>
      </div>
      <LikesGridClient
        userId={props.userId}
        totalItems={totalLikes}
        initialLikes={likes.map((like) => like.klych)}
      />
    </div>
  );
};
