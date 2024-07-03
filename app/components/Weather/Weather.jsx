import Image from "next/image";
import Styles from "./Weather.module.scss";
import { WiHumidity, WiCloudyWindy } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";

const Weather = ({ city, weather }) => {
  const temp = Math.round(weather.main.temp);

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
            <h1 className={Styles.description}>{weather.weather[0].description}</h1>
          </div>
          <div className={Styles.cityContainer}>
            <h1 className={Styles.city}>{city} | {weather.sys.country}</h1>

            <div className={Styles.cityUtils}>
              <div className={Styles.util}>Pressure   <FaWind />               <h1>{weather.main.pressure}</h1></div>
              <div className={Styles.util}>Humidity  <WiHumidity />            <h1>{weather.main.humidity}</h1></div>
              <div className={Styles.util}>Max Temp   <FaTemperatureArrowUp /> <h1>{weather.main.temp_max}</h1></div>
              <div className={Styles.util}>Wind Speed <WiCloudyWindy />        <h1>   {weather.wind.speed}</h1></div>
            </div>
          </div>
        </section>

        <section className={Styles.weatherDown}>
          <p>Description: {city}</p>
        </section>
      </div>
    </>
  );
};

export default Weather;
