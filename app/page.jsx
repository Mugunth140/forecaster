/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Navbar from '@/app/components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import { useEffect, useState, useRef, useCallback } from "react";
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
    debounce((cityData) => {
      setCity(cityData);
    }, 500),
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
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

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
  }, [lat, lon]);

  return (
    <>
      <Navbar onCity={handleCityChange} onCitySubmit={getCurrent} />
      <div ref={containerRef} className="weatherContainer">
        {loading ? (
          <div className="weatherLoader">Loading...</div>
        ) : error ? (
          <div className="weatherError">{error}</div>
        ) : (
          weather && <Weather city={city} weather={weather} />
        )}
      </div>
    </>
  );
}

export default Home;
