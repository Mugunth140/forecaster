import styles from "./Navbar.module.scss";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import Darkmode from "../Darkmode/Darkmode";
import { useState, useEffect, useRef } from 'react';
import gsap from "gsap";

const Navbar = ({ onCity, onCitySubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const expandRef = useRef();

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onCity(value);
  };

  const handleSubmit = () => {
    if (typeof onCitySubmit === 'function') {
      onCitySubmit();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    gsap.set(expandRef.current, {
      y: 300,
    });
  }, []);

  return (
    <nav className={styles.navContainer}>
      <section>
        <div className={styles.navLocationContainer}>
          <TiWeatherPartlySunny className={styles.navLocation} />
          <h3>Forecaster</h3>
        </div>
        <div className={styles.darkmodeContainer}>
          <Darkmode />
        </div>
      </section>
      
      {/* hero text animation */}
      <div className={styles.hero}>
        <h1>Accurate weather updates with Forecaster</h1>
      </div>

      {/* navbar search */}
      <aside className={styles.navExpand} ref={expandRef}>
        <div className={styles.navSearch}>
          <input
            className={styles.navInput}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="search on forecast..."
          />
          <button onClick={handleSubmit}>
            <FiSearch />
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
