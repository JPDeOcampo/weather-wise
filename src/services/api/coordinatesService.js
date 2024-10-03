import { ENDPOINTS } from "../../../apiConfig";
export async function fetchCoordinates(coordinates) {
    const response = await fetch(`${ENDPOINTS.city}/${coordinates.lon}/${coordinates.lat}/EN`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
}
