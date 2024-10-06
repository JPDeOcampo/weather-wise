import SideBar from "@/components/layout/sidebar";
import Search from "@/components/layout/search";
import WeatherLocation from "@/components/layout/weather-location";
import TodayForecast from "@/components/layout/today-forecast";
import AirConditions from "@/components/layout/air-conditions";
import DaysForecast from "@/components/layout/days-forecast";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto relative p-6 h-auto">
      <div className="flex flex-col w-full gap-6 h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-auto">
          {/* <div className="flex w-full items-center gap-8">
            <div>
              <img src="/images/icons/logo.png" alt="logo" />
            </div> */}
            <Search />
          {/* </div> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
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
