"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
export const ShareContext = createContext();
const ShareState = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState(false);
  const [city, setCity] = useState('manila');

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    }

    getWeather();
  }, [city]); 

console.log(weather)
  const contextValue = useMemo(()=> ({
    location,
    setLocation,
    weather
  }),[
    location,
    setLocation,
    weather,
  ])
  return (
    <ShareContext.Provider value={contextValue}>
        {children}
    </ShareContext.Provider>
  )
}

export default ShareState;