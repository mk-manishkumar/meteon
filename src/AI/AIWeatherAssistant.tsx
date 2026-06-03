import { useSuspenseQuery } from "@tanstack/react-query";
import { getAIWeather } from "../api";
import type { Coords } from "../types";
import Card from "../components/cards/Card";

type Props = Readonly<{
  coords: Coords;
}>;

export default function AIWeatherAssistant({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["ai-weather", coords],
    queryFn: () =>
      getAIWeather({
        lat: coords.lat,
        lon: coords.lon,
      }),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Card title="AI Weather Assistant" childrenClassName="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h3 className="font-semibold">Weather Summary</h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{data.summary}</p>
      </div>

      <div className="rounded-xl border p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl">👕</span>
          <h3 className="font-semibold">Clothing Recommendation</h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{data.clothing}</p>
      </div>

      <div className="rounded-xl border p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl">🌤️</span>
          <h3 className="font-semibold">Best Time Outside</h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{data.bestTimeOutside}</p>
      </div>
    </Card>
  );
}
