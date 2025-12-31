import { Droplets, Wind, Gauge, Eye, Sun, CloudRain } from "lucide-react";
import type { WeatherData } from "../../types/weather";
import { useApp } from "../../context/AppContext";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { state, toggleTemperatureUnit } = useApp();
  const { temperatureUnit } = state;
  const temp =
    temperatureUnit === "celsius"
      ? Math.round(weather.temperature)
      : Math.round(weather.temperatureF);
  const unit = temperatureUnit === "celsius" ? "°C" : "°F";

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          {weather.region && <p className="region">{weather.region}</p>}
          <p className="description">{weather.description}</p>
          <p className="time">{weather.localtime}</p>
        </div>

        <button className="unit-toggle" onClick={toggleTemperatureUnit}>
          {temperatureUnit === "celsius" ? "°F" : "°C"}
        </button>
      </div>

      <div className="weather-icon-wrapper">
        <img src={`https:${weather.icon}`} alt={weather.description} />
      </div>

      <div className="weather-temp">
        <h1>
          {temp}
          {unit}
        </h1>
      </div>

      <div className="weather-grid">
        <WeatherItem
          icon={<Droplets />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <WeatherItem
          icon={<Wind />}
          label={`Wind ${weather.windDir}`}
          value={`${weather.windSpeed} km/h`}
        />
        <WeatherItem
          icon={<Gauge />}
          label="Pressure"
          value={`${weather.pressure} mb`}
        />
        <WeatherItem
          icon={<Eye />}
          label="Visibility"
          value={`${weather.visibility} km`}
        />
        <WeatherItem
          icon={<CloudRain />}
          label="Cloud"
          value={`${weather.cloud}%`}
        />
        <WeatherItem
          icon={<Sun />}
          label="UV Index"
          value={weather.uv.toString()}
        />
      </div>
    </div>
  );
}

function WeatherItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="weather-item">
      <div className="icon">{icon}</div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}
