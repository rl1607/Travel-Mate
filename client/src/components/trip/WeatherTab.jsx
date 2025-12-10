import React, { useEffect, useState } from "react";

export default function WeatherTab({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  const fetchWeather = async () => {
    try {
      // API for weather by city name
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        destination
      )}&appid=${API_KEY}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) throw new Error("Not found");

      setWeather(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [destination]);

  if (loading)
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <div className="loader" />
        <p style={{ marginTop: 10 }}>Loading weather...</p>
      </div>
    );

  if (!weather)
    return (
      <div className="card">
        <h3>Weather Info</h3>
        <p className="muted">Unable to fetch weather for this location.</p>
      </div>
    );

  return (
    <div className="card">
      <h3 style={{ marginBottom: 20 }}>
        Weather in <strong>{destination}</strong>
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          alt="Weather Icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />

        <div>
          <h1 style={{ fontSize: 42, margin: 0 }}>
            {weather.main.temp}°C
          </h1>
          <p style={{ fontSize: 18, color: "#666", marginTop: -6 }}>
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
      </div>
    </div>
  );
}
