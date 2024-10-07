"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
import { fetchCoordinates } from '@/services/api/coordinatesService';
import { fetchLocation } from '@/services/api/locationService';

export const ShareContext = createContext();
const ShareState = ({ children }) => {
  const [weatherCity, setWeatherCity] = useState({});
  const [weatherDays, setWeatherDays] = useState();

  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const locations = async (latitude, longitude) => {
    try {
      const data = await fetchLocation(latitude, longitude);
      setCity(data.features[0].properties.city);
    } catch (error) {
      console.log(error, 'fetch-location');
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locations(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.log(error, 'geo-location')
        }
      );
    }
  }, []);

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
    if (city !== '') {
      getWeather();
    }

  }, [city]);

  console.log(weatherCity, weatherDays)
  const contextValue = useMemo(() => ({
    weatherCity,
    setCity,
    weatherDays,
    loading,
    setLoading,
    darkMode,
    setDarkMode,
  }), [
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