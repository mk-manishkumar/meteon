import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { GeocodeSchema } from "./schemas/geocodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,wind_direction_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`);

  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch weather");

  return weatherSchema.parse(data);
}

export async function getGeocode(location: string) {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);

  const data = await res.json();

  return GeocodeSchema.parse(data);
}

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi`);

  const data = await res.json();

  return AirPollutionSchema.parse(data);
}
