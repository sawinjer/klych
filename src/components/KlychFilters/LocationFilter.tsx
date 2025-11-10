"use client";

import { useSearchKlych } from "@/providers/SearchKlychProvider/SearchKlychProvider";
import { LocationInput } from "../LocationInput/LocationInput";
import { FilterWithTitle } from "./FilterWithTitle";

export const LocationFilter: React.FC = () => {
  const { setLocation } = useSearchKlych();

  return (
    <FilterWithTitle title="Локація">
      <LocationInput onLocationPick={setLocation} className="w-full" />
    </FilterWithTitle>
  );
};
