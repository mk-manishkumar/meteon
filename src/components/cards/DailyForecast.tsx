import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = Readonly<{
  coords: Coords;
}>;

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({
        lat: coords.lat,
        lon: coords.lon,
      }),
  });

  const days = data.daily.time.map((time, index) => ({
    time,
    weatherCode: data.daily.weather_code[index],
    minTemp: data.daily.temperature_2m_min[index],
    maxTemp: data.daily.temperature_2m_max[index],
  }));

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {days.map((day) => (
        <div key={day.time} className="flex justify-between">
          <p className="w-9">
            {new Date(day.time).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>

          <WeatherIcon code={day.weatherCode} />

          <p>{Math.round((day.minTemp + day.maxTemp) / 2)}°</p>

          <p className="text-gray-500/75">{Math.round(day.minTemp)}°</p>

          <p className="text-gray-500/75">{Math.round(day.maxTemp)}°</p>
        </div>
      ))}
    </Card>
  );
}
