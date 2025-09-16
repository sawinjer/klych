import { useBoolean } from "./useBoolean";

export const usePromise = () => {
  const loading = useBoolean();

  const wrapPromise = (promise: Promise<unknown>) => {
    loading.setTrue();
    promise.finally(loading.setFalse);
  };

  return [loading.state, wrapPromise] as const;
};
