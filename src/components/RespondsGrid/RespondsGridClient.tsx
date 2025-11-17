"use client";

import { useCallback, useRef, useState } from "react";
import type { KlychRepondStatus } from "@/db/klychSchema";
import type { AuthorsRepond } from "@/db/queries/getResponds";
import { debounce } from "@/lib/debounce";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { usePromise } from "@/lib/hooks/usePromise";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  changeRespondStatus,
  getRespondsCount,
  loadMoreAuthorResponds,
} from "./RespondsGrid.server";
import { RespondGridItem } from "./RespondsGridItem";

interface Props {
  totalReponds: number;
  initialReponds: AuthorsRepond[];
}

export const RepondsGridClient: React.FC<Props> = (props) => {
  const page = useRef(1);
  const [responds, setResponds] = useState(props.initialReponds);
  const [totalItems, setTotalItems] = useState(props.totalReponds);
  const [loadingStatusChange, wrapStatusChange] = usePromise();
  const [loadMoreLoading, wrapLoadMore] = usePromise();
  const showOnlyPendingResponds = useBoolean(false);

  const refreshResponds = useCallback(
    debounce(async (showOnlyPending: boolean) => {
      page.current = 1;
      const status = showOnlyPending ? "pending" : undefined;
      const responds = await loadMoreAuthorResponds(
        {
          page: page.current,
          itemsPerPage: 5,
        },
        status,
      );
      const count = await getRespondsCount(status);

      setResponds(responds);
      setTotalItems(count);
    }, 300),
    [],
  );

  const onChangeShowOnlyPendingResponds = () => {
    const newValue = !showOnlyPendingResponds.state;
    showOnlyPendingResponds.setState(newValue);
    refreshResponds(newValue);
  };

  const setRespondStatus = (respondId: string, newStatus: KlychRepondStatus) =>
    wrapStatusChange(async () => {
      try {
        await changeRespondStatus(respondId, newStatus);
        setResponds((responds) =>
          responds.map((respond) => {
            if (respond.id === respondId) {
              return {
                ...respond,
                status: newStatus,
              };
            }

            return respond;
          }),
        );
      } catch (err) {
        console.error(err);
      }
    });

  const loadMore = wrapLoadMore(async () => {
    page.current += 1;
    const newResponds = await loadMoreAuthorResponds({
      page: page.current,
      itemsPerPage: 5,
    });

    setResponds((prevResponds) => prevResponds.concat(newResponds));
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Checkbox
          label="Показувати тільки відгуки що чекаю на рішення"
          value={showOnlyPendingResponds.state}
          onToggle={onChangeShowOnlyPendingResponds}
        />
      </div>
      <ul>
        {responds.map((respond) => (
          <RespondGridItem
            key={respond.id}
            respond={respond}
            disabled={loadingStatusChange}
            onAccept={setRespondStatus(respond.id, "accepted")}
            onReject={setRespondStatus(respond.id, "declined")}
          />
        ))}
      </ul>
      {totalItems > responds.length && (
        <div className="flex justify-center">
          <Button disabled={loadMoreLoading} onClick={loadMore}>
            Завантажити ще
          </Button>
        </div>
      )}
    </div>
  );
};
