import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MEAL_OPTIONS } from "../../constants/meals"; //meals data
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
import useCountdownHook from "../../hooks/useCountdownHook";

const EMPTY_MEAL_STATE = {
  optedOut: false,
  submitted: false,
  selectedMeal: null,
  payload: null,
  autoSubmitted: false,
};
function EmployeeDashboard() {
  const { user, logout } = useAuth(); //login authentication
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);

  const [mealTime, setMealTime] = useState(Object.keys(MEAL_OPTIONS)[0]); // meal time status "lunch""dinner"
  /* changing to single value of truth */
  const [mealState, setMealState] = useState({}); // to manage all the states of the selected , submitted , optedout meals bases on meal time

  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // to show and hide logout dialog box
  const [showOptOutDialog, setShowOptOutDialog] = useState(false); // to show or hide opt out confirmation dialog
  const mealTitle = mealTime.charAt(0).toUpperCase() + mealTime.slice(1);
  const currentMenu = MEAL_OPTIONS[mealTime].items; // for menu options based on meal time - breakfast , lunch ..
  const deadlineTime = MEAL_OPTIONS[mealTime].deadlineTime; // deadline before optout for each mealtime
  const countdown = useCountdownHook(deadlineTime); // countdown hook to get the remaining time and update the counter

  /* SINGLE SOURCE OF TRUTH FOR THE MEALS SELECTION , SUBMITION , OPTING OUT ETC */
  const currentMealState = mealState[mealTime] ?? EMPTY_MEAL_STATE;
  /* 
  mealState = {
    breakfast: { ... },
    lunch: { ... },
    dinner: { ... }
  }
   */
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
  // auto submit meals when deadline is reached
  const autoSubmitOnDeadline = () => {
    const current = mealState[mealTime] ?? EMPTY_MEAL_STATE;
    // need not work if user submits before deadline so
    if (current.submitted) return;
    // also if no data for coundown isExpired
    if (!countdown?.isExpired) return;

    const payload = {
      user: user?.username ?? "Guest",
      submittedAt: new Date().toISOString(),
      mealTime,
      meal: null,
      optedOut: true,
      autoSubmitted: true,
      reason: "deadline_expired",
    };

    setMealState((prev) => ({
      ...prev,
      [mealTime]: {
        ...current,
        submitted: true,
        optedOut: true,
        autoSubmitted: true,
        selectedMeal: null,
        payload,
      },
    }));

    showSnackBar(`Votting closed for ${mealTime},auto opted out`, "warning");
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
          ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
          optedOut: false,
        },
      }));
    }
  };
  const handleConfirmOptOut = () => {
    const payload = {
      user: user?.username ?? "Guest",
      submittedAt: new Date().toISOString(), // sample 2026-01-28T13:12:10.123Z
      mealTime,
      meal: optedOut ? null : selectedMeal,
      optedOut: true,
    };
    setMealState((prev) => ({
      ...prev,
      [mealTime]: {
        ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
        submitted: true,
        optedOut: true,
        selectedMeal: null,
        payload,
      },
    }));

    showSnackBar(`Opted out for ${mealTime}`, "success");
    console.log(`${user} opted out for ${mealTime}`);
    setShowOptOutDialog(false);
  };
  useEffect(() => {
    if (countdown?.isExpired) return;
    autoSubmitOnDeadline();
  }, [countdown?.isExpired, mealTime]);

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
          countdown={countdown}
          deadlineTime={deadlineTime}
        />
        <SubmissionSummary
          submitted={alreadySubmitted}
          submittedMeal={currentMealState.payload}
          autoSubmitted={currentMealState.autoSubmitted}
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
      {/* opt out dialog box */}
      <DialogBox
        open={showOptOutDialog}
        onClose={() => {
          setShowOptOutDialog(false);
        }}
        title="Skip this meal?"
        description={`Are you sure you don't want ${mealTime} today?`}
        impNote="This action cannot be undone."
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
