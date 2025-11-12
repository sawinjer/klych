import React, { useContext, useEffect, useState } from "react";
import { getLikes } from "@/actions/getLikes";
import { toggleLike as persistLikeToggle } from "@/actions/toggleLike";
import { usePromise } from "@/lib/hooks/usePromise";
import { toggleInArray } from "@/lib/toggleInArray";
import type { LikesContextValue } from "./LikesProvider.interface";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const LikesContext = React.createContext<LikesContextValue>(null!);

export const LikesProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [likes, setLikes] = useState<string[]>([]);
  const [loading, wrap] = usePromise();

  const fetLikes = wrap(async () => {
    const likes = await getLikes();
    setLikes(likes);
  });

  const toggleLike = wrap(async (klychId: string) => {
    setLikes((prevLikes) => {
      const newLikes = toggleInArray(prevLikes).item(klychId);

      return newLikes;
    });

    await persistLikeToggle(klychId);
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetLikes();
  }, []);

  const value: LikesContextValue = {
    likes,
    loading,
    toggleLike,
  };

  return (
    <LikesContext.Provider value={value}>
      {props.children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);
