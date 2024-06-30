'use client'
import Navbar from '@/app/components/Navbar/Navbar';
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
       <div className="bg-gradient-to-r from-[#62cff4] to-[#2c67f2]">
        <div >
          <h2 >Weather in {city}</h2>
          <p >Temperature: {weather.main.temp} °C</p>
          <p >Description: {weather.weather[0].description}</p>
        </div>
    </div>
    </>
      )}
    </>
  );
}

export default Home;
