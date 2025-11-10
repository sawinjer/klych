"use client";

import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { KlychFeedItem } from "./KlychFeedItem";

export const KlychFeed: React.FC = () => {
  const { items } = useSearchKlych();

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item) => (
        <KlychFeedItem key={item.id} klych={item} />
      ))}
    </div>
  );
};
