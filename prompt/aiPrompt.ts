import type { WeatherData, AirPollutionData } from "../src/types";

export function buildWeatherPrompt(weather: WeatherData, air: AirPollutionData) {
  const current = weather.current;

  const aqi = air.hourly.us_aqi[0] ?? "Unknown";

  const nextHours = weather.hourly.temperature_2m.slice(0, 12).join(", ");

  return `
You are Meteon's AI Weather Assistant.

Analyze the provided weather and air quality data.

Current Weather:
Temperature: ${current.temperature_2m}°C
Feels Like: ${current.apparent_temperature}°C
Humidity: ${current.relative_humidity_2m}%
Wind Speed: ${current.wind_speed_10m} km/h
Pressure: ${current.pressure_msl} hPa
Cloud Cover: ${current.cloud_cover}%

Air Quality:
US AQI: ${aqi}

Next 12 Hours Temperature:
${nextHours}

Generate:

1. Weather Summary
2. Clothing Recommendation
3. Best Time To Go Outside

Return ONLY valid JSON:

{
  "summary": "string",
  "clothing": "string",
  "bestTimeOutside": "string"
}

Rules:
- Summary must be under 40 words.
- Clothing recommendation must be under 30 words.
- Best time outside must be under 30 words.
- Use practical human-friendly advice.
- No markdown.
- No code blocks.
- No explanations.
- No extra text.
- Return raw JSON only.
`;
}
