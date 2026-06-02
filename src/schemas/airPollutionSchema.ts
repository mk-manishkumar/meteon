import { z } from "zod";

export const AirPollutionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),

  hourly: z.object({
    time: z.array(z.string()),

    pm10: z.array(z.number().nullable()),
    pm2_5: z.array(z.number().nullable()),

    carbon_monoxide: z.array(z.number().nullable()),
    nitrogen_dioxide: z.array(z.number().nullable()),
    sulphur_dioxide: z.array(z.number().nullable()),
    ozone: z.array(z.number().nullable()),

    us_aqi: z.array(z.number().nullable()),
  }),
});
