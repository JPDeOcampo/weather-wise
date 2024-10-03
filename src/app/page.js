import SideBar from "@/components/layout/sidebar";
import Search from "@/components/layout/search";
import WeatherLocation from "@/components/layout/weather-location";
import TodayForecast from "@/components/layout/today-forecast";
import AirConditions from "@/components/layout/air-conditions";
import DaysForecast from "@/components/layout/days-forecast";

export default function Home() {
  return (
    <div className="grid grid-cols-layout p-6 gap-6 h-lvh">
      <SideBar />
      <div className="flex flex-col w-full gap-6">
        <div className="grid grid-cols-layout-container h-14">
          <Search />
        </div>
        <div className="grid grid-cols-layout-container gap-6 h-full">
          <div className="flex flex-col gap-6">
            <WeatherLocation />
            <TodayForecast />
            <AirConditions />
          </div>
          <DaysForecast />
        </div>

      </div>

    </div>
  );
}
