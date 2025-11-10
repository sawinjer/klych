import zod from "zod";

const MAX_PORT_NUMBER = 65535;

export const publicEnvSchema = {
  NEXT_PUBLIC_MEILI_HOST: zod.string(),
  NEXT_PUBLIC_MEILI_USE_SSL: zod.boolean(),
  NEXT_PUBLIC_MEILI_PORT: zod.number().int().positive().max(MAX_PORT_NUMBER),
  NEXT_PUBLIC_MEILI_TOKEN: zod.string().min(1),

  NEXT_PUBLIC_MAPBOX_TOKEN: zod.string().min(1),
} as const;

export const publicEnv = zod.object(publicEnvSchema).parse({
  NEXT_PUBLIC_MEILI_HOST: process.env.NEXT_PUBLIC_MEILI_HOST,
  NEXT_PUBLIC_MEILI_TOKEN: process.env.NEXT_PUBLIC_MEILI_TOKEN,
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  NEXT_PUBLIC_MEILI_PORT: +(process.env.NEXT_PUBLIC_MEILI_PORT || ""),
  NEXT_PUBLIC_MEILI_USE_SSL: process.env.NEXT_PUBLIC_MEILI_USE_SSL === "true",
});
