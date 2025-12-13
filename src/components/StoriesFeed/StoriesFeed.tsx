"use client";

import { Search } from "lucide-react";
import type { Hits } from "meilisearch";
import type React from "react";
import { useCallback, useState } from "react";
import { debounce } from "@/lib/debounce";
import { usePromise } from "@/lib/hooks/usePromise";
import { publicMeiliClient } from "@/lib/publicMeiliClient";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import type { StoryFormSubmitResult } from "../StoryForm/StoryForm.interface";
import { StoriesFeedItem } from "./StoriesFeedItem";

export type StoriesResponse = {
  hits: Hits<StoryFormSubmitResult & { id: string }>;
  totalPages: number;
  page: number;
};

interface Props {
  initialResponse: StoriesResponse;
}

export const StoriesFeed: React.FC<Props> = (props) => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState<StoriesResponse>(
    props.initialResponse,
  );
  const [loading, wrap] = usePromise();

  const updateFeed = useCallback(
    debounce(async (search: string) => {
      const index = publicMeiliClient.index("stories");
      const response = await index.search(search, {
        hitsPerPage: 20,
        page: 1,
      });

      setResponse(response as unknown as StoriesResponse);
    }, 300),
    [],
  );

  const loadMore = wrap(async () => {
    const nextPage = (response?.page || 0) + 1;
    const index = publicMeiliClient.index("stories");
    const newResponse = (await index.search(search, {
      hitsPerPage: 20,
      page: nextPage,
    })) as unknown as StoriesResponse;

    setResponse((prevResponse) => {
      if (!prevResponse) {
        return newResponse;
      }

      return {
        ...prevResponse,
        hist: prevResponse.hits.concat(newResponse.hits),
      };
    });
  });

  const handleSearchChange = (search: string) => {
    setSearch(search);
    updateFeed(search);
  };

  const totalPages = response?.totalPages || 0;
  const page = response?.page || 0;

  return (
    <div className="flex flex-col gap-10">
      <Input
        value={search}
        onValueChange={handleSearchChange}
        iconLeft={<Search size={15} />}
        placeholder="Пошук за ключовими словами..."
      />
      {response.hits.map((story) => (
        <StoriesFeedItem key={story.id} story={story} />
      ))}
      {totalPages > page && (
        <Button disabled={loading} onClick={loadMore}>
          Завантажити ще
        </Button>
      )}
    </div>
  );
};
