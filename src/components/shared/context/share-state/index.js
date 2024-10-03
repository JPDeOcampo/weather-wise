"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
import { sampleWeatherCity } from '../../constant/weatherCity';
import { fiveDays } from '../../constant/fiveDays';
export const ShareContext = createContext();
const ShareState = ({ children }) => {
  const [weatherCity, setWeatherCity] = useState(sampleWeatherCity);
  const [weatherDays, setWeatherDays] = useState(fiveDays);
  const [location, setLocation] = useState(false);
  const [city, setCity] = useState('manila');
  console.log(weatherCity)
  // useEffect(() => {
  //   async function getWeather() {
  //     try {
  //       const data = await fetchWeather(city);
  //       setWeatherCity(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }

  //   getWeather();
  // }, [city]); 

  const contextValue = useMemo(() => ({
    location,
    setLocation,
    weatherCity,
    setCity,
    weatherDays,
  }), [
    location,
    setLocation,
    weatherCity,
    setCity,
    weatherDays,
  ])
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  )
}

export default ShareState;