"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
const DaysForecast = () => {
  const { weatherDays } = useContext(ShareContext);
  return (
    <div className="box-container right-container flex flex-col gap-4 h-[775px]">
      <div className="box-container-blu flex flex-col gap-4 h-full">
        <SubHeader title={"7 Day's Forecast"} />
        <div className="container-y-scroll w-full p-4">
          <div className="flex flex-col gap-8">
            {
              weatherDays?.daily?.time?.map((item, index) => {
                const today = new Date().toISOString().split('T')[0];
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const optionsCurrent = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = new Date(item).toLocaleDateString('en-US',  item === today ? optionsCurrent : options);
                return (
                  <div className={`h-[200px] w-full px-4 pb-4 flex-shrink-0 border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80`} key={index}>
                    <div className="h-full w-full flex flex-col items-center gap-6">
                      <p className="text-neutral-white80">{item === today ? `Today, ${formattedDate}` : formattedDate}</p>
                      <div className="h-full w-full grid grid-cols-3 grid-rows-2">
                          <div className="w-full px-4"><p className="text-neutral-white">Chance of rain: {weatherDays?.daily?.precipitation_probability_max[index]}%</p></div>
                          <div className="w-full px-4 border-l-1 border-r-1 border-neutral-white80">icon</div>
                          <div className="w-full px-4"><p className="text-neutral-white">Sunrise: {weatherDays?.daily?.sunrise[index]}</p>
                          <p className="text-neutral-white">Sunset: {weatherDays?.daily?.sunrise[index]}</p></div>
                          <div className="w-full px-4">d</div>
                          <div className="w-full px-4 border-l-1 border-r-1 border-neutral-white80 ">title</div>
                          <div className="w-full px-4">d</div>
                      </div>
                    </div>
                  </div>
                );
              })
            }

          </div>
        </div>
      </div>

    </div>
  )
}

export default DaysForecast;