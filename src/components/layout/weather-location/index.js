"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
const WeatherLocation = () => {
  const { weatherCity } = useContext(ShareContext)

  return (
    <div className="w-full bg-transparent rounded-xl p-8 h-auto min-h-[260px]">
      <div>
        <h2 className="text-5xl font-bold text-white">{weatherCity.name}</h2>
        <p className="text-base text-white">Chance of rain: {30}</p>
      </div>
    
    </div>
  )
}

export default WeatherLocation;