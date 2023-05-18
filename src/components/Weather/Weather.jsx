import React, { useState, useEffect } from "react";
import Clouds from "../Clouds/Clouds";
import Rain from "../Rain/Rain";
import Lightning from "../Lightning/Lightning";
import Counter from "../Counter/Counter";
import Snowfall from "../Snow/Snow";
import Stars from "../Stars/Stars";
import Fog from "../Fog/Fog";
import Dust from "../Dust/Dust";
import RunningText from "../RunningText/RunningText";
import s from "./Weather.module.css";

const Weather = (props) => {
  const { date, startTime } = props;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [lastDateTime, setLastDateTime] = useState({ date, startTime });
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [sunriseLoaded, setSunriseLoaded] = useState(false);
  const [sunsetLoaded, setSunsetLoaded] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const daysDifference = Math.floor(
      (targetDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference >= 1 && daysDifference <= 5) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dnipro&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data from OpenWeatherMap");
          }
          return response.json();
        })
        .then((data) => {
          const dateTimeString = `${date}T${startTime}`;
          const dateTime = new Date(dateTimeString);
          const constMilliseconds = dateTime.getTime();
          const closestObject = data.list.reduce(
            (closest, obj) => {
              const dtMilliseconds = obj.dt;
              const diff = Math.abs(dtMilliseconds - constMilliseconds);

              if (diff < closest.diff) {
                return { diff, obj };
              }

              return closest;
            },
            { diff: Infinity }
          ).obj;

          if (!closestObject) {
            throw new Error(`No weather data available for the date ${date}`);
          }

          setWeather({
            temperature: (Math.round(closestObject.main.temp) - 32) * (5 / 9),
            description: closestObject.weather[0].description,
          });
        })
        .catch((error) => {
          setError(error.message);
        });
      setLastDateTime({ date, startTime });
    } else if (daysDifference >= 6 && daysDifference <= 7) {
      const currentApiUrl = `https://api.weatherbit.io/v2.0/current?city=Dnipro&key=${process.env.REACT_APP_WEATHERBIT_KEY}`;

      fetch(currentApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Failed to fetch current weather data from Weatherbit"
            );
          }
          return response.json();
        })
        .then((data) => {
          let currentWeatherData;
          if (daysDifference === 6) {
            currentWeatherData = data.data[5];
          } else {
            currentWeatherData = data.data[6];
          }
          setWeather({
            temperature: Math.round(currentWeatherData.temp),
            description: currentWeatherData.weather.description,
          });
        })
        .catch((error) => {
          setError(error.message);
        });

      setLastDateTime({ date, startTime });
    }

    const fetchSunriseSunset = async () => {
      const sunriseSunsetApiUrl = `https://api.sunrise-sunset.org/json?lat=48.4634&lng=35.0396&date=${date}&formatted=0`;

      try {
        const response = await fetch(sunriseSunsetApiUrl);
        const data = await response.json();

        setSunrise(data.results.sunrise);
        setSunset(data.results.sunset);
        setSunriseLoaded(true);
        setSunsetLoaded(true);
      } catch (error) {
        console.log("Error fetching sunrise-sunset data:", error);
      }
    };

    fetchSunriseSunset();
  }, [date, startTime]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div></div>;
  }

  const isDaytime =
    sunriseLoaded &&
    sunsetLoaded &&
    new Date(startTime).getTime() > new Date(sunrise).getTime() &&
    new Date(startTime).getTime() < new Date(sunset).getTime();

  return (
    <div>
      {weather.description.includes("clouds") ||
      weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("thunderstorm") ||
      weather.description.toLowerCase().includes("snow") ? (
        <Clouds />
      ) : null}

      {weather.description === "clear sky" ||
      weather.description !== "few clouds" ? (
        <div className={isDaytime ? s.sun : s.moon}>
          {isDaytime ? null : (
            <img
              src={process.env.PUBLIC_URL + "/weather/moon.svg"}
              alt="moon"
            />
          )}
        </div>
      ) : null}

      {weather.description === "clear sky" && isDaytime ? <Stars /> : null}

      {weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("drizzle") ||
      weather.description.includes("Thunderstorm") ? (
        <Rain />
      ) : null}

      {weather.description.includes("Thunderstorm") ? <Lightning /> : null}

      {weather.description.toLowerCase().includes("snow") ||
      weather.description.toLowerCase().includes("flurries") ||
      weather.description.toLowerCase().includes("sleet") ? (
        <Snowfall />
      ) : null}

      {weather.description.toLowerCase().includes("mist") ||
      weather.description.toLowerCase().includes("haze") ||
      weather.description.toLowerCase().includes("smoke") ? (
        <Fog />
      ) : null}

      <Counter temperature={weather.temperature} />
      {weather.description === "Unknown Precipitation" ? <RunningText /> : null}
      {weather.description === "Sand/dust" ? <Dust /> : null}
    </div>
  );
};

export default Weather;
