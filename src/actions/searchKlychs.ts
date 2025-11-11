"use server";

import { eq, inArray } from "drizzle-orm";
import { user } from "@/db/authSchema";
import { db } from "@/db/db";
import { klych } from "@/db/klychSchema";
import { meiliClient } from "@/lib/meiliClient";
import type {
  KlychSearchResult,
  SearchKlychFilter,
} from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import {
  getSorting,
  mapFilterObjectToStringQuery,
} from "@/providers/SearchKlychProvider/SearchKlychProvider.utils";

export const searchKlychs = async (filter: SearchKlychFilter, page: number) => {
  const index = meiliClient.index("klych");
  const response = await index.search(filter.search, {
    hitsPerPage: 20,
    page,
    filter: mapFilterObjectToStringQuery(filter),
    sort: getSorting(filter),
  });

  const ids = response.hits.map((hit) => hit.id) as string[];
  const klychs = await db
    .select()
    .from(klych)
    .innerJoin(user, eq(user.id, klych.authorId))
    .where(inArray(klych.id, ids));
  const mapped = klychs.map((item) => ({
    ...item.klych,
    author: {
      name: item.user.name,
      surname: item.user.surname,
    },
  })) as KlychSearchResult[];

  return {
    hits: ids
      .map((id) => mapped.find((klych) => klych.id === id))
      .filter(Boolean) as KlychSearchResult[],
    totalPages: response.totalPages,
    page,
  };
};
