"use client";
import { useContext } from "react";
import { ShareContext } from "@/components/shared/context/share-state";
import SubHeader from "@/components/shared/subheader";
import { weatherCode } from "@/components/shared/constant";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { SunIcon, MoonIcon } from "../../../../public/images/icons";
import { Is2xMobile } from "@/components/shared/utils/responsive";
import BoxContainer from "@/components/shared/container";
import SkeletonLoading from "@/components/shared/skeleton-loading";
import { CiTempHigh } from "react-icons/ci";
import FormatTimeHooks from "@/components/shared/hooks/format-time";
import { IoTimeSharp } from "react-icons/io5";
import { TbUvIndex } from "react-icons/tb";

const DaysContainer = ({ item, index, today, weatherDays }) => {
  const is2xMobile = Is2xMobile();
  const dateObject = new Date(item);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  //Mobile date format
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const formattedMobileDate = `${day}/${year}`;

  // Get the day of the week separately
  const dayOfWeek = dateObject.toLocaleDateString("en-US", {
    weekday: `${is2xMobile ? "short" : "long"}`,
  });

  return (
    <div className={`h-auto w-full`} key={index}>
      <div className="h-auto w-full grid grid-cols-3 items-center gap-6">
        <div className="w-full flex justify-start text-start">
          <p className="text-neutral-white80 text-sm lg:text-base">
            {item === today ? `Today` : dayOfWeek}
          </p>
        </div>
        <div className="w-full flex gap-4 items-center justify-center">
          <img
            src={`/images/icons/small/1/${weatherDays?.daily?.weather_code[index]}.png`}
            alt="weather-icons"
            title={weatherCode[weatherDays?.daily?.weather_code[index]]}
          />
          <div className="w-auto text-start">
            <p
              className="text-neutral-white80 text-sm lg:text-base"
              title={`Chance of rain: ${weatherDays?.daily?.precipitation_probability_max[index]}%`}
            >
              {weatherDays?.daily?.precipitation_probability_max[index]}%
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end text-end">
          <p className="text-neutral-white80 text-sm lg:text-base">
            {is2xMobile ? formattedMobileDate : formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

const loadingSkeleton = 7;

const DaysForecast = () => {
  const { weatherDays, loading, darkMode } = useContext(ShareContext);
  const { formatHoursMins, formatSeconds } = FormatTimeHooks();
  return (
    <BoxContainer className="flex flex-col gap-4 h-auto md:h-[775px]">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 w-full">
          <SubHeader title={"7 Day's Forecast"} />
          <p className="text-sm text-neutral-white80 pr-2">Chance of rain: %</p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(loadingSkeleton)].map((_, index) => {
              return (
                <div
                  className="pb-4 border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80"
                  key={index}
                >
                  <SkeletonLoading height={60} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="container-y-scroll w-full pt-4 pr-0 md:pr-3">
            <div className="flex flex-col gap-4 [&_>div]:!px-0">
              {weatherDays?.daily?.time?.map((item, index) => {
                const today = new Date().toISOString().split("T")[0];

                const { hours, minutes, seconds } = formatSeconds(
                  weatherDays?.daily?.daylight_duration[index]
                );

                const flexStartContainer = "w-full flex flex-col gap-2";
                const flexStartChild = "w-full flex items-center gap-4";

                const flexEndContainer =
                  "w-full flex flex-col justify-end items-start gap-2";
                const flexEndChild =
                  "w-full flex items-center justify-star gap-4";

                return (
                  <Accordion key={index}>
                    <AccordionItem
                      aria-label="Weather"
                      className={
                        "[&_>h2>button>div]:!flex-shrink [&_>h2>button>div]:w-full border-t-0 border-l-0 border-b-1 border-r-0 border-neutral-white80"
                      }
                      indicator={darkMode ? <MoonIcon /> : <SunIcon />}
                      startContent={
                        <DaysContainer
                          item={item}
                          index={index}
                          today={today}
                          weatherDays={weatherDays}
                        />
                      }
                    >
                      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 p-2 md:p-4">
                        {/* Sunrise and Sunset in one row for tablet */}
                        <div className="flex flex-row md:flex-col items-start gap-4 col-span-2 md:col-span-1">
                          <div className={`${flexStartContainer}`}>
                            <div className={`${flexStartChild}`}>
                              <img
                                src={`/images/icons/sunset-sunrise/png/sunrise-dark.png`}
                                alt="weather-icons"
                              />
                              <p className="text-neutral-white80 text-base leading-3">
                                Sunrise
                              </p>
                            </div>
                            <p className="text-neutral-white text-sm pl-10">
                              {formatHoursMins(weatherDays?.daily?.sunrise[index])}
                            </p>
                          </div>

                          <div className={`${flexEndContainer}`}>
                            <div className={`${flexEndChild}`}>
                              <img
                                src={`/images/icons/sunset-sunrise/png/sunset-dark.png`}
                                alt="weather-icons"
                              />
                              <p className="text-neutral-white80 text-base leading-3">
                                Sunset
                              </p>
                            </div>
                            <p className="text-neutral-white text-sm pl-10">
                              {formatHoursMins(weatherDays?.daily?.sunset[index])}
                            </p>
                          </div>
                        </div>

                        {/* High and Low in one row for tablet */}
                        <div className="flex flex-row md:flex-col items-start gap-4 col-span-2 md:col-span-1">
                          <div className={`${flexStartContainer}`}>
                            <div className={`${flexStartChild}`}>
                              <span className="days-forecast-icon">
                                <CiTempHigh />
                              </span>
                              <p className="text-neutral-white80 text-base leading-3">
                                High
                              </p>
                            </div>
                            <div className="h-full w-auto flex gap-1 pl-10">
                              <p className="text-sm text-neutral-white">
                                {
                                  weatherDays?.daily?.apparent_temperature_max[
                                    index
                                  ]
                                }
                              </p>
                              <span className="border-2 pt-1 border-neutral-white w-2 h-2 block rounded-full"></span>
                            </div>
                          </div>

                          <div className={`${flexEndContainer}`}>
                            <div className={`${flexEndChild}`}>
                              <span className="days-forecast-icon">
                                <CiTempHigh />
                              </span>
                              <p className="text-neutral-white80 text-base leading-3">
                                Low
                              </p>
                            </div>
                            <div className="h-full w-auto flex gap-1 pl-10">
                              <p className="text-sm text-neutral-white">
                                {
                                  weatherDays?.daily?.apparent_temperature_min[
                                    index
                                  ]
                                }
                              </p>
                              <span className="border-2 pt-1 border-neutral-white w-2 h-2 block rounded-full"></span>
                            </div>
                          </div>
                        </div>

                        {/* LOTD and UV Index remain the same */}
                        <div className="flex flex-row md:flex-col items-start gap-4 col-span-2 md:col-span-1">
                          <div className={`${flexStartContainer}`}>
                            <div className={`${flexStartChild}`}>
                              <span className="days-forecast-icon">
                                <IoTimeSharp />
                              </span>
                              <p className="text-neutral-white80 text-base leading-3">
                                LOTD
                              </p>
                            </div>
                            <p className="text-sm text-neutral-white pl-10">
                              {hours}h {minutes}m {seconds}s
                            </p>
                          </div>

                          <div className={`${flexEndContainer}`}>
                            <div className={`${flexEndChild}`}>
                              <span className="days-forecast-icon">
                                <TbUvIndex />
                              </span>
                              <p className="text-neutral-white80 text-base leading-3">
                                UV index
                              </p>
                            </div>
                            <p className="text-sm text-neutral-white pl-10">
                              {weatherDays?.daily?.uv_index_max[index]}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </BoxContainer>
  );
};

export default DaysForecast;
