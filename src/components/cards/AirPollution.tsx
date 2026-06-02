import { useSuspenseQuery } from "@tanstack/react-query";
import { getAirPollution } from "../../api";
import Card from "./Card";
import type { Coords } from "../../types";

type Props = Readonly<{
  coords: Coords;
}>;

export default function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () => getAirPollution(coords),
  });

  const index = 0;

  const pollutants = [
    {
      label: "US AQI",
      value: data.hourly.us_aqi[index] ?? 0,
    },
    {
      label: "PM10",
      value: data.hourly.pm10[index] ?? 0,
    },
    {
      label: "PM2.5",
      value: data.hourly.pm2_5[index] ?? 0,
    },
    {
      label: "CO",
      value: data.hourly.carbon_monoxide[index] ?? 0,
    },
    {
      label: "NO₂",
      value: data.hourly.nitrogen_dioxide[index] ?? 0,
    },
    {
      label: "SO₂",
      value: data.hourly.sulphur_dioxide[index] ?? 0,
    },
    {
      label: "O₃",
      value: data.hourly.ozone[index] ?? 0,
    },
  ];

  return (
    <Card title="Air Pollution" childrenClassName="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
      {pollutants.map((item) => (
        <div key={item.label} className="flex flex-col items-center justify-center rounded-lg border p-4">
          <h3 className="text-sm text-muted-foreground">{item.label}</h3>

          <p className="text-2xl font-semibold">{Math.round(item.value)}</p>
        </div>
      ))}
    </Card>
  );
}
