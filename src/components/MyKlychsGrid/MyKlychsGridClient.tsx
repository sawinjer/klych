"use client";

import { CircleCheck, Megaphone } from "lucide-react";
import { useState } from "react";
import type { Klych } from "@/db/klychSchema";
import { usePromise } from "@/lib/hooks/usePromise";
import type { Pagination } from "@/lib/types/pagination";
import { Button } from "../Button/Button";
import { CardsGrid } from "../CardsGrid/CardsGrid";
import { mapKlychToCard } from "../LikesGrid/LikesGrid.utils";
import {
  fetchMyKlyches,
  fetchMyKlychsCount,
  updateKlychStatus,
} from "./MyKlychsGrid.server";

interface Props {
  onGoingKlychs: Klych[];
  onGoingCount: number;
  finishedKlychs: Klych[];
  finishedKlychsCount: number;
}

export const MyKlychsGridClient: React.FC<Props> = (props) => {
  const [onGoingKlychs, setOnGoingKlychs] = useState(
    props.onGoingKlychs.map(mapKlychToCard),
  );
  const [finishedKlychs, setFinishedKlychs] = useState(
    props.finishedKlychs.map(mapKlychToCard),
  );
  const [onGoingCount, setOnGoingCount] = useState(props.onGoingCount);
  const [finishedKlychsCount, setFinishedKlychsCount] = useState(
    props.finishedKlychsCount,
  );
  const [loading, wrap] = usePromise();

  const finishKlych = wrap(async (id: string) => {
    await updateKlychStatus(id, "finished");
    await refresh();
  });

  const reactivateKlych = wrap(async (id: string) => {
    await updateKlychStatus(id, "active");
    await refresh();
  });

  const refresh = async () => {
    setOnGoingKlychs(await fetchMyKlyches({ page: 1, itemsPerPage: 3 }, false));
    setFinishedKlychs(await fetchMyKlyches({ page: 1, itemsPerPage: 3 }, true));
    setOnGoingCount(await fetchMyKlychsCount(false));
    setFinishedKlychsCount(await fetchMyKlychsCount(true));
  };

  const loadMore = (finished?: boolean) => (pagination: Pagination) => {
    return fetchMyKlyches(pagination, finished);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 text-[36px] font-bold items-center">
        <Megaphone size={32} color="red" /> <h2>Активні Кличі</h2>
      </div>
      <div>
        <CardsGrid
          loadMore={loadMore()}
          totalItems={onGoingCount}
          initialItems={onGoingKlychs}
          cardFooter={(card) => (
            <Button onClick={() => finishKlych(card.id)} disabled={loading}>
              Завершити
            </Button>
          )}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 text-[36px] font-bold items-center">
          <CircleCheck size={32} color="red" /> <h2>Завершені Кличі</h2>
        </div>
        <div>
          <CardsGrid
            loadMore={loadMore(false)}
            totalItems={finishedKlychsCount}
            initialItems={finishedKlychs}
            cardFooter={(card) => (
              <Button
                onClick={() => reactivateKlych(card.id)}
                disabled={loading}
              >
                Активувати
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
};
