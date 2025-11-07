import { useCallback } from "react";
import { authClient } from "../auth-client";
import { debounce } from "../debounce";

export const useUpdateUser = (delay = 300) => {
  return  useCallback(
    debounce(async (...args: Parameters<typeof authClient.updateUser>) => {
      await authClient.updateUser(...args);
    }, delay),
    [],
  );
}
