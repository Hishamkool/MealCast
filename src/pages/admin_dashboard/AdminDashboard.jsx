import React, { useState } from "react";
import "./AdminDashboard.css";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import DashboardHeader from "../../components/employee_components/DashboardHeader/DashboardHeader";
function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  const handleConfirmLogout = () => {
    logout();
    console.log(`${user?.username} logged out successfully`);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="admin-dash">
      <DashboardHeader username={user?.username} onLogout={handleLogoutClick} />
      <div className="admin-nav">
        <ul>
          <li>
            <a href="/admin/set-menu">Set Menu items</a>
          </li>
        </ul>
      </div>
      <div className="live-vote-tracking">
        <h3>Live Vote tracking</h3>
        <div>Breakfast</div>
        <div className="items-name-coutn">
          <span>Chapathi</span> <span>23</span>
        </div>
        <div>Lunch</div>
        <div>Dinner</div>
      </div>

      {/*  logout dialog box  */}
      <DialogBox
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleConfirmLogout()}
            >
              Sure
            </button>
          </>
        }
      />
    </div>
  );
}

export default AdminDashboard;
