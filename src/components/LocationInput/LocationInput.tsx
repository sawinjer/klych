"use client";

import { useLocationAutoComplete } from "@/lib/hooks/useLocationAutoComplete";
import { Input } from "../Input/Input";

export const LocationInput: React.FC = () => {
  const { value, setValue, suggestions } = useLocationAutoComplete();

  return (
    <>
      <Input value={value || ""} onValueChange={setValue} />
      <pre>{JSON.stringify(suggestions, null, 2)}</pre>
    </>
  );
};
