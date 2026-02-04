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
import OptOutButton from "../../components/employee_components/OptOutButton/OptOutButton";
import SubmissionSummary from "../../components/employee_components/SubmissionSummary/SubmissionSummary";
import SubmitButton from "../../components/employee_components/SubmitButton/SubmitButton";
import DialogBox from "../../components/DialogBox/DialogBox";

function EmployeeDashboard() {
  const { user, logout } = useAuth(); //login authentication
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);

  const [mealTime, setMealTime] = useState(Object.keys(MEAL_OPTIONS)[0]); // meal time status "lunch""dinner"

  const [selectedMeal, setSelectedMeal] = useState(null); // finding selected food card
  const [submittedMeals, setSubmittedMeals] = useState({}); //submitted meals per meal time to prevent duplicate submission.
  const alreadySubmitted = !!submittedMeals[mealTime];
  const [optedOut, setOptedOut] = useState(false); //   opted out status
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // to show and hide logout dialog box
  const [showOptOutDialog, setShowOptOutDialog] = useState(false); // to show or hide opt out confirmation dialog
  const mealTitle = mealTime.charAt(0).toUpperCase() + mealTime.slice(1);
  const currentMealOption = MEAL_OPTIONS[mealTime]; // menu based on meal time - breakfast , lunch ..

  // functions
  // function to get the latest state values
  /*   function useDebugState(label, state) {
    useEffect(() => {
      console.log(label, state);
    }, [state]);
  }
  useDebugState("mealTime", mealTime);
  useDebugState("selectedMeal", selectedMeal);
  useDebugState("submittedMeals", submittedMeals);
  useDebugState("optedOut", optedOut); */

  // card selection
  const handleMealSelection = (meal, count) => {
    setSelectedMeal({ ...meal, count });
    setOptedOut(false);
  };
  // submitting meals
  const handleSubmitMeals = () => {
    if (alreadySubmitted) {
      showSnackBar(`Already submitted for ${mealTime}`, "warning");
      return;
    }
    if (!selectedMeal && !optedOut) {
      showSnackBar("Please select a meal or opt out", "warning");
      return;
    }
    const payLoad = {
      user: user?.username ?? "Guest",
      submittedAt: new Date().toISOString(), // sample 2026-01-28T13:12:10.123Z
      mealTime: mealTime,
      meal: optedOut ? null : selectedMeal,
      optedOut,
    };

    // storing selected meals locally to prevent duplicate submission
    setSubmittedMeals((previous) => {
      return {
        ...previous,
        [mealTime]: payLoad,
      };
    });
    console.log("Submitted meal payload:", payLoad);

    showSnackBar("Successfully submited", "success");
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
      setOptedOut(false); // setting opted out to false to make sure that the food cards are active
    }
  };
  const handleConfirmOptOut = () => {
    setOptedOut(true);
    setSelectedMeal(null);
    showSnackBar("Click on submit to opt out", "default");
    console.log(`${user} opted out for ${mealTime}`);
    setShowOptOutDialog(false);
  };
  useEffect(() => {
    console.log("selected meals", selectedMeal);
  }, [selectedMeal]);

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
        {/* <OptOutButton
          mealTitle={mealTitle}
          optedOut={optedOut}
          onOptOut={handleOptOut}
          alreadySubmitted={alreadySubmitted}
        /> */}
        {/* food cards */}
        <div className="food-card-grid">
          {currentMealOption.length === 0 ? (
            <div>No menu found for {mealTime}</div>
          ) : (
            currentMealOption.map((meal) => (
              <FoodCard
                key={meal.id}
                mealId={meal.id}
                alreadySubmitted={alreadySubmitted}
                optedOut={optedOut}
                activeSubmissionId={submittedMeals[mealTime]?.meal?.id}
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
        submittedMeal={submittedMeals[mealTime]}
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
        description={`Are you sure you dont need ${mealTime}`}
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
