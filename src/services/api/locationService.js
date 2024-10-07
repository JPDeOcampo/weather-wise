import { ENDPOINTS } from "../../../apiConfig";
import { createQueryParams } from "../hooks";
export async function fetchLocation(latitude, longitude) {

    const params = {
        lat: latitude,
        lon: longitude,
        apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_KEY,
    };

    const queryString = createQueryParams(params);

    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${ENDPOINTS.reverse_geocoding}?${queryString }`)}`;
 
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
