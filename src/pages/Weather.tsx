import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Cloud, MapPin, AlertCircle } from "lucide-react";
import { useWeather } from "../context/UseWeather";
import { WeatherSearch } from "../components/weather/WeatherSearch";
import { WeatherCard } from "../components/weather/WeatherCard";

export default function Weather() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { weather, isLoading, error, searchWeather } = useWeather();

  const cityParam = searchParams.get("city");

  useEffect(() => {
    if (cityParam) {
      searchWeather(cityParam);
    }
  }, []);

  const handleSearch = (city: string) => {
    setSearchParams({ city });
    searchWeather(city);
  };

  return (
    <div className="weather-page">
      <div className="weather-search-card">
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {error && (
        <div className="weather-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="weather-loading">
          <div className="loader-circle" />
          <div className="loader-line large" />
          <div className="loader-line small" />
        </div>
      )}

      {weather && !isLoading && <WeatherCard weather={weather} />}

      {!weather && !isLoading && !error && (
        <div className="weather-empty">
          <div className="empty-icon">
            <Cloud size={40} />
          </div>

          <h3>Search for a City</h3>

          <p>
            Enter a city name above to get current weather conditions including
            temperature, humidity, and wind speed.
          </p>

          <div className="empty-hint">
            <MapPin size={16} />
            <span>Try searching for "Kathmandu" or "Lalitpur"</span>
          </div>
        </div>
      )}
    </div>
  );
}
