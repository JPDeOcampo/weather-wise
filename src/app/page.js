"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import Search from "@/components/layout/search";
import WeatherLocation from "@/components/layout/weather-location";
import TodayForecast from "@/components/layout/today-forecast";
import DaysForecast from "@/components/layout/days-forecast";
import "react-loading-skeleton/dist/skeleton.css";
import DarkModeButton from "@/components/shared/buttons/dark-mode-button";

export default function Home() {
  const { isError, isNoResult, handleRefresh, message } = useContext(ShareContext);
  
  return (
    <div className={`w-full max-w-7xl mx-auto relative px-4 md:px-6 py-6 ${isError || isNoResult ? 'h-lvh' : 'h-auto'}`}>
      <div className={`flex flex-col w-full gap-6 ${isError || isNoResult ? 'h-full' : 'h-auto'}`}>
        <div className="flex justify-between h-auto gap-4">
          <div className="flex w-full items-center gap-8">
            {/* <div>
              <img src="/images/icons/logo.png" alt="logo" />
            </div> */}
            <Search />
          </div>
          <div className="w-auto lg:w-full flex justify-end pr-4 md:pr-8 items-center">
            <DarkModeButton />
          </div>
        </div>
        {
          isError ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col gap-4 justify-center">
                <p className="text-2xl font-bold text-red-500 text-center">{message.length > 0 ? message : 'Error fetching data'}</p>
                <div className="w-full flex justify-center">
                  <button className="text-base text-neutral-white font-medium bg-neutral-purple hover:bg-neutral-purple80 py-2 px-4 rounded-full w-auto" onClick={handleRefresh}>Try again</button>
                </div>
              </div>
            </div>
          ) : isNoResult ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl font-bold text-neutral-white80">No result found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col gap-6">
                <WeatherLocation />
                <TodayForecast />
              </div>
              <DaysForecast />
            </div>
          )
        }
      </div>
    </div>
  );
}
