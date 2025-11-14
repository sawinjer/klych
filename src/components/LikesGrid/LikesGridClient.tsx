"use client";

import type { Klych } from "@/db/klychSchema";
import { CardsGrid } from "../CardsGrid/CardsGrid";
import type { CardData } from "../CardsGrid/CardsGrid.interface";
import { loadMoreLikes } from "./LikesGrid.server.utils";
import { mapKlychToCard } from "./LikesGrid.utils";

interface Props {
  userId: string;
  totalItems: number;
  initialLikes: Klych[];
}

export const LikesGridClient: React.FC<Props> = (props) => {
  const initialItems = props.initialLikes.map<CardData>(mapKlychToCard);

  return (
    <CardsGrid
      totalItems={props.totalItems}
      initialItems={initialItems}
      loadMore={(pagination) => loadMoreLikes(props.userId, pagination)}
    />
  );
};
