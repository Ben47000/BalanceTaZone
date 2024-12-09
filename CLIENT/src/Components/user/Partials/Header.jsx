import { Link } from "react-router-dom";
import Nav from "./Nav";

function Header() {
  return (
    <header>
      <Link to={"/"}>
        <h1>Balance Ta Zone</h1>
      </Link>

      <Nav />
    </header>
  );
}

export default Header;
