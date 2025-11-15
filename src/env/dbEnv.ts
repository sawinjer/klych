import zod from "zod";
import { MAX_PORT_NUMBER } from "./constants";

export const dbEnvSchema = {
  DB_PORT: zod.number().int().positive().min(1).max(MAX_PORT_NUMBER),
  DB_USER: zod.string().nonempty(),
  DB_PASSWORD: zod.string().nonempty(),
  DB_NAME: zod.string().nonempty(),
  DB_HOST: zod.string().nonempty(),
} as const;

export const escapeProcessEnvForDbEnv = () => {
  return {
    DB_PORT: +(process.env.DB_PORT || ""),
  };
};

export const dbEnv = zod.object(dbEnvSchema).parse({
  ...process.env,
  ...escapeProcessEnvForDbEnv(),
});

export const getDatabaseUrl = () => {
  return `postgresql://${dbEnv.DB_USER}:${dbEnv.DB_PASSWORD}@${dbEnv.DB_HOST}:${dbEnv.DB_PORT}/${dbEnv.DB_NAME}`;
};
