import React, { useState, useEffect } from "react";
import Rain from "../Rain/Rain";
import Snowfall from "../Snow/Snow";
import Stars from "../Stars/Stars";
import s from "./Weather.module.css";

const Weather = (props) => {
  const { date, startTime } = props;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [lastDateTime, setLastDateTime] = useState({ date, startTime });

  useEffect(() => {
    if (lastDateTime.date !== date || lastDateTime.startTime !== startTime) {
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=Dnipro&key=9bc67e2b86874c51ac795b99781460ed`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data from Weatherbit.io");
          }
          return response.json();
        })
        .then((data) => {
          const weatherData = data.data.find(
            (item) => item.valid_date === date
          );
          if (!weatherData) {
            throw new Error(`No weather data available for the date ${date}`);
          }
          setWeather({
            temperature: Math.round(weatherData.app_max_temp),
            description: weatherData.weather.description,
          });
        })
        .catch((error) => {
          setError(error.message);
        });

      setLastDateTime({ date, startTime });
    }
  }, [date, startTime, lastDateTime]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Description: {weather.description}</p>
      {weather.description.includes("clouds") ||
      weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("drizzle") ||
      weather.description.includes("Thunderstorm") ||
      weather.description.toLowerCase().includes("snow") ? (
        <div className={s.clouds}>
          <img
            src={process.env.PUBLIC_URL + "/weather/clouds/cloud1.png"}
            style={{ "--i": 1 }}
            alt="cloud1"
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/clouds/cloud2.png"}
            style={{ "--i": 2 }}
            alt="cloud2"
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/clouds/cloud3.png"}
            style={{ "--i": 3 }}
            alt="cloud3"
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/clouds/cloud4.png"}
            style={{ "--i": 4 }}
            alt="cloud4"
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/clouds/cloud5.png"}
            style={{ "--i": 5 }}
            alt="cloud5"
          />
        </div>
      ) : null}

      {weather.description === "clear sky" ||
      (weather.description.includes("clouds") &&
        weather.description !== "Overcast clouds") ? (
        <div className={s.sun}></div>
      ) : null}

      {weather.description === "clear sky" ||
      (weather.description.includes("clouds") &&
        weather.description !== "Overcast clouds") ? (
        <div className={s.moon}>
          <img src={process.env.PUBLIC_URL + "/weather/moon.svg"} alt="moon" />
        </div>
      ) : null}
      {weather.description === "clear sky" ? <Stars /> : null}

      {weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("drizzle") ||
      weather.description.includes("Thunderstorm") ? (
        <Rain />
      ) : null}
      {weather.description.toLowerCase().includes("snow") ? <Snowfall /> : null}
    </div>
  );
};

export default Weather;
