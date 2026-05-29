import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import HourlyForecast from "./components/cards/HourlyForecast";
import DailyForecast from "./components/cards/DailyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });

  return (
    <div>
      <CurrentWeather coords={{ lat: 10, lon: 25 }} />
      <HourlyForecast coords={{ lat: 10, lon: 25 }} />
      <DailyForecast coords={{ lat: 10, lon: 25 }} />
    </div>
  );
};

export default App;
