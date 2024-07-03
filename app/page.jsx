'use client'
import Navbar from '@/app/components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import { useEffect, useState } from "react";

function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // useEffect(() => {
  //   gsap.set
  // })

  const handleCitySubmit = () => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCityChange = (cityData) => {
    setCity(cityData);
  };

  return (
    <>
      <Navbar onCity={handleCityChange} onCitySubmit={handleCitySubmit} />
      <div className="weatherContainer">
        {weather && weather.main && weather.weather && weather.weather[0] && (
          <Weather  city={city} weather={weather}/>
        )} 
      </div>
    </>
  );
}

export default Home;
