import './Navbar.module.scss';
import { MdLocationPin } from "react-icons/md";
import Darkmode from '../Darkmode/Darkmode'
const Navbar = () => {
  return (
    <nav className="navContainer">
      <div className="navLocation"><MdLocationPin />Coimbatore</div>
      <div className="navSearch">
        <input className="" type="text" placeholder="search on forecast.."  />
      </div>
      <div className="darkmodeContainer">
        <Darkmode />
      </div>
    </nav>
  );
};

export default Navbar;
