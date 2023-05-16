import React, { useState, useEffect } from "react";
// import Clouds from "../Clouds/Clouds";
// import Rain from "../Rain/Rain";
// import Counter from "../Counter/Counter";
// import Snowfall from "../Snow/Snow";
// import Stars from "../Stars/Stars";
// import Fog from "../Fog/Fog";
// import s from "./Weather.module.css";

const Weather = (props) => {
  const { date, startTime } = props;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [lastDateTime, setLastDateTime] = useState({ date, startTime });

  useEffect(() => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const daysDifference = Math.floor(
      (targetDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference >= 1 && daysDifference <= 5) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dnipro&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
      console.log(process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY);
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data from OpenWeatherMap");
          }
          return response.json();
        })
        .then((data) => {
          const weatherData = data.list.find(
            (item) => item.dt_txt.split(" ")[0] === date
          );
          if (!weatherData) {
            throw new Error(`No weather data available for the date ${date}`);
          }
          setWeather({
            temperature: Math.round(weatherData.main.temp),
            description: weatherData.weather[0].description,
          });
        })
        .catch((error) => {
          setError(error.message);
        });

      setLastDateTime({ date, startTime });
    } else if (daysDifference >= 6 && daysDifference <= 7) {
      const currentApiUrl = `https://api.weatherbit.io/v2.0/current?city=Dnipro&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`;

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
  }, [date, startTime]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div></div>;
  }
  return (
    <div>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Description: {weather.description}</p>
      {/* {weather.description.includes("clouds") ||
      weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("drizzle") ||
      weather.description.includes("Thunderstorm") ||
      weather.description.toLowerCase().includes("snow") ? (
        <Clouds />
      ) : null} */}

      {/* {weather.description === "clear sky" ||
      (weather.description.includes("clouds") &&
        weather.description !== "Overcast clouds") ? (
        <div className={s.sun}></div>
      ) : null} */}

      {/* {weather.description === "clear sky" ||
      (weather.description.includes("clouds") &&
        weather.description !== "Overcast clouds") ? (
        <div className={s.moon}>
          <img src={process.env.PUBLIC_URL + "/weather/moon.svg"} alt="moon" />
        </div>
      ) : null} */}
      {/* {weather.description === "clear sky" ? <Stars /> : null}

      {weather.description.toLowerCase().includes("rain") ||
      weather.description.toLowerCase().includes("drizzle") ||
      weather.description.includes("Thunderstorm") ? (
        <Rain />
      ) : null}
      {weather.description.toLowerCase().includes("snow") ? <Snowfall /> : null}
      <Fog /> */}
      {/* <Counter temperature={weather.temperature} /> */}
    </div>
  );
};

export default Weather;
