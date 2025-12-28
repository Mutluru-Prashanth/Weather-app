import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;


  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch weather");
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && weather.main && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: "100px", height: "100px" }}
          />
          <p><span className="label">Temperature:</span> <span className="value">{weather.main.temp}°C</span></p>
          <p><span className="label">Feels Like:</span> <span className="value">{weather.main.feels_like}°C</span></p>
          <p><span className="label">Humidity:</span> <span className="value">{weather.main.humidity}% 💧</span></p>
          <p><span className="label">Wind Speed:</span> <span className="value">{weather.wind.speed} m/s 🌬</span></p>
          <p><span className="label">Climate:</span> <span className="value">{weather.weather[0].main}</span></p>
          <p><span className="label">Description:</span> <span className="value">{weather.weather[0].description}</span></p>
        </div>
      )}

      <p className="footer">Powered by OpenWeatherMap</p>
    </div>
  );
}

export default App;
