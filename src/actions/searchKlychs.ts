"use server";

import { and, eq, inArray, sql } from "drizzle-orm";
import { user } from "@/db/authSchema";
import { db } from "@/db/db";
import { klych, klychResponds } from "@/db/klychSchema";
import { meiliClient } from "@/lib/meiliClient";
import type {
  KlychSearchResult,
  SearchKlychFilter,
} from "@/providers/SearchKlychProvider/SearchKlychProvider.interface";
import {
  getSorting,
  mapFilterObjectToStringQuery,
} from "@/providers/SearchKlychProvider/SearchKlychProvider.utils";
import { safeTryPromise } from "@/lib/safeTryPromise";

export const searchKlychs = async (filter: SearchKlychFilter, page: number) => {
  const index = meiliClient.index("klych");
  const [response, err] = await safeTryPromise(
    index.search(filter.search, {
      hitsPerPage: 20,
      page,
      filter: mapFilterObjectToStringQuery(filter),
      sort: getSorting(filter),
    }),
  );

  if (err) {
    return;
  }

  const ids = response.hits.map((hit) => hit.id) as string[];

  const klychs = await db
    .select({
      id: klych.id,
      title: klych.title,
      coverImage: klych.coverImage,
      category: klych.category,
      online: klych.online,
      requiredPeoplesAmount: klych.requiredPeoplesAmount,
      locationName: klych.locationName,
      location: klych.location,
      datetimeOfOccurance: klych.datetimeOfOccurance,
      authorId: klych.authorId,
      author: {
        name: user.name,
        surname: user.surname,
      },
      respondsCount: sql<number>`COUNT(${klychResponds.id})`.as(
        "respondsCount",
      ),
    })
    .from(klych)
    .innerJoin(user, eq(user.id, klych.authorId))
    .leftJoin(
      klychResponds,
      and(
        eq(klychResponds.klychId, klych.id),
        eq(klychResponds.status, "accepted"),
      ),
    )
    .where(inArray(klych.id, ids))
    .groupBy(klych.id, user.id);

  return {
    hits: ids
      .map((id) => klychs.find((klych) => klych.id === id))
      .filter(Boolean)
      .map((klych) => ({
        ...klych,
        respondsCount: +(klych?.respondsCount || 0),
      })) as KlychSearchResult[],
    totalPages: response.totalPages,
    page,
  };
};
