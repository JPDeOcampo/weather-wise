import { ENDPOINTS } from "../../../apiConfig";
import { createQueryParams } from "../hooks";

export async function fetchCoordinates(latitude, longitude, timezone) {
    const currentArray = ['temperature_2m', 'relative_humidity_2m', 'is_day', 'rain', 'precipitation', 'weather_code', 'apparent_temperature'];
    const hourlyArray = ['temperature_2m', 'precipitation_probability', , 'weather_code', 'is_day', 'apparent_temperature'];
    const minutely15Array = ['temperature_2m', 'precipitation', 'rain', 'weather_code', 'wind_speed_10m', 'wind_speed_80m,wind_direction_10m', 'wind_direction_80m', 'wind_gusts_10m', 'visibility', 'is_day', 'apparent_temperature'];
    const dailyArray = ['weather_code', 'sunrise,sunset', 'uv_index_max', 'uv_index_clear_sky_max', 'rain_sum', 'precipitation_probability_max'];

    const params = {
        latitude: latitude,
        longitude: longitude,
        hourly: hourlyArray.join(','),
        forecast_hours: 12,
        current: currentArray.join(','),
        minutely_15: minutely15Array.join(','),
        daily: dailyArray.join(','),
        timezone: timezone,
        forecast_minutely_15: 24,
    };

    const queryString = createQueryParams(params);

    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${ENDPOINTS.forecast}?${queryString}`)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
