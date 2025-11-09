"use client";

import {
  type LocationSuggestion,
  useLocationAutoComplete,
} from "@/lib/hooks/useLocationAutoComplete";
import { Input } from "../Input/Input";
import type { InputProps } from "../Input/Input.types";

type Props = Omit<
  InputProps<LocationSuggestion>,
  "value" | "onValueChange" | "onSuggestionPick" | "suggestions"
> & {
  onLocationPick: (location: LocationSuggestion) => void;
};

export const LocationInput: React.FC<Props> = (props) => {
  const { value, setValue, changeValue, hideSuggestions, suggestions } =
    useLocationAutoComplete();
  const { onLocationPick, ...rest } = props;

  const onSuggestionPick = (suggestion: LocationSuggestion) => {
    setValue(suggestion.name);
    hideSuggestions();
    onLocationPick(suggestion);
  };

  return (
    <Input
      value={value || ""}
      onValueChange={changeValue}
      onSuggestionPick={onSuggestionPick}
      suggestions={suggestions}
      {...rest}
    />
  );
};
