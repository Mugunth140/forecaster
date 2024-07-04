/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Navbar from '@/app/components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash.debounce';

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;


  const handleCityChange = useCallback(
    debounce((cityData) => {
      setCity(cityData);
    }, 500),
    []
  );

  const getLocation = async () => {
    if (city) {
      setLoading(true);
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${apiKey}`;
      
      try {
        const response = await fetch(currentUrl);
        const data = await response.json();
        setWeather(data);
        if (data.coord) {
          setLat(data.coord.lat);
          setLon(data.coord.lon);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getWeather = async () => {
    if (lat && lon) {
      setLoading(true);
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (lat && lon) {
      getWeather();
    }
  }, [lat, lon]);

  return (
    <>
      <Navbar onCity={handleCityChange} onCitySubmit={getLocation} />
      <div className='weatherContainer'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weather && <Weather city={city} weather={weather} />
        )}
      </div>
    </>
  );
}

export default Home;
