import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Main_logo.png"
import Popup from 'reactjs-popup'; // Correct import
import "./Navbar.css";
import { Login } from "../../login/Login";
import Location from "../location/Location";
import Sidebar from "../sidebar/Sidebar";
import SearchBar from "../searchBar/SearchBar";
import { CgProfile } from "react-icons/cg";
import { SiGooglemaps } from "react-icons/si";
import axios from "axios";

const Navbar = () => {
  const [loginActive, setLoginActive] = useState(false);
  const [theme, setTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [fullName, setFullName] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("select location");

  useEffect(() => {
    var token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:5000/getUserData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  
  // Theme change (dark/light mode)
  const themeChange = () => {
    setTheme(!theme);
  };

  // Toggle login popup visibility
  const toggleLoginPopup = () => {
    setLoginActive(!loginActive);
  };

  // Handle login success (update login state and user name)
  const handleLoginSuccess = (userFullName) => {
    if (userFullName) {
      setIsLoggedIn(true);
      setFullName(userFullName);
      toggleLoginPopup(); // Close popup after successful login
    }
  };

  // Handle location changes
  const handleLocation = () => {
    setOpenLocation(true);
  };

  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  const handleLocationChange = (city) => {
    setCurrentLocation(city);
    setOpenLocation(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setFullName("");
  };

  // Update body class based on theme change
  useEffect(() => {
    document.body.className = theme ? "dark-mode" : "light-mode";
  }, [theme]);

  // Handle sidebar visibility
  const toggleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div className="navbar">
      <div className="navUp">
        {/* Logo */}
        <div className="logo">
          <img
            src={logo}
            alt="Booking Hub Logo"
            className="logo-img"
          />
        </div>

        {/* Search bar */}
        <div className="search-container">
          <SearchBar />
        </div>

        {/* Location, Sign In, and Menu */}
        <div className="nav-actions">
          <div className="theme" onClick={themeChange}>
            {theme ? "Light-Mode" : "Dark-Mode"}
          </div>

          {/* Location with Popup */}
          <Popup
            open={openLocation}
            closeOnDocumentClick
            onClose={handleCloseLocation}
            position="bottom center"
            contentStyle={{ width: "300px", padding: "20px", background: "#fff" }}
          >
            <Location
              handleLocationChange={handleLocationChange}
              handleCloseLocation={handleCloseLocation}
            />
          </Popup>

          <div className="location" onClick={handleLocation}>
            <p>
              <SiGooglemaps /> <span>Location</span>
            </p>
          </div>

          {/* Login component */}
          {isLoggedIn ? (
            <button className="sign-in-button" onClick={toggleSidebar}>
              <span>
                <CgProfile />
              </span>
            </button>
          ) : (
            <button className="sign-in-button" onClick={toggleLoginPopup}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Component */}
      {openSideBar && (
        <>
          <Sidebar
            isOpen={openSideBar}
            onClose={toggleSidebar}
            setIsLoggedIn={setIsLoggedIn}
          />
          {/* Overlay to close the sidebar */}
          <div className="overlay" onClick={toggleSidebar}></div>
        </>
      )}

      {/* Conditional rendering of the login popup */}
      {loginActive && (
        <div className="popup-overlay" onClick={toggleLoginPopup}>
          <div onClick={(e) => e.stopPropagation()}>
            <Login userLoginData={handleLoginSuccess} />
            <button className="close-button" onClick={toggleLoginPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
