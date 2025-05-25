export interface WeatherData {
 name: string;
 main: {
   temp: number;
   feels_like: number;
   humidity: number;
   pressure: number;
 };
 weather: {
   description: string;
   icon: string;
 }[];
 wind: {
   speed: number;
 };
}

const API_KEY = '2786caca4ed88c6e5470d7d3b76a54d7'; // Replace with your OpenWeatherMap API key

export async function getWeather(location: string): Promise<WeatherData> {
 const response = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
 );
 if (!response.ok) throw new Error('Location not found');
 return response.json();
}

export async function getCityWeather(city: string): Promise<WeatherData> {
 return getWeather(city);
}