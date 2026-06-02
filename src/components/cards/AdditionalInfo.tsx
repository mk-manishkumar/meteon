import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Uv from "../../assets/uv.svg?react";
import Wind from "../../assets/wind.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UpArrow from "../../assets/uparrow.svg?react";
import type { Coords } from "../../types";

type Props = Readonly<{
  coords: Coords;
}>;

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({
        lat: coords.lat,
        lon: coords.lon,
      }),
  });

  const rows = [
    {
      label: "Cloudiness (%)",
      value: data.current.cloud_cover,
      Icon: Cloud,
      type: "number",
    },
    {
      label: "UV Index",
      value: data.daily.uv_index_max[0] ?? 0,
      Icon: Uv,
      type: "number",
    },
    {
      label: "Wind Direction",
      value: data.current.wind_direction_10m,
      Icon: Wind,
      type: "wind",
    },
    {
      label: "Pressure (hPa)",
      value: data.current.pressure_msl,
      Icon: Pressure,
      type: "number",
    },
    {
      label: "Sunrise",
      value: data.daily.sunrise[0],
      Icon: Sunrise,
      type: "time",
    },
    {
      label: "Sunset",
      value: data.daily.sunset[0],
      Icon: Sunset,
      type: "time",
    },
  ] as const;

  return (
    <Card title="Additional Weather Info" childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
      {rows.map(({ label, value, Icon, type }) => (
        <div className="flex justify-between" key={label}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>

            <Icon className="size-8" />
          </div>

          <span>
            <FormatValue value={value} type={type} />
          </span>
        </div>
      ))}
    </Card>
  );
}

type FormatValueProps = Readonly<{
  value: string | number;
  type: "number" | "time" | "wind";
}>;

function FormatValue({ value, type }: FormatValueProps) {
  if (type === "time") {
    return new Date(String(value)).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (type === "wind") {
    return <UpArrow className="size-8" style={{ transform: `rotate(${Number(value)}deg)` }} />;
  }

  return <>{value}</>;
}
