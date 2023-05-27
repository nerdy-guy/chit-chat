import React from "react";
import Logout from "./Logout";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="mx-auto flex max-w-2xl justify-center p-4 md:py-8">
      <div
        to="/"
        className="roundedfocus-visible:outline mb-1 mr-auto flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <img src={logo} alt="Chit-Chat logo" className="w-8" />
        <h1 className="text-indigo-500 md:text-xl">Chit&#8722;Chat</h1>
      </div>
      <Logout />
    </div>
  );
};

export default Header;
