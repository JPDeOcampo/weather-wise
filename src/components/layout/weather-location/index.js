"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import { weatherCode } from "@/components/shared/constant";

const WeatherLocation = () => {
  const { weatherCity, weatherDays } = useContext(ShareContext)
  console.log(weatherDays)
  return (
    <div className="w-full bg-transparent rounded-xl p-6 h-auto min-h-[260px]">
      <div>
        {
          weatherCity.results?.map((item, index) => {
            const dateObject = new Date(weatherDays?.daily?.time[0]);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = dateObject.toLocaleDateString('en-US', options);

            // Get the day of the week separately
            const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

            return (
              <div className="flex justify-between w-full" key={index}>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-white">{`${item.name}, ${item.country_code}`}</h2>
                    <p className="text-sm md:text-base text-neutral-white80">Chance of rain: {weatherDays?.hourly?.precipitation_probability[0]}%</p>
                  </div>
                  {/* <div>
                    <p className="text-4xl font-medium text-neutral-white">{dayOfWeek}</p>
                    <p className="text-base text-neutral-white80">{formattedDate}</p>
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <div className="w-full flex gap-2">
                      <h3 className="text-5xl md:text-7xl font-semibold text-neutral-white">{weatherDays?.current?.temperature_2m}</h3>
                      <div className="h-full pt-1"><span className="border-4 border-neutral-white w-5 h-5 block rounded-full"></span></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-1">
                        <p className="text-base text-neutral-white80">High: {weatherDays?.daily?.apparent_temperature_max[0]}</p>
                        <div className="h-full w-auto pt-1"><span className="border-2 border-neutral-white80 w-2 h-2 block rounded-full"></span></div>
                      </div>
                      <div className="flex gap-1">
                        <p className="text-base text-neutral-white80">Low: {weatherDays?.daily?.apparent_temperature_min[0]}</p>
                        <div className="h-full w-auto pt-1"><span className="border-2 border-neutral-white80 w-2 h-2 block rounded-full"></span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-64 flex flex-col justify-end items-end text-end">
                  <div className="h-28 sm:h-32 md:h-36 w-28 sm:w-32 md:w-36">
                    <img className="h-full w-full" src={`/images/icons/large/${weatherDays?.current?.is_day}/${weatherDays?.current?.weather_code}.png`} alt="weather-icons" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-neutral-white text-2xl font-medium">{weatherCode[weatherDays?.current?.weather_code]}</p>
                    <div className="flex gap-1">
                      <p className="text-neutral-white80 text-base">Feels Like {weatherDays?.current?.apparent_temperature}</p>
                      <div className="h-full w-auto pt-1"><span className="border-2 border-neutral-white80 w-2 h-2 block rounded-full"></span></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default WeatherLocation;