"use client";

import { usePromise } from "@/lib/hooks/usePromise";
import { RespondsProvider } from "@/providers/RespondsProvider/RespondsProvider";
import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { Button } from "../Button/Button";
import { KlychFeedItem } from "./KlychFeedItem";

export const KlychFeed: React.FC = () => {
  const [loading, wrap] = usePromise();
  const { items, loadMore, hasMoreItems } = useSearchKlych();

  return (
    <RespondsProvider>
      <div className="flex flex-col gap-3 w-full">
        {items.map((item) => (
          <KlychFeedItem key={item.id} klych={item} />
        ))}
        {hasMoreItems && (
          <div className="w-full flex justify-center">
            <Button onClick={wrap(loadMore)} disabled={loading}>
              Завантажити ще!
            </Button>
          </div>
        )}
      </div>
    </RespondsProvider>
  );
};
