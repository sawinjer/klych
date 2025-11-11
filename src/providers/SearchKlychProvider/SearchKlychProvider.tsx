"use client";

import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { searchKlychs } from "@/actions/searchKlychs";
import { debounce } from "@/lib/debounce";
import type {
  KlychSearchResult,
  SearchKlychContextValue,
  SearchKlychFilter,
  SetState,
} from "./SearchKlychProvider.interface";

// biome-ignore lint/style/noNonNullAssertion: <If no context, the should be an error>
const SearchKlychContext = createContext<SearchKlychContextValue>(null!);
type Response = {
  hits: KlychSearchResult[];
  totalPages: number;
  page: number;
};

export const SearchKlychProvider: React.FC<
  React.PropsWithChildren<{ initResponse: Response }>
> = (props) => {
  const [filter, setFilter] = useState<SearchKlychFilter>({
    search: "",
    categories: [],
  });
  const [response, setResponse] = useState<Response>(props.initResponse);

  const makeSearch = useCallback(
    debounce(async (filter: SearchKlychFilter, page: number) => {
      setResponse(await searchKlychs(filter, page));
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

  const loadMore = async () => {
    const newResponse = await searchKlychs(filter, (response?.page || 0) + 1);
    setResponse((prevResponse) => ({
      hits: (prevResponse?.hits || []).concat(newResponse.hits),
      page: newResponse.page,
      totalPages: newResponse.totalPages,
    }));
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
