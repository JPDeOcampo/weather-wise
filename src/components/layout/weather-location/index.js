"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import { FaRegCircle } from "react-icons/fa";
import { weatherCode } from "@/components/shared/constant";
const WeatherLocation = () => {
  const { weatherCity, weatherDays } = useContext(ShareContext)
  console.log(weatherDays)
  return (
    <div className="w-full bg-transparent rounded-xl p-8 h-auto min-h-[260px]">
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
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-5xl font-bold text-neutral-white">{`${item.name}, ${item.country}`}</h2>
                    <p className="text-base text-neutral-white80">Chance of rain: {weatherDays?.hourly?.precipitation_probability[0]}%</p>
                  </div>
                  {/* <div>
                    <p className="text-4xl font-medium text-neutral-white">{dayOfWeek}</p>
                    <p className="text-base text-neutral-white80">{formattedDate}</p>
                  </div> */}
                  <div className="w-full flex gap-2">
                    <h3 className="text-7xl font-semibold text-neutral-white">{weatherDays?.current?.temperature_2m}</h3>
                    <div className="h-full pt-1"><span className="[&_svg]:text-neutral-white text-base"><FaRegCircle /></span></div>
                  </div>
                </div>
                <div className="w-64 flex flex-col justify-end items-end text-end">
                  <div className="h-36 w-36">
                    <img className="h-full w-full object-cover" src={`/images/icons/large/${weatherDays?.current?.is_day}/${weatherDays?.current?.weather_code}.png`} alt="weather-icons" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-neutral-white text-2xl font-medium">{weatherCode[weatherDays?.current?.weather_code]}</p>
                    <p className="text-neutral-white80 text-base">Feels Like {weatherDays?.current?.apparent_temperature}</p>
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