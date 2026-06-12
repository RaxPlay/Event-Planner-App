import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ user, setUser }) => {
  
  const logoutFunc = async() => {
    try {
      await axios.post("api/auth/logout");
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center mt-6">
      {user ? (
        <div id="nav-bar">
          <Link to="/home" className="flex items-center">
            <i className="fa-solid fa-home"></i>
          </Link>

          <Link to="/events" className="flex items-center">
            <i className="fa-regular fa-calendar"></i>
          </Link>

          <button onClick={logoutFunc} className="flex items-center">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      ) : (
        <div id="nav-bar">
          <Link to="/home" className="flex items-center">
            <i className="fa-solid fa-home"></i>
          </Link>

          <Link to="/login" className="flex items-center">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </Link>

          <Link to="/sign-up" className="flex items-center">
            <i className="fa-solid fa-user-plus"></i>
          </Link>
        </div>
      )}
    </div>
  );
};
