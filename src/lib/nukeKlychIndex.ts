import { meiliClient } from "./meiliClient";

const { waitTask } = meiliClient.deleteIndex("klych");
await waitTask();
