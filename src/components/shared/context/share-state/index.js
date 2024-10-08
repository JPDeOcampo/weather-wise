"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
import { fetchCoordinates } from '@/services/api/coordinatesService';
import { fetchLocation } from '@/services/api/locationService';

export const ShareContext = createContext();
const ShareState = ({ children }) => {
  const [weatherCity, setWeatherCity] = useState({});
  const [weatherDays, setWeatherDays] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const [isError, setIsError] = useState(false);

  const [isNoResult, setIsNoResult] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const locations = async (latitude, longitude) => {
    try {
      const data = await fetchLocation(latitude, longitude);
      setCity(data.features[0].properties.city);
    } catch (error) {
      setIsError(true);
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
          setIsError(true);
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
          const hasTimezone = data?.results?.some((result) => result?.timezone);
          const hasResults = data?.results && Array.isArray(data?.results) && data?.results?.length > 0;

          if (!hasTimezone || !hasResults) {
            setIsNoResult(true);
            setLoading(false);
          } else {
            setIsNoResult(false);
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
              setIsError(true);
              console.error(error.message);
            }
          }
        }
      } catch (error) {
        setIsError(true);
        console.error(error.message);
      }
    }
    if (city !== '') {
      getWeather();
    }
  }, [city]);

  console.log(weatherCity, weatherDays)
  const contextValue = useMemo(() => ({
    weatherCity,
    city,
    setCity,
    weatherDays,
    loading,
    setLoading,
    darkMode,
    setDarkMode,
    setIsError,
    isError,
    isNoResult,
    setIsNoResult,
    searchQuery,
    setSearchQuery,
    handleRefresh,
  }), [
    weatherCity,
    city,
    setCity,
    weatherDays,
    loading,
    setLoading,
    darkMode,
    setDarkMode,
    setIsError,
    isError,
    setIsNoResult,
    isNoResult,
    searchQuery,
    setSearchQuery,
    handleRefresh,
  ])
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  )
}

export default ShareState;