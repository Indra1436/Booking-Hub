import React, { useState } from "react";
import "./SettingsSidebar.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import ChangePassword from "../changePassword/ChangePassword";

const SettingsSidebar = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleRightContent = () => {
    setShowChangePassword(true);
  };

  const handleToggleChangePassword =()=>{
    setShowChangePassword(!showChangePassword);
  }
  return (
    <div className="d-flex">
      {/*sidebar*/}
      <div className="settings-sidebar col-md-3 bg-light">
        <h5 className="p-3">Settings</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/settings/changePassword">
              <div className="settings-items" onClick={handleRightContent}>
                <div className="me-5">
                  <p>Change Password</p>
                </div>
                <div>
                  <i
                    className="fas fa-angle-right"
                    style={{ fontSize: "inherit" }}
                  ></i>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/*Main content (outlet)*/}
      <div className="settings-content flex-grow-1">
       {showChangePassword && <ChangePassword close={handleToggleChangePassword} />}
      </div> 
    </div>
  );
};

export default SettingsSidebar;
