"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
const WeatherLocation = () => {
  const { weatherCity, weatherDays } = useContext(ShareContext)
  console.log(weatherDays)
  return (
    <div className="w-full bg-transparent rounded-xl p-8 h-auto min-h-[260px]">
      <div>
        {
          weatherCity.results?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                <h2 className="text-5xl font-bold text-neutral-white">{`${item.name}, ${item.country}`}</h2>
                <p className="text-base text-neutral-white">Chance of rain: {weatherDays?.hourly?.precipitation_probability[0]}%</p>
                  </div>
              
                <h3 className="text-5xl font-semibold text-neutral-white">{weatherDays?.hourly?.temperature_2m[0]}</h3>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default WeatherLocation;