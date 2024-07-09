import React from "react";
import Image from "next/image";
import Styles from "./Weather.module.scss";
import { WiHumidity, WiCloudyWindy } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import Forecast from "../Forecast/Forecast";

const Weather = ({ city, weather, forecast }) => {
  if (!weather || !weather.main || !weather.weather || !weather.wind || !weather.sys) {
    return <p>Loading...</p>;
  }

  const temp = Math.round(weather.main.temp);
  const maxTemp = Math.round(weather.main.temp_max);
  const windSpeed = Math.round(weather.wind.speed);

  return (
    <>
      <div className={Styles.container}>
        <section className={Styles.weatherUp}>
          <div className={Styles.tempContainer}>
            <h1 className={Styles.temp}>
              {temp}°C{" "}
              <Image
                src="/images/cloudy.png"
                alt="weather-icon not found"
                height={512}
                width={512}
              />
            </h1>
            <h1 className={Styles.description}>
              {weather.weather[0].main}
            </h1>
          </div>
          <div className={Styles.cityContainer}>
            <h1 className={Styles.city}>
              {city}, {weather.sys.country}
            </h1>

            <div className={Styles.cityUtils}>
              <div className={Styles.util}>
                Pressure <FaWind /> <h2>{weather.main.pressure}</h2>
              </div>
              <div className={Styles.util}>
                Humidity <WiHumidity /> <h2>{weather.main.humidity}%</h2>
              </div>
              <div className={Styles.util}>
                Max Temp <FaTemperatureArrowUp /> <h2>{maxTemp}°C</h2>
              </div>
              <div className={Styles.util}>
                Wind Speed <WiCloudyWindy /> <h2>{windSpeed} km/h</h2>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.weatherDown}>
          <Forecast forecast={forecast} />
        </section>
      </div>
    </>
  );
};

export default Weather;
