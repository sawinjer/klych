import React, { useContext, useEffect, useState } from "react";
import { createRespond } from "@/actions/createRespond";
import { getResponds } from "@/actions/getResponds";
import { usePromise } from "@/lib/hooks/usePromise";
import type { RespondsContextValue } from "./RespondsProvider.interface";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const RespondsContext = React.createContext<RespondsContextValue>(null!);

export const RespondsProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [responds, setResponds] = useState<string[]>([]);
  const [loading, wrap] = usePromise();

  const fetchResponds = wrap(async () => {
    const responds = await getResponds();
    setResponds(responds);
  });

  const respond = wrap(async (klychId: string) => {
    if (responds.includes(klychId)) {
      return;
    }

    await createRespond(klychId);

    setResponds((prev) => [...prev, klychId]);
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchResponds();
  }, []);

  const value: RespondsContextValue = {
    responds,
    loading,
    respond,
  };

  return (
    <RespondsContext.Provider value={value}>
      {props.children}
    </RespondsContext.Provider>
  );
};

export const useRespond = () => useContext(RespondsContext);
