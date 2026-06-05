import axios from "axios";
import type { AIWeatherResponse } from "./components/ai/aiTypes";
import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { GeocodeSchema } from "./schemas/geocodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";

// Get weather data for a specific location
export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,wind_direction_10m,weather_code",
      hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,cloud_cover,wind_speed_10m,weather_code",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
      timezone: "auto",
    },
    timeout: 10000,
  });

  return weatherSchema.parse(data);
}

// Get geocode data for a specific location
export async function getGeocode(location: string) {
  const { data } = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: {
      name: location,
      count: 1,
      language: "en",
      format: "json",
    },
    timeout: 10000,
  });

  return GeocodeSchema.parse(data);
}

// Air pollution data for a specific location
export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const { data } = await axios.get("https://air-quality-api.open-meteo.com/v1/air-quality", {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi",
    },
    timeout: 10000,
  });

  return AirPollutionSchema.parse(data);
}

// Get AI-generated weather insights
export async function getAIWeather({ lat, lon }: { lat: number; lon: number }): Promise<AIWeatherResponse> {
  try {
    const weather = await getWeather({ lat, lon });

    const air = await getAirPollution({ lat, lon });

    const { data } = await axios.post<AIWeatherResponse>("/api/weather-ai", { weather, air }, { timeout: 20000 });

    return data;
  } catch (error) {
    console.error("AI Weather Error:", error);

    return {
      summary: "AI weather insights are temporarily unavailable.",
      clothing: "Unable to generate clothing recommendation.",
      bestTimeOutside: "Unable to determine the best time to go outside.",
    };
  }
}
