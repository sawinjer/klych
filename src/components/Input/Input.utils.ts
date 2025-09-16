import { cx } from "@/lib/cx";
import { useBoolean } from "@/lib/hooks/useBoolean";
import { useId, useState } from "react";

export const useInputId = (originalId?: string) => {
  const backupId = useId();

  if (originalId) {
    return originalId;
  }

  return backupId;
};

export const useHasValue = (initialHasValue?: boolean) => {
  const [hasValue, setHasValue] = useState(initialHasValue);

  const onInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setHasValue(Boolean(target.value));
  };

  return [!!hasValue, onInput] as const;
};

export const useLabelStyles = (focused: boolean, hasValue: boolean) => {
  return cx(
    "absolute transition-all",
    focused || hasValue
      ? "top-1 left-2"
      : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
  );
};
