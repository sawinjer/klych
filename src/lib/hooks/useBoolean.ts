import { useCallback, useState } from "react";

export const useBoolean = (defaultState?: boolean) => {
  const [state, setState] = useState(defaultState || false);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return { state, toggle, setTrue, setFalse };
};
