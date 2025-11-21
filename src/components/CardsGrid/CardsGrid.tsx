"use client";

import { useRef } from "react";
import { usePromise } from "@/lib/hooks/usePromise";
import { useWeakState } from "@/lib/hooks/useWeakState";
import type { Pagination } from "@/lib/types/pagination";
import { Button } from "../Button/Button";
import { Card } from "./Card";
import type { CardData } from "./CardsGrid.interface";

interface Props {
  initialItems: CardData[];
  totalItems: number;
  cardFooter?: (card: CardData) => React.ReactNode | undefined;
  loadMore: (pagination: Pagination) => Promise<CardData[]>;
}

export const CardsGrid: React.FC<Props> = (props) => {
  const [cards, setCards] = useWeakState(props.initialItems);
  const [loading, wrap] = usePromise();
  const page = useRef(1);

  const loadMore = wrap(async () => {
    page.current += 1;
    const newCards = await props.loadMore({
      page: page.current,
      itemsPerPage: 3,
    });
    setCards((prevCards) => (prevCards || []).concat(newCards));
  });

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="grid grid-cols-3 gap-10 w-full max-h-[700px] overflow-auto">
        {cards?.map((card) => (
          <Card key={card.id} card={card} footer={props.cardFooter?.(card)} />
        ))}
      </div>
      {props.totalItems > (cards?.length || 0) && (
        <Button disabled={loading} onClick={loadMore}>
          Завантажити ще
        </Button>
      )}
    </div>
  );
};
