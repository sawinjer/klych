"use client";

import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { debounce } from "@/lib/debounce";
import { publicMeiliClient } from "@/lib/publicMeiliClient";
import type {
  KlychSearchResult,
  SearchKlychContextValue,
  SearchKlychFilter,
  SetState,
} from "./SearchKlychProvider.interface";
import {
  getSorting,
  mapFilterObjectToStringQuery,
} from "./SearchKlychProvider.utils";

// biome-ignore lint/style/noNonNullAssertion: <If no context, the should be an error>
const SearchKlychContext = createContext<SearchKlychContextValue>(null!);
type Response = {
  hits: KlychSearchResult[];
  totalPages: number;
  page: number;
};

export const SearchKlychProvider: React.FC<React.PropsWithChildren> = (
  props,
) => {
  const [filter, setFilter] = useState<SearchKlychFilter>({
    search: "",
    categories: [],
  });
  const [response, setResponse] = useState<Response>();

  const makeSearch = useCallback(
    debounce(async (filter: SearchKlychFilter, page: number) => {
      const index = publicMeiliClient.index("klych");
      const response = await index.search(filter.search, {
        hitsPerPage: 20,
        page,
        filter: mapFilterObjectToStringQuery(filter),
        sort: getSorting(filter),
      });

      setResponse(response as unknown as Response);
    }, 300),
    [],
  );

  const updateFilterField =
    <K extends keyof SearchKlychFilter>(
      field: K,
    ): SetState<SearchKlychFilter[K]> =>
    (change) => {
      setFilter((prevFilter) => {
        const newValueForField =
          typeof change === "function" ? change(prevFilter[field]) : change;

        const newFilter = {
          ...prevFilter,
          [field]: newValueForField,
        };

        makeSearch(newFilter, 1);

        return newFilter;
      });
    };

  const loadMore = () => {
    makeSearch(filter, (response?.page || 0) + 1);
  };

  const value: SearchKlychContextValue = {
    ...filter,
    loadMore,
    items: response?.hits || [],
    hasMoreItems: response ? response.page < response.totalPages : false,
    setSearch: updateFilterField("search"),
    setCategories: updateFilterField("categories"),
    setLocation: updateFilterField("location"),
    setStartDate: updateFilterField("startDate"),
    setEndDate: updateFilterField("endDate"),
  };

  return (
    <SearchKlychContext.Provider value={value}>
      {props.children}
    </SearchKlychContext.Provider>
  );
};

export const useSearchKlych = () => {
  const value = useContext(SearchKlychContext);

  if (!value) {
    throw new Error("Component not wrapped in SearchKlychProvider");
  }

  return value;
};
