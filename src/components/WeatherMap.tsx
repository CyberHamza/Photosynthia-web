import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleSequential } from 'd3-scale';
import { interpolateYlOrRd, interpolateBlues } from 'd3-scale-chromatic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWeather } from '../services/weatherService';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type WeatherMapProps = {
  onHover?: (location: { name: string }) => void;
};

export default function WeatherMap({ onHover }: WeatherMapProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [cities, setCities] = useState<any[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorCity, setErrorCity] = useState<string | null>(null);

  const tempColorScale = scaleSequential(interpolateYlOrRd).domain([-20, 50]);
  const precipColorScale = scaleSequential(interpolateBlues).domain([0, 100]);

  useEffect(() => {
    if (zoom > 3) {
      fetchCities(position[0], position[1], zoom);
    }
  }, [position, zoom]);

  const fetchCities = async (lng: number, lat: number, zoom: number) => {
    try {
      setLoading(true);
      const radius = Math.floor(1000 / zoom);
      const response = await fetch(
        `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&radius=${radius}&maxRows=50&username=cyberhamza`
      );
      const data = await response.json();
      setCities(data.geonames || []);
    } catch (error) {
      console.error("City fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationHover = async (location: any) => {
    try {
      setErrorCity(null);
      if (!weatherData[location.name]) {
        const data = await getWeather(location.name);
        setWeatherData(prev => ({ ...prev, [location.name]: data }));
      }
      setHoveredLocation(location);
      onHover?.(location);
    } catch (error) {
      console.error("Weather fetch failed:", error);
      setErrorCity(location.name);
    }
  };

  const handleMapMove = (event: any) => {
    setZoom(event.zoom);
    setPosition(event.coordinates);
  };

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-blue-50 to-blue-100">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={position}
          zoom={zoom}
          onMoveEnd={handleMapMove}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: '#DDD', stroke: '#FFF' },
                    hover: { fill: '#3B82F6', stroke: '#FFF' }
                  }}
                />
              ))
            }
          </Geographies>

          {zoom > 3 &&
            cities.map(city => (
              <Marker key={`${city.lng}-${city.lat}`} coordinates={[+city.lng, +city.lat]}>
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 4 + zoom / 2 }}
                  fill={
                    weatherData[city.name]?.main?.temp
                      ? tempColorScale(weatherData[city.name].main.temp)
                      : '#EF4444'
                  }
                  stroke="#FFF"
                  strokeWidth={0.5}
                  onMouseEnter={() =>
                    handleLocationHover({ name: city.name, coordinates: [+city.lng, +city.lat] })
                  }
                  className="cursor-pointer"
                />
                {zoom > 5 && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    textAnchor="middle"
                    y={-10}
                    className="text-xs font-medium fill-gray-800 pointer-events-none"
                  >
                    {city.name}
                  </motion.text>
                )}
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Weather card on hover */}
      <AnimatePresence>
        {hoveredLocation && weatherData[hoveredLocation.name] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 bg-white/90 rounded-xl shadow-xl p-4 w-72 border"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{hoveredLocation.name}</h3>
                <p className="text-sm capitalize text-gray-500">
                  {weatherData[hoveredLocation.name].weather[0].description}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData[hoveredLocation.name].weather[0].icon}@2x.png`}
                  className="w-12 h-12"
                />
                <span className="text-2xl font-bold">
                  {Math.round(weatherData[hoveredLocation.name].main.temp)}°C
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {errorCity && (
        <div className="absolute bottom-6 left-6 p-3 bg-red-200 text-red-800 rounded shadow">
          Failed to load weather for {errorCity}.
        </div>
      )}

      {loading && (
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-sm">
          Loading cities...
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setZoom(z => Math.min(z + 0.5, 8))}
          className="bg-white w-8 h-8 rounded-full shadow hover:bg-gray-200"
        >
          +
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
          className="bg-white w-8 h-8 rounded-full shadow hover:bg-gray-200"
        >
          -
        </button>
      </div>
    </div>
  );
}
