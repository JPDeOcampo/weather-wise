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
                <h2 className="text-5xl font-bold text-white">{item.name}</h2>
                <p className="text-base text-white">Chance of rain: {weatherDays?.hourly?.precipitation_probability[0]}%</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default WeatherLocation;