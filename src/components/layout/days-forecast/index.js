"use client"
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
import { formatHours } from "@/components/shared/hooks/formattedHours";
import { weatherCode } from "@/components/shared/constant";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { SunIcon } from "../../../../public/images/icons";
import { Is2xMobile } from "@/components/shared/utils/responsive";
import Skeleton from "react-loading-skeleton";

const DaysContainer = ({ item, index, today, weatherDays, weatherCode }) => {
  const is2xMobile = Is2xMobile();

  const dateObject = new Date(item);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', options);

  //Mobile date format 
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const year = dateObject.getUTCFullYear();
  const formattedMobileDate = `${day}/${year}`;

  // Get the day of the week separately
  const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: `${is2xMobile ? 'short' : 'long'}` });

  return (
    <div className={`h-auto w-full`} key={index}>
      <div className="h-auto w-full grid grid-cols-3 items-center gap-6">
        <div className="w-full flex justify-start text-start">
          <p className="text-neutral-white80">{item === today ? `Today` : dayOfWeek}</p>
        </div>
        <div className="w-full flex gap-4 items-center">
          <img src={`/images/icons/small/1/${weatherDays?.daily?.weather_code[index]}.png`} alt="weather-icons" />
          <div className="w-auto text-start">
            <p className="text-neutral-white80 text-sm hidden md:block">{weatherCode[weatherDays?.daily?.weather_code[index]]}</p>
          </div>
        </div>
        <div className="w-full flex justify-end text-end">
          <p className="text-neutral-white80">{is2xMobile ? formattedMobileDate : formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

const loadingSkeleton = 7;

const DaysForecast = () => {
  const { weatherDays, loading } = useContext(ShareContext);
  return (
    <div className="box-container flex flex-col gap-4 h-[775px]">
      <div className="box-container-blu flex flex-col gap-4 h-full">
        <SubHeader title={"7 Day's Forecast"} />
        {
          loading ? (
            <div className="flex flex-col gap-4">
              {
                [...Array(loadingSkeleton)].map((_, index) => {
                  return (
                    <div className="pb-4 border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80" key={index}>
                      <Skeleton
                        baseColor="#e5e5e5"
                        highlightColor="#a9a9a9"
                        className="skeleton-img"
                        height={60}
                      />
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className="container-y-scroll w-full pt-4 pr-3">
              <div className="flex flex-col gap-4 [&_>div]:!px-0">
                {
                  weatherDays?.daily?.time?.map((item, index) => {
                    const today = new Date().toISOString().split('T')[0];
                    return (
                      <Accordion key={index}>
                        <AccordionItem
                          aria-label="Weather"
                          className={"[&_>h2>button>div]:!flex-shrink [&_>h2>button>div]:w-full border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80"}
                          indicator={<SunIcon />}
                          startContent={<DaysContainer item={item} index={index} today={today} weatherDays={weatherDays} weatherCode={weatherCode} />}
                        >
                          <div className="w-full grid grid-cols-3 gap-6">
                            <div className="w-full flex items-end gap-4">
                              <img src={`/images/icons/sunset-sunrise/png/sunrise-dark.png`} alt="weather-icons" />
                              <p className="text-neutral-white text-sm leading-3">{formatHours(weatherDays?.daily?.sunrise[index])} </p>
                            </div>
                            <div className="w-full">
                              {/* {
                                today !== item && <p className="text-neutral-white text-sm">Chance of rain: {weatherDays?.daily?.precipitation_probability_max[index]}%</p>
                              } */}
                            </div>
                            <div className="w-full flex items-end justify-end gap-4 pr-12">
                              <img src={`/images/icons/sunset-sunrise/png/sunset-dark.png`} alt="weather-icons" />
                              <p className="text-neutral-white text-sm leading-3">{formatHours(weatherDays?.daily?.sunset[index])}</p>
                            </div>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    );
                  })
                }
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default DaysForecast;