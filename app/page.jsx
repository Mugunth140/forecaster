'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import debounce from 'lodash.debounce';
import gsap from 'gsap';

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    gsap.set(".weatherContainer", {
      duration: 200,
      y: 400,
      ease: 'power3'
    });
  }, []);

  const handleCityChange = useCallback(
    (cityData) => {
      setCity(cityData);
    },
    []
  );

  const getCurrent = async () => {
    if (city) {
      setLoading(true);
      setError(null);
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=${apiKey}`;
      
      try {
        const response = await fetch(currentUrl);
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
          if (data.coord) {
            setLat(data.coord.lat);
            setLon(data.coord.lon);
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getForecast = async () => {
    if (lat && lon) {
      setLoading(true);
      setError(null);
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
          setForecast(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (lat && lon) {
      getForecast();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  return (
    <>
      <Navbar onCity={handleCityChange} onCitySubmit={getCurrent} />
      <div ref={containerRef} className="weatherContainer">
        {loading && <p className="weatherLoader">Loading...</p>}
        {error && <p className="weatherError">{error}</p>}
        {weather && <Weather city={city} weather={weather} forecast={forecast} />}
      </div>
    </>
  );
}

export default Home;
