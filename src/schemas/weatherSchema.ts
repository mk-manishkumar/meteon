import { z } from "zod";

export const weatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),

  current: z.object({
    time: z.string(),
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    pressure_msl: z.number(),
    cloud_cover: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
    weather_code: z.number(),
  }),

  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    apparent_temperature: z.array(z.number()),
    pressure_msl: z.array(z.number()),
    cloud_cover: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
    weather_code: z.array(z.number()),
  }),

  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
    uv_index_max: z.array(z.number()),
  }),
});

export type Weather = z.infer<typeof weatherSchema>;
