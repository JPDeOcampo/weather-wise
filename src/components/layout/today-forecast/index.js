"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
import { FaRegCircle } from "react-icons/fa";

const TodayForecast = () => {
  const { weatherDays } = useContext(ShareContext);
  return (
    <div className="box-container flex flex-col gap-4 h-auto min-h-[180px]">
      <SubHeader title={"Today's Forecast"} />
      <div className="container-x-scroll w-full py-4">
        <div className="flex pb-4 relative -left-4">
          {
            weatherDays?.hourly?.time?.map((item, index) => {
              const hour = new Date(item).getHours();
              const period = hour < 12 ? 'AM' : 'PM';
              const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

              return (
                <div className={`h-[130px] w-full max-w-36 flex-shrink-0 ${index === weatherDays?.hourly?.time?.length - 1 ? 'border-0' : 'border border-t-0 border-l-0 border-b-0 border-r-1'}} border-neutral-white80`} key={index}>
                  <div className="h-auto w-full flex flex-col items-center gap-4">
                    <p className="text-neutral-white80">{`${formattedHour}:00 ${period}`}</p>
                    <img src={`/images/icons/small/${weatherDays?.hourly?.is_day[index]}/${weatherDays?.hourly?.weather_code[index]}.png`} alt="weather-icons" />
                    <div className="w-full flex justify-center gap-1">
                      <p className="text-neutral-white text-2xl font-medium">{weatherDays?.hourly?.temperature_2m[index]}</p>
                      <div className="h-full pt-1"><span className="[&_svg]:text-neutral-white text-[10px]"><FaRegCircle /></span></div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

    </div>
  )
}

export default TodayForecast;