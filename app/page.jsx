'use client'
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from "react";

function Home() {
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const city = "Coimbatore";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data); 
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <>
      {weather && (
        <>
        <Navbar />
      <div className="container min-h-screen bg-gradient-to-r from-[#62cff4] to-[#2c67f2] animate-gradient">
        <div className="text-white text-center">
          <h2 className="text-4xl font-semibold mb-4">Weather in {city}</h2>
          <p className="text-2xl">Temperature: {weather.main.temp} °C</p>
          <p className="text-lg">Description: {weather.weather[0].description}</p>
        </div>
    </div>
    </>
      )}
    </>
  );
}

export default Home;
