"use client"
import { useContext, useState } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";
import { FaCloud } from "react-icons/fa";

const TodayForecast = () => {
  const { weatherDays } = useContext(ShareContext);
  const [isHourly, setIsHourly] = useState(true);
  const todayForecastValueClass = "text-neutral-white pl-7 text-lg"
  
  return (
    <div className="box-container flex flex-col gap-4 h-auto min-h-[487px]">
      <SubHeader title={"Today's Forecast"} />
      <div className="flex flex-col h-full justify-between">
        <div className="h-full w-full grid grid-cols-2 gap-4 grid-rows-2 p-4 mb-4 border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80">
          <div>
            <div className="flex gap-2 items-center">
              <span className="today-forecast-icon"><FaCloud /></span>
              <p className="text-neutral-white80">Cloud cover</p>
            </div>
            <p className={todayForecastValueClass}>{weatherDays?.current?.cloud_cover}%</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <span className="today-forecast-icon"><FaWind /></span>
              <p className="text-neutral-white80">Wind</p>
            </div>
            <p className={todayForecastValueClass}>{weatherDays?.current?.wind_speed_10m} km/h</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <span className="today-forecast-icon"><WiHumidity /></span>
              <p className="text-neutral-white80">Humidity</p>
            </div>
            <p className={todayForecastValueClass}>{weatherDays?.current?.relative_humidity_2m}%</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <span className="today-forecast-icon"><TbUvIndex /></span>
              <p className="text-neutral-white80">UV index</p>
            </div>
            <p className={todayForecastValueClass}>{weatherDays?.daily?.uv_index_max[0]}</p>
          </div>
        </div>

        {/* Today Hourly/Minutely Forecast */}

        <div>
          <div className="flex justify-end items-center pt-2 pb-3 px-2">
            <button className="text-neutral-white text-xs uppercase font-medium bg-neutral-purple py-1 px-4 hover:bg-neutral-purple80 rounded-full" onClick={() => setIsHourly(!isHourly)}>{isHourly ? 'Hourly' : 'Minutely'}</button>
          </div>

          <div className="box-container-blur !p-3">

            <div className="container-x-scroll w-full py-2">
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
                                <div className="h-full pt-1"><span className="border-2 border-neutral-white w-2 h-2 block rounded-full"></span></div>
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
                                <div className="h-full pt-1"><span className="border-2 border-neutral-white w-2 h-2 block rounded-full"></span></div>
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
        </div>
      </div>
    </div>
  )
}

export default TodayForecast;