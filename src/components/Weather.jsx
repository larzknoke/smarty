import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  Umbrella,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState({});

  async function getWeatherData() {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.828&longitude=9.4455&current=temperature_2m,rain&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1"
    );
    const wData = await data.json();
    setWeatherData(wData);
  }

  useEffect(() => {
    getWeatherData();
    console.log("weather data", weatherData);
  }, []);

  function getWeatherIcon(codes) {
    if ([0, 1, 2, 3].filter((el) => codes?.includes(el)).length > 0) {
      return <CloudSun size={32} />;
    } else {
      return <Sun size={32} />;
    }
  }

  return (
    <div>
      <div className="rounded-md py-2 p-3 shadow-md flex gap-2 bg-orange-100">
        {getWeatherIcon(weatherData.daily?.weather_code)}
        <span className="text-3xl font-semibold">
          {weatherData.current?.temperature_2m}°
        </span>
        <div className="flex flex-col text-xs justify-around">
          <span>{weatherData.daily?.temperature_2m_min[0]}°</span>
          <span>{weatherData.daily?.temperature_2m_max[0]}°</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
