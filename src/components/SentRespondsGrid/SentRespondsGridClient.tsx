"use client";

import type { Pagination } from "@/lib/types/pagination";
import { CardsGrid } from "../CardsGrid/CardsGrid";
import { loadMoreResponds } from "./SentRespondsGrid.server";
import { mapRespondToCard, type Respond } from "./SentRespondsGrid.utils";

interface Props {
  userId: string;
  totalItems: number;
  initialResponds: Respond[];
}

export const SentRespondsGridClient: React.FC<Props> = (props) => {
  const loadMore = (pagination: Pagination) => {
    return loadMoreResponds(props.userId, pagination);
  };

  return (
    <CardsGrid
      initialItems={props.initialResponds.map(mapRespondToCard)}
      totalItems={props.totalItems}
      loadMore={loadMore}
    />
  );
};
