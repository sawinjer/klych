import { meiliClient } from "./meiliClient";

const key = await meiliClient.createKey({
  actions: ["search"],
  indexes: ["*"],
  expiresAt: null,
});

console.log(key);
