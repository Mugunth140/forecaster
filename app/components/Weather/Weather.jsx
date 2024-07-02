import Styles from "./Weather.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Weather = ({ city, weather }) => {
  const container = document.querySelector(`.${Styles.container}`);
  const weatherRef = useRef();
  const temp = Math.round(weather.main.temp)
 
  useEffect(() => {
    gsap.set(container, {
      y: 400,
    });
  });

  return (
    <>
      <div ref={weatherRef} className={Styles.container}>
        <section className={Styles.weatherUp}>
          <div className={Styles.tempContainer}>
            <h1>{temp}°C</h1>
            <h1>{city}</h1>
          </div>
        </section>
        <section className={Styles.weatherDown}>
          <p>Description: {weather.weather[0].description}</p>
        </section>
      </div>
    </>
  );
};

export default Weather;
