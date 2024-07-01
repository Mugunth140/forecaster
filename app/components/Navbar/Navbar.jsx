import styles from "./Navbar.module.scss";
import { MdLocationPin } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Darkmode from "../Darkmode/Darkmode";
import { useState } from 'react';

const Navbar = ({ onCity, onCitySubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onCity(value);
  };

  const handleSubmit = () => {
    onCitySubmit();
  };

  return (
    <nav className={styles.navContainer}>
      <section>
        <div className={styles.navLocationContainer}>
          <MdLocationPin className={styles.navLocation} />
          Coimbatore
        </div>
        <div className={styles.darkmodeContainer}>
          <Darkmode />
        </div>
      </section>
       
      <aside>
        <div className={styles.navSearch}>
          <input
            className=""
            type="text"
            value={inputValue}
            onChange={handleChange}
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
