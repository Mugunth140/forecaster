// components/WeatherForecast/WeatherForecast.js
import React from "react";

import Image from "next/image";
import Styles from "./Forecast.module.scss";

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) {
    return <p>Loading forecast...</p>;
  }

  // Extract next 3-hour forecast and 5-day forecast
  const nextThreeHours = forecast.list.slice(0, 3);
  const fiveDays = forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <div className={Styles.forecastContainer}>
      <div className={Styles.nextThreeHours}>
        <h2>3-Hour Forecast</h2>
        <div className={Styles.forecastItems}>
          {nextThreeHours.map((hour, index) => (
            <div key={index} className={Styles.forecastItem}>
              <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
              <Image
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                width={64}
                height={64}
                className={Styles.weatherIcon}
              />
              <p>{Math.round(hour.main.temp)}°C</p>
              <p>{hour.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={Styles.fiveDays}>
        <h2>5-Day Forecast</h2>
        <div className={Styles.forecastItems}>
          {fiveDays.map((day, index) => (
            <div key={index} className={Styles.forecastItem}>
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <Image
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className={Styles.weatherIcon}
                width={64}
                height={64}
              />
              <p>{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
