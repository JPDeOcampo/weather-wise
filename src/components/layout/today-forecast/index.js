"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";

const TodayForecast = () => {
  const { weatherDays } = useContext(ShareContext);
  return (
    <div className="box-container flex flex-col gap-6 h-auto min-h-[180px]">
      <h3 className="text-neutral-white80 uppercase">Today's Forecast</h3>
      <div className="flex px-4">
        {
          weatherDays.list.map((day, index) => {
            return (
              <div className="h-[130px] w-full max-w-36 border border-t-0 border-l-0 border-b-0 border-r-1 border-neutral-white80">
                <p></p>
              </div>
            );
          })
        }

      </div>
    </div>
  )
}

export default TodayForecast;