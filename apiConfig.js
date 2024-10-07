const API_BASE_URL = `https://api.open-meteo.com/v1`;
const API_GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1`;

const API_REVERSE_GEOCODING = `https://api.geoapify.com/v1/geocode/reverse/`;

export const ENDPOINTS = {
    city: `${API_GEOCODING_URL}/search`,
    forecast: `${API_BASE_URL}/forecast`,
    reverse_geocoding: `${API_REVERSE_GEOCODING}`,
}