import makeGeoCodingClient from "@mapbox/mapbox-sdk/services/geocoding";
import { useCallback, useState } from "react";
import { debounce } from "../debounce";
import { mapboxClient } from "../mapboxClient";

export interface LocationSuggestion {
  name: string;
  lat: number;
  lng: number;
}

const mockSuggestions = new Array(10).fill("").map((_, index) => ({
  name: `Place - ${index + 1}`,
  lat: 5 * index,
  lng: 8 * index,
}));

const client = makeGeoCodingClient(mapboxClient);

export const useLocationAutoComplete = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  const checkForSuggestions = useCallback(
    debounce(async (query: string) => {
      const response = await client
        .forwardGeocode({
          query,
          autocomplete: true,
          limit: 5,
          language: ["uk"],
          countries: ["ua"],
        })
        .send();

      setSuggestions(
        response.body.features.map((feature) => ({
          name: feature.place_name,
          lng: feature.center[0],
          lat: feature.center[1],
        })),
      );
    }, 500),
    [],
  );

  const hideSuggestions = () => {
    setSuggestions([]);
  };

  const onValueChange: React.Dispatch<
    React.SetStateAction<string | undefined>
  > = (change) => {
    setValue((prevValue) => {
      const newValue =
        typeof change === "string" ? change : change?.(prevValue);

      if (newValue) {
        checkForSuggestions(newValue);
      }

      return newValue;
    });
  };

  return {
    value,
    setValue,
    changeValue: onValueChange,
    suggestions,
    hideSuggestions,
  };
};
