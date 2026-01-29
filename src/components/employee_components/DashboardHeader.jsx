import React from "react";

function DashboardHeader({ username, onLogout }) {
  return (
    <div className="title">
      <h1>Hello, {username ?? "Guest"}!</h1>
      <button className="btn-base logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardHeader;
