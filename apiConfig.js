const API_BASE_URL = `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}`;
const API_ICONS = `https://openweather.site/img/wn`;

export const ENDPOINTS = {
    city: `${API_BASE_URL}/city`,
    icons: `${API_ICONS}`,
}