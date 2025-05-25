import { useState } from 'react';
import { getWeather} from '../services/weatherService';
import type { WeatherData } from '../services/weatherService';

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('City not found. Try another location.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Weather Check</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{weather.name}</h3>
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <span className="text-3xl">{Math.round(weather.main.temp)}°C</span>
          </div>
          <p>Humidity: {weather.main.humidity}%</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}