import Search from "@/components/layout/search";
import WeatherLocation from "@/components/layout/weather-location";
import TodayForecast from "@/components/layout/today-forecast";
import AirConditions from "@/components/layout/air-conditions";
import DaysForecast from "@/components/layout/days-forecast";

export default function Home() {
  return (
   <>
    <div className="grid grid-rows-layout gap-6">
      <Search />
      <WeatherLocation />
      <TodayForecast />
      <AirConditions />
    </div>
    <DaysForecast />
   </>
  );
}
