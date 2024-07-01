// components/DarkModeToggle.js

import { useState, useEffect } from 'react';
import styles from './Darkmode.module.scss';

const Darkmode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={styles.toggleSwitch}>
    <input
      type="checkbox"
      className={styles.checkbox}
      id="darkModeToggle"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
    <label className={styles.label} htmlFor="darkModeToggle">
      <span className={styles.sun}></span>
      <span className={styles.moon}></span>
      <span className={styles.switch} />
    </label>
  </div>
  );
};

export default Darkmode;
