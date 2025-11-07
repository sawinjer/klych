"use client";

import {
  type LocationSuggestion,
  useLocationAutoComplete,
} from "@/lib/hooks/useLocationAutoComplete";
import { Input } from "../Input/Input";

interface Props {
  onLocationPick: (location: LocationSuggestion) => void;
}

export const LocationInput: React.FC<Props> = (props) => {
  const { value, setValue, changeValue, hideSuggestions, suggestions } =
    useLocationAutoComplete();

  const onSuggestionPick = (suggestion: LocationSuggestion) => {
    setValue(suggestion.name);
    hideSuggestions();
    props.onLocationPick(suggestion);
  };

  return (
    <div className="relative">
      <Input
        value={value || ""}
        onValueChange={changeValue}
        onSuggestionPick={onSuggestionPick}
        suggestions={suggestions}
      />
    </div>
  );
};
