import React, { useState, useEffect } from "react";

const Weather = (props) => {
  const { date, startTime } = props;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [lastDateTime, setLastDateTime] = useState({ date, startTime });

  useEffect(() => {
    if (lastDateTime.date !== date || lastDateTime.startTime !== startTime) {
      const timestamp = new Date(`${date} ${startTime}`).getTime() / 1000;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dnipro&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}&units=metric&dt=${timestamp}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data from OpenWeatherMap");
          }

          return response.json();
        })
        .then((data) => {
          setWeather({
            temperature: Math.round(data.main.feels_like),
            description: data.weather[0].description,
          });
        })
        .catch((error) => {
          setError(error.message);
        });

      setLastDateTime({ date, startTime });
    }
  }, [date, startTime]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }
  console.log(weather.temperature);
  console.log(weather.description);
  console.log(date, startTime);

  return (
    <div>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Description: {weather.description}</p>
    </div>
  );
};

export default Weather;
