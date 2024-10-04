import { ENDPOINTS } from "../../../apiConfig";
import { createQueryParams } from "../hooks";

export async function fetchWeather(city) {

    const params = {
        name: city,
        count: 1,
        language: 'en',
        forecast_hours: 12,
        format: 'json',
    };

    const queryString = createQueryParams(params);
    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${ENDPOINTS.city}?${queryString}`)}`;

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
