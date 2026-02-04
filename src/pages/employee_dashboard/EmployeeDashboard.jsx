import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEAL_OPTIONS } from "../../constants/meals";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import FoodCard from "../../components/FoodCard/FoodCard";
import "./EmployeeDashboard.css";
import { SnackBarContext } from "../../context/SnackBarContext";
import DashboardHeader from "../../components/employee_components/DashboardHeader/DashboardHeader";
import MealTimeSelector from "../../components/employee_components/MealTimeSelector/MealTimeSelector";
import MealHeader from "../../components/employee_components/MealHeader/MealHeader";
import SubmissionSummary from "../../components/employee_components/SubmissionSummary/SubmissionSummary";
import SubmitButton from "../../components/employee_components/SubmitButton/SubmitButton";
import DialogBox from "../../components/DialogBox/DialogBox";

const EMPTY_MEAL_STATE = {
  optedOut: false,
  submitted: false,
  selectedMeal: null,
  payload: null,
};
function EmployeeDashboard() {
  const { user, logout } = useAuth(); //login authentication
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);

  const [mealTime, setMealTime] = useState(Object.keys(MEAL_OPTIONS)[0]); // meal time status "lunch""dinner"
  /* changing to single value of truth */
  const [mealState, setMealState] = useState({}); // to manage all the states of the selected , submitted , optedout meals bases on meal time
  /* 
  mealState = {
    breakfast: { ... },
    lunch: { ... },
    dinner: { ... }
  }
   */
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // to show and hide logout dialog box
  const [showOptOutDialog, setShowOptOutDialog] = useState(false); // to show or hide opt out confirmation dialog
  const mealTitle = mealTime.charAt(0).toUpperCase() + mealTime.slice(1);
  const currentMenu = MEAL_OPTIONS[mealTime]; // for menu options based on meal time - breakfast , lunch ..

  /* SINGLE SOURCE OF TRUTH FOR THE MEALS SELECTION , SUBMITION , OPTING OUT ETC */
  const currentMealState = mealState[mealTime] ?? EMPTY_MEAL_STATE;
  const selectedMeal = currentMealState.selectedMeal;
  const optedOut = currentMealState.optedOut;
  const alreadySubmitted = currentMealState.submitted;

  // food card selection
  const handleMealSelection = (meal, count) => {
    setMealState((prev) => ({
      ...prev,
      [mealTime]: {
        ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
        selectedMeal: { ...meal, count },
        optedOut: false,
      },
    }));
  };
  // submitting meals
  const handleSubmitMeals = () => {
    if (alreadySubmitted) {
      showSnackBar(`Already submitted for ${mealTime}`, "error");
      return;
    }
    if (!selectedMeal && !optedOut) {
      showSnackBar("Please select a meal or opt out", "warning");
      return;
    }
    const payload = {
      user: user?.username ?? "Guest",
      submittedAt: new Date().toISOString(), // sample 2026-01-28T13:12:10.123Z
      mealTime,
      meal: optedOut ? null : selectedMeal,
      optedOut,
    };
    setMealState((prev) => ({
      ...prev,
      [mealTime]: {
        ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
        submitted: true,
        payload: payload,
      },
    }));
    console.log("Submitted meal payload:", payload);

    showSnackBar("Successfully submitted", "success");
  };

  // logout function
  // logout click to open dialog box
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  const handleConfirmLogout = () => {
    logout();
    console.log(`${user?.username} logged out successfully`);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  // opt out function
  const handleOptOutClick = () => {
    if (alreadySubmitted) return;
    if (!optedOut) {
      setShowOptOutDialog(true); // confirmation dialog
    } else {
      // setOptedOut(false); // setting opted out to false to make sure that the food cards are active
      setMealState((prev) => ({
        ...prev,
        [mealTime]: {
          ...prev[mealTime],
          optedOut: false,
        },
      }));
    }
  };
  const handleConfirmOptOut = () => {
    // setOptedOut(true);
    // setSelectedMeal(null);
    setMealState((prev) => ({
      ...prev,
      [mealTime]: {
        ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
        optedOut: true,
        selectedMeal: null,
      },
    }));
    showSnackBar("Click on submit to opt out", "default");
    console.log(`${user} opted out for ${mealTime}`);
    setShowOptOutDialog(false);
  };
  useEffect(() => {
    console.table(mealState);
  }, [mealState]);

  return (
    <div className="employee-dash">
      <DashboardHeader username={user?.username} onLogout={handleLogoutClick} />
      <div className="meals-container">
        {/* <MealHeader mealTitle={mealTitle} /> */}
        <div>
          Choose meal time
          <MealTimeSelector
            currentMealTime={mealTime}
            changeMealTime={setMealTime}
          />
        </div>

        <MealHeader
          mealTitle={mealTitle}
          optedOut={optedOut}
          onOptOut={handleOptOutClick}
          alreadySubmitted={alreadySubmitted}
        />

        {/* food cards */}
        <div className="food-card-grid">
          {currentMenu.length === 0 ? (
            <div>No menu found for {mealTime}</div>
          ) : (
            currentMenu.map((meal) => (
              <FoodCard
                key={meal.id}
                mealId={meal.id}
                alreadySubmitted={alreadySubmitted}
                optedOut={optedOut}
                activeSubmissionId={currentMealState.payload?.meal?.id}
                meal={meal}
                onAction={handleMealSelection}
                isSelected={selectedMeal?.id === meal.id}
              />
            ))
          )}
        </div>
      </div>
      <SubmissionSummary
        submitted={alreadySubmitted}
        submittedMeal={currentMealState.payload}
      />
      <SubmitButton
        onSubmit={handleSubmitMeals}
        disabled={alreadySubmitted}
        optedOut={optedOut}
      />
      {/*  logout dialog box  */}
      <DialogBox
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Confirm Logout"
        description="Are you sure you want to logout ?"
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
      {/* opt out dialog box */}
      <DialogBox
        open={showOptOutDialog}
        onClose={() => {
          setShowOptOutDialog(false);
        }}
        title="Confirm Opt Out"
        description={`Are you sure you dont need ${mealTime} ?`}
        impNote={`Please click on submit after opting out to record your absence`}
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => {
                setShowOptOutDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleConfirmOptOut()}
            >
              Sure
            </button>
          </>
        }
      ></DialogBox>
    </div>
  );
}

export default EmployeeDashboard;
