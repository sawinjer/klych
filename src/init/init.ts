import { meiliClient } from "@/lib/meiliClient";

const index = meiliClient.index("klych");

const { taskUid: filteringTask } = await index.updateFilterableAttributes([
  "category",
  "online",
  "datetimeOfOccurance__timestamp",
]);
const { taskUid: sortingTask } = await index.updateSortableAttributes([
  "_geo",
  "datetimeOfOccurance__timestamp",
]);

await meiliClient.tasks.waitForTasks([filteringTask, sortingTask]);
