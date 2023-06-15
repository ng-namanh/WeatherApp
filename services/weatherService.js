import axios from 'axios';

const API_BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'c5a097a5b90a4b67904161254230906';

export async function getForecastWeatherData(location) {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 4,
        aqi: 'no',
        alerts: 'no'
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}
