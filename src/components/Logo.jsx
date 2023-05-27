import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header>
      <Link
        to="/"
        className="mb-12 flex items-center justify-center gap-4 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <img src={logo} alt="Chit-Chat logo" className="w-12" />
        <h1 className="text-4xl text-white">Chit&#8722;Chat</h1>
      </Link>
    </header>
  );
};

export default Header;
