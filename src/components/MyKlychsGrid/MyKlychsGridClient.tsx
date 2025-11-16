"use client";

import type { Klych } from "@/db/klychSchema";
import { CardsGrid } from "../CardsGrid/CardsGrid";
import { mapKlychToCard } from "../LikesGrid/LikesGrid.utils";
import { Pagination } from "@/lib/types/pagination";
import { loadMoreKlychs } from "./MyKlychsGrid.server";

interface Props {
  userId: string;
  totalItems: number;
  initialItems: Klych[];
  finished?: boolean;
}

export const MyKlychsGridClient: React.FC<Props> = (props) => {
  const loadMore = (pagination: Pagination) => {
    return loadMoreKlychs(props.userId, pagination, props.finished);
  };

  return (
    <CardsGrid
      loadMore={loadMore}
      totalItems={props.totalItems}
      initialItems={props.initialItems.map(mapKlychToCard)}
    />
  );
};
