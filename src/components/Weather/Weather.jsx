import React, { useState, useEffect } from "react";

const Weather = ({ date, temperature }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Dnipro&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };
    getWeatherData();
  }, [apiKey]);

  return (
    <div>
      <h2>{date}</h2>
      <p>Temperature: {temperature} &#8451;</p>
      {weather && (
        <div>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} &#8451;</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
