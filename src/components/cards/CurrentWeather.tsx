import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = Readonly<{
  coords: Coords;
}>;

function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return "Clear Sky";

    case 1:
    case 2:
      return "Partly Cloudy";

    case 3:
      return "Cloudy";

    case 45:
    case 48:
      return "Fog";

    case 51:
    case 53:
    case 55:
      return "Drizzle";

    case 61:
    case 63:
    case 65:
      return "Rain";

    case 71:
    case 73:
    case 75:
      return "Snow";

    case 95:
      return "Thunderstorm";

    default:
      return "Unknown";
  }
}

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({
        lat: coords.lat,
        lon: coords.lon,
      }),
  });

  return (
    <Card title="Current Weather" className="md:pb-11" childrenClassName="flex flex-col items-center gap-6 2xl:justify-between">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">{Math.round(data.current.temperature_2m)}°</h2>

        <WeatherIcon code={data.current.weather_code} className="size-14" />

        <h3 className="capitalize text-xl">{getWeatherDescription(data.current.weather_code)}</h3>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>

        <h3 className="text-4xl font-semibold">
          {new Date(data.current.time).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </h3>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>

          <p>{Math.round(data.current.apparent_temperature)}°</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>

          <p>{data.current.relative_humidity_2m}%</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>

          <p>{data.current.wind_speed_10m} km/h</p>
        </div>
      </div>
    </Card>
  );
}
