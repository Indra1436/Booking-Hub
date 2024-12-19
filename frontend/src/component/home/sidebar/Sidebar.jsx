import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextData } from '../../contextData/ContextData';
import {
  FaTicketAlt,
  FaBell,
  FaBoxOpen,
  FaPlayCircle,
  FaCreditCard,
  FaHeadphonesAlt,
  FaUserCog,
  FaTrophy,
  FaExchangeAlt
} from 'react-icons/fa';
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose, setIsLoggedIn}) => {
      const {fullName} = useContext(ContextData);
      const navigate = useNavigate("")

      const handleLogOut = ()=>{
        localStorage.removeItem("token")
        navigate("/");
        onClose();
        setIsLoggedIn(false)

      }
  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      ></div>

      {/* Sidebar Container */}
      <div className={`offcanvas-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Profile Section */}
        <div className="profile-section text-center mb-5">
          <h4 className="font-semibold">Hey,{fullName}</h4>
          <Link to={'/userProfile'} className="text-info hover:underline">
            Edit Profile
          </Link>
        </div>

        {/* Sidebar Links */}
        <ul className="list-unstyled">
          <li className="sidebar-item">
            <Link to="#">
              <FaTicketAlt className="mr-3" />
              Get tickets on Email!
            </Link>
            <p>Add your Email Address</p>
          </li>

          <li className="sidebar-item">
            <Link to="#">
              <FaBell className="mr-3" />
              Notifications
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/bookingHistory">
              <FaBoxOpen className="mr-3" />
              Your Orders
            </Link>
            <p>View your bookings & purchases</p>
          </li>

          <li className="sidebar-item">
            <Link to="#">
              <FaHeadphonesAlt className="mr-3" />
              Help & Support
            </Link>
            <p>View commonly asked queries and Chat</p>
          </li>

          <li className="sidebar-item">
            <Link to="/settings">
              <FaUserCog className="mr-3" />
              Accounts & Settings
            </Link>
            <p>Location, Payments, Permissions & More</p>
          </li>


        </ul>

        {/* Sign Out Button */}
        <div className="mt-5">
          <button className="signout-btn w-100" onClick={handleLogOut}>Sign Out</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
