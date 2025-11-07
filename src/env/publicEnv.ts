import z from "zod";

export const publicEnvSchema = {
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1),
  NEXT_PUBLIC_MEILI_TOKEN: z.string().min(1),
} as const;

export const publicEnv = z.object(publicEnvSchema).parse(process.env);
