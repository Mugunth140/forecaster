import styles from "./Navbar.module.scss";
import { MdLocationPin } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Darkmode from "../Darkmode/Darkmode";

const Navbar = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navLocationContainer}>
        <MdLocationPin className={styles.navLocation} />
        Coimbatore
      </div>
      <div className={styles.navSearch}>
        <input className="" type="text" placeholder="search on forecast.." />
        <button>
          <FiSearch />
        </button>
      </div>
      <div className={styles.darkmodeContainer}>
        <Darkmode />
      </div>
    </nav>
  );
};

export default Navbar;
