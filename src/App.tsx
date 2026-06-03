import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import AirPollution from "./components/cards/AirPollution";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./api";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import AIWeatherSkeleton from "./AI/AIWeatherSkeleton";
import AIWeatherAssistant from "./AI/AIWeatherAssistant";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 50, lon: 45 });
  const [location, setLocation] = useState("Patna");
  const [mapType, setMapType] = useState("streets-v2");

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation("custom");
  };

  const firstResult = geocodeData?.results?.[0];

  const coords =
    location === "custom"
      ? coordinates
      : {
          lat: firstResult?.latitude ?? 0,
          lon: firstResult?.longitude ?? 0,
        };

  return (
    <div className="flex flex-col gap-8 p-8 w-full min-h-screen">
      <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <h1 className="text-2xl font-semibold">Location:</h1>

          <LocationDropdown location={location} setLocation={setLocation} />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <h1 className="text-2xl font-semibold whitespace-nowrap">Map Type:</h1>

          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="relative h-120 col-span-1 md:col-span-2 2xl:col-span-4">
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        </div>

        <div>
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather coords={coords} />
          </Suspense>
        </div>

        <div className="md:col-span-2">
          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForecast coords={coords} />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast coords={coords} />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 2xl:col-span-4">
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalInfo coords={coords} />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 2xl:col-span-4">
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AirPollution coords={coords} />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 2xl:col-span-4">
          <Suspense fallback={<AIWeatherSkeleton />}>
            <AIWeatherAssistant coords={coords} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
