"use client"
import { createContext, useMemo, useState, useEffect } from 'react';
import { fetchWeather } from '@/services/api/cityService';
import { fetchCoordinates } from '@/services/api/coordinatesService';
import { fetchLocation } from '@/services/api/locationService';
import { useRouter } from 'next/navigation';

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

  const [refresh, setRefresh] = useState(true);

  const [isClearVisible, setIsClearVisible] = useState(false);

  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleRefresh = () => {
    setRefresh(!refresh);
    setLoading(true);
    router.refresh();
    setCity('');
    setIsNoResult(false);
    setIsError(false);
    setSearchQuery('');
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
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setMessage('Location access denied. Please enable location services in your settings.');
              break;
            case error.POSITION_UNAVAILABLE:
              setMessage('Location information is unavailable. Please try again.');
              break;
            case error.TIMEOUT:
              setMessage('The request to get your location timed out. Please try again.');
              break;
            default:
              setMessage('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      setIsError(true);
      setMessage('Geolocation is not supported by this browser.');
    }

  }, [refresh]);

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
                setIsClearVisible(false);
                setSearchQuery('');
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
    isClearVisible, 
    setIsClearVisible,
    message,
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
    isClearVisible, 
    setIsClearVisible,
    message,
  ])
  return (
    <ShareContext.Provider value={contextValue}>
      {children}
    </ShareContext.Provider>
  )
}

export default ShareState;