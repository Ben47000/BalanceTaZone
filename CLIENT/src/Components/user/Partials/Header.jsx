import { Link } from "react-router-dom";
import Nav from "./Nav";
import logo from "../../../assets/img/LogoBTZ.webp";
import "../../../assets/css/_header.scss";  


function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Balance Ta Zone logo" className="header-logo" />
          <h1 className="header-title">Balance Ta Zone</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;