import { Link } from "react-router-dom";
import Nav from "./Nav";
import logo from "../../../../public/img/LogoBTZ.webp";

function Header() {
  return (
    <header>
      <Link to={"/"}>
        <img src={logo} alt="Balance Ta Zone logo" className="header-logo" />
        <h1>Balance Ta Zone</h1>
      </Link>

      <Nav />
    </header>
  );
}

export default Header;
