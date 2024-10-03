"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
const WeatherLocation = () => {
  const { weather } = useContext(ShareContext)
  return (
    <div className="w-full bg-transparent rounded-xl text-white px-8">
      <div>
        <h2 className="text-[48px] font-bold">{weather.name}</h2>
        <p>Chance of rain: {30}</p>
      </div>
    
    </div>
  )
}

export default WeatherLocation;