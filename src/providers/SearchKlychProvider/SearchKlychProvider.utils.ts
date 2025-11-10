import { serializeMeiliArray } from "@/lib/serializeMeiliArray";
import type { SearchKlychFilter } from "./SearchKlychProvider.interface";

export const mapFilterObjectToStringQuery = (filter: SearchKlychFilter) => {
  const result: string[] = [];

  if (filter.categories.length) {
    result.push(`category IN ${serializeMeiliArray(filter.categories)}`);
  }

  if (filter.startDate) {
    result.push(
      `datetimeOfOccurance__timestamp >= ${filter.startDate.getTime()}`,
    );
  }

  if (filter.endDate) {
    result.push(
      `datetimeOfOccurance__timestamp <= ${filter.endDate.getTime()}`,
    );
  }

  if (!result.length) {
    return undefined;
  }

  return result.join(" AND ");
};

export const getSorting = (filter: SearchKlychFilter): string[] => {
  const result: string[] = [];

  if (filter.location) {
    result.push(
      `_geoPoint(${filter.location.lat}, ${filter.location.lng}):asc`,
    );
  }

  result.push("datetimeOfOccurance__timestamp:desc");
  return result;
};
