import zod from "zod";

const MAX_PORT_NUMBER = 65535;

const envSchema = zod.object({
  DB_PORT: zod.number().int().positive().min(1).max(MAX_PORT_NUMBER),
  DB_USER: zod.string().nonempty(),
  DB_PASSWORD: zod.string().nonempty(),
  DB_NAME: zod.string().nonempty(),
  DB_HOST: zod.string().nonempty(),
});

export const env = envSchema.parse({
  ...process.env,
  DB_PORT: +(process.env.DB_PORT || ""),
});

export const getDatabaseUrl = () => {
  return `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
};
