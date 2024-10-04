const API_BASE_URL = `https://api.open-meteo.com/v1`;
const API_GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1`;

const API_ICONS = `https://openweather.site/img/wn`;

export const ENDPOINTS = {
    city: `${API_GEOCODING_URL}/search`,
    forecast: `${API_BASE_URL}/forecast`,
    icons: `${API_ICONS}`,
}