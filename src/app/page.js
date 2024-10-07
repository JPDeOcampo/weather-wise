import Search from "@/components/layout/search";
import WeatherLocation from "@/components/layout/weather-location";
import TodayForecast from "@/components/layout/today-forecast";
import DaysForecast from "@/components/layout/days-forecast";
import "react-loading-skeleton/dist/skeleton.css";
import DarkModeButton from "@/components/shared/buttons/dark-mode-button";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto relative p-6 h-auto">
      <div className="flex flex-col w-full gap-6 h-auto">
        <div className="flex justify-between h-auto gap-4">
          <div className="flex w-full items-center gap-8">
            {/* <div>
              <img src="/images/icons/logo.png" alt="logo" />
            </div> */}
            <Search />
          </div>
          <div className="w-auto lg:w-full flex justify-end pr-4 md:pr-8">
            <DarkModeButton />
          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div className="flex flex-col gap-6">
            <WeatherLocation />
            <TodayForecast />
          </div>
          <DaysForecast />
        </div>
      </div>

    </div>
  );
}
