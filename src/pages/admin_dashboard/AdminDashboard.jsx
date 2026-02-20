import React, { useEffect, useMemo, useState } from "react";
import "./AdminDashboard.css";
import DialogBox from "../../components/DialogBox/DialogBox";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import DashboardHeader from "../../components/employee_components/DashboardHeader/DashboardHeader";
import { fetchTodaysSubmissions } from "../../services/meals/mealSubmission.service";
import { structureSubmissions } from "../../utils/structureSubmissions.utils";
import { BlinkBlur } from "react-loading-indicators";
function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  useEffect(() => {
    /*    const fetchSubmissions = async () => {
      try {
        setLoadingSubmissions(true);
        const response = await fetchTodaysSubmissions();
        setSubmissions(response || []);
      } catch (error) {
        console.error("fetching submissions error", error);
      } finally {
        setLoadingSubmissions(false);
      }
    };
    fetchSubmissions(); */

    const unsubscribe = fetchTodaysSubmissions((data) => {
      setSubmissions(data);
      setLoadingSubmissions(false);
    });

    return () => unsubscribe();
  }, []);

  // structured data of submissions
  const structuredData = useMemo(() => {
    return structureSubmissions(submissions);
  }, [submissions]);

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

      <section className="live-vote-tracking">
        <h3 className="admin-dashboard__title">Live Vote Tracking</h3>

        {loadingSubmissions && (
          <div className="admin-dashboard__message">
            <BlinkBlur
              color="hsl(243, 70%, 50%)"
              size="small"
              text="Loading submissions..."
              textColor="black"
            />
          </div>
        )}

        {/* {!loadingSubmissions && submissions.length === 0 && (
          <p className="admin-dashboard__message">No submissions yet</p>
        )} */}

        {!loadingSubmissions &&
          Object.values(structuredData).map((mealData) => {
            return (
              <div key={mealData.mealTime} className="admin-dashboard__section">
                <div className="admin-dashboard__section-header">
                  <h4>{mealData.label}</h4>
                </div>
                <div className="admin-dashboard__stats">
                  <p>Voters: {mealData.uniqueUsersCount}</p>
                  <p>Opted Out: {mealData.optedOutCount}</p>
                  <p>Total Submissions: {mealData.totalSubmissions}</p>
                </div>
                {Object.keys(mealData.foodItems).length > 0 ? (
                  <table className="food-count-table">
                    <thead>
                      <tr>
                        <th>Food Item</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(mealData.foodItems).map(
                        ([foodName, count]) => (
                          <tr key={foodName}>
                            <td>{foodName}</td>
                            <td>{count}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p className="admin-dashboard-no-food">
                    No votes for this meal
                  </p>
                )}
              </div>
            );
          })}
      </section>

      <div className="center-btn">
        <Link
          to={ROUTES.ADMIN_SETMENU}
          className="admin-dash-setMenuBtn btn-base"
        >
          {" "}
          SET MENU
        </Link>
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
