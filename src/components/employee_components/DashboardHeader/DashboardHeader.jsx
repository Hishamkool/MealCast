import React from "react";
import "./DashboardHeader.css";
function DashboardHeader({ username, onLogout }) {
  return (
    <div className="title">
      <div>
        <p className="welcome">Welcome back,</p>
        <p className="user-name"> {username ?? "Guest"}!</p>
      </div>
      <button className="btn-base logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardHeader;
