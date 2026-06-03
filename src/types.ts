import type { z } from "zod";
import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { weatherSchema } from "./schemas/weatherSchema";

export type Coords = {
  lat: number;
  lon: number;
};

export type WeatherData = z.infer<typeof weatherSchema>;
export type AirPollutionData = z.infer<typeof AirPollutionSchema>;
