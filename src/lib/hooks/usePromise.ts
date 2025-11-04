import { useBoolean } from "./useBoolean";

export const usePromise = () => {
  const loading = useBoolean();

  const wrapPromise = <I extends unknown[], R>(
    promise: (...args: I) => Promise<R>,
  ): ((...args: I) => Promise<R>) => {
    return async (...args) => {
      loading.setTrue();
      try {
        return promise(...args);
      } finally {
        loading.setFalse();
      }
    };
  };

  return [loading.state, wrapPromise] as const;
};
