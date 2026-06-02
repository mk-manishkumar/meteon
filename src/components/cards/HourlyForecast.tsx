import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = Readonly<{
  coords: Coords;
}>;

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({
        lat: coords.lat,
        lon: coords.lon,
      }),
  });

  const hours = data.hourly.time.slice(0, 48).map((time, index) => ({
    time,
    temp: data.hourly.temperature_2m[index],
    weatherCode: data.hourly.weather_code[index],
  }));

  return (
    <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex gap-6 overflow-x-scroll">
      {hours.map((hour) => (
        <div key={hour.time} className="flex flex-col 2xl:justify-between gap-2 items-center p-2">
          <p className="whitespace-nowrap 2xl:scale-110">
            {new Date(hour.time).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>

          <WeatherIcon className="2xl:size-10" code={hour.weatherCode} />

          <p className="2xl:scale-110">{Math.round(hour.temp)}°</p>
        </div>
      ))}
    </Card>
  );
}
