'use client'
import Navbar from '@/app/components/Navbar/Navbar';
import { useState } from "react";

function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleCitySubmit = () => {
    if (city) { // Only fetch weather if city is provided
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
      <div className="bg-gradient-to-r from-[#62cff4] to-[#2c67f2]">
        {weather && weather.main && weather.weather && weather.weather[0] && (
          <div>
            <h2>Weather in {city}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Description: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
