"use client"
import { useContext, useState } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
import { FaRegCircle } from "react-icons/fa";
import { Button } from "@nextui-org/react";

const TodayForecast = () => {
  const { weatherDays } = useContext(ShareContext);
  const [isHourly, setIsHourly] = useState(true);

  return (
    <div className="box-container flex flex-col gap-4 h-auto min-h-[180px]">
      <div className="flex justify-between items-center">
        <SubHeader title={"Today's Forecast"} />
        <button className="text-neutral-white text-xs uppercase font-medium bg-neutral-purple py-1 px-4 hover:bg-neutral-purple80 rounded-full" onClick={() => setIsHourly(!isHourly)}>{isHourly ? 'Hourly' : 'Minutely'}</button>
      </div>

      <div className="container-x-scroll w-full py-4">
        {
          isHourly ? (
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
          ) : (
            <div className="flex pb-4 relative -left-4">
              {
                weatherDays?.minutely_15?.time?.map((item, index) => {

                  const date = new Date(item);
                  const hour = date.getHours();
                  const period = hour < 12 ? 'AM' : 'PM';
                  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                  const minutes = String(date.getMinutes()).padStart(2, '0');

                  return (
                    <div className={`h-[130px] w-full max-w-36 flex-shrink-0 ${index === weatherDays?.minutely_15?.time?.length - 1 ? 'border-0' : 'border border-t-0 border-l-0 border-b-0 border-r-1'}} border-neutral-white80`} key={index}>
                      <div className="h-auto w-full flex flex-col items-center gap-4">
                        <p className="text-neutral-white80">{`${formattedHour}:${minutes} ${period}`}</p>
                        <img src={`/images/icons/small/${weatherDays?.minutely_15?.is_day[index]}/${weatherDays?.minutely_15?.weather_code[index]}.png`} alt="weather-icons" />
                        <div className="w-full flex justify-center gap-1">
                          <p className="text-neutral-white text-2xl font-medium">{weatherDays?.minutely_15?.temperature_2m[index]}</p>
                          <div className="h-full pt-1"><span className="[&_svg]:text-neutral-white text-[10px]"><FaRegCircle /></span></div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )
        }

      </div>

    </div>
  )
}

export default TodayForecast;