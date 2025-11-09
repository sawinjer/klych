import { useState } from "react";

export const useNumericState = (initialValue?: number) => {
  const [value, setValue] = useState(initialValue);

  const onValueChange: React.Dispatch<
    React.SetStateAction<number | string | undefined>
  > = (change) => {
    setValue((prevValue) => {
      const newValue =
        typeof change === "function" ? change(prevValue) : change;

      if (newValue === undefined || newValue === "") {
        return undefined;
      }

      if (typeof newValue === "number") {
        return newValue;
      }

      const valueParsed = parseInt(newValue, 10);

      if (Number.isNaN(valueParsed) || valueParsed <= 0) {
        return prevValue;
      }

      return valueParsed;
    });
  };

  return [value, onValueChange] as const;
};
