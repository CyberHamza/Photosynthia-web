import { useState } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import WeatherMap from '../components/WeatherMap';
import { getWeather } from '../services/weatherService';

export default function WeatherPage() {
  const [mapWeather, setMapWeather] = useState<any>(null);

  const handleMapHover = async (location: { name: string }) => {
    try {
      const data = await getWeather(location.name);
      setMapWeather(data);
    } catch (error) {
      setMapWeather(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Weather Forecast</h1>
      
      <WeatherWidget />
      
      {mapWeather && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{mapWeather.name}</h3>
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${mapWeather.weather[0].icon}.png`}
              alt={mapWeather.weather[0].description}
            />
            <span className="text-2xl">{Math.round(mapWeather.main.temp)}°C</span>
          </div>
          <p>Humidity: {mapWeather.main.humidity}%</p>
          <p className="capitalize">{mapWeather.weather[0].description}</p>
        </div>
      )}
      
      <WeatherMap onHover={handleMapHover} />
    </div>
  );
}