import type { KlychCategory } from "@/lib/enums/KlychCategory";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type Location = { lat: number; lng: number };

export interface KlychSearchResult {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: KlychCategory;
  online: boolean;
  requiredPeoplesAmount: string;
  locationName?: string;
  location?: {
    x: number;
    y: number;
  };
  datetimeOfOccurance: string;
  authorId: string;
  author: {
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    surname: string | null;
    age: number | null;
  };
  datetimeOfOccurance__timestamp: number;
}

export interface SearchKlychFilter {
  search: string;
  categories: KlychCategory[];
  location?: Location;
  startDate?: Date;
  endDate?: Date;
}

export type SearchKlychContextValue = SearchKlychFilter & {
  items: KlychSearchResult[];
  hasMoreItems: boolean;
  loadMore: () => void;
  setSearch: SetState<string>;
  setCategories: SetState<KlychCategory[]>;
  setLocation: SetState<Location | undefined>;
  setStartDate: SetState<Date | undefined>;
  setEndDate: SetState<Date | undefined>;
};
