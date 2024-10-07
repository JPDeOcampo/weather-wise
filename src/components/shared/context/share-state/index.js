"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
import { fetchCoordinates } from '@/services/api/coordinatesService';

export const ShareContext = createContext();
const ShareState = ({ children }) => {
  const [weatherCity, setWeatherCity] = useState({});
  const [weatherDays, setWeatherDays] = useState();
  const [location, setLocation] = useState(false);
  const [city, setCity] = useState('manila');

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather(city);
        if (data) {
          setWeatherCity(data);
          try {
            const result = data.results?.map((item) => {
              const { latitude, longitude, timezone } = item;
              return fetchCoordinates(latitude, longitude, timezone);
            });
            const responses = await Promise.all(result);
            if (responses) {
              setWeatherDays(...responses);
              setLoading(false);
            }

          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getWeather();
  }, [city]);

  console.log(weatherCity, weatherDays)
  const contextValue = useMemo(() => ({
    location,
    setLocation,
    weatherCity,
    setCity,
    weatherDays,
    loading,
    setLoading,
    darkMode, 
    setDarkMode,
  }), [
    location,
    setLocation,
    weatherCity,
    setCity,
    weatherDays,
    loading,
    setLoading,
    darkMode, 
    setDarkMode,
  ])
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  )
}

export default ShareState;