import { z } from "zod";

export const GeocodeSchema = z.object({
  results: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      country: z.string(),
      admin1: z.string().optional(),
    }),
  ),
});
