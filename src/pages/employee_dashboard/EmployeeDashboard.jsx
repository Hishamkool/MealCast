import { MEAL_OPTIONS } from "../../constants/meals";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import FoodCard from "../../components/FoodCard";
import "./EmployeeDashboard.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../context/SnackBarContext";
import DashboardHeader from "../../components/employee_components/DashboardHeader";
import MealTimeSelector from "../../components/employee_components/MealTimeSelector";
import MealHeader from "../../components/employee_components/MealHeader";
import OptOutButton from "../../components/employee_components/OptOutButton";
import SubmissionSummary from "../../components/employee_components/SubmissionSummary";
import SubmitButton from "../../components/employee_components/SubmitButton";

function EmployeeDashboard() {
  const { user, logout } = useAuth(); //login authentication
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);

  const [time, setTime] = useState(Object.keys(MEAL_OPTIONS)[0]); // meal time status "lunch""dinner"

  const [selectedMeal, setSelectedMeal] = useState(null); // finding selected food card

  const [optedOut, setOptedOut] = useState(false); //   opted out status

  const [alreadySubmitted, setAlreadySubmitted] = useState(false); // to disable submit button if already submitted

  const mealTitle = time.charAt(0).toUpperCase() + time.slice(1);
  const currentMealOption = MEAL_OPTIONS[time]; // menu based on meal time - breakfast , lunch ..

  // functions
  // card selection
  const handleMealSelection = (meal, count) => {
    setSelectedMeal({ ...meal, count });
    setOptedOut(false);
  };
  // submitting meals
  const handleSubmitMeals = () => {
    if (!selectedMeal && !optedOut) {
      showSnackBar("Please select a meal or opt out");
      return;
    }
    const payLoad = {
      user: user?.username ?? "Guest",
      submitedAt: new Date().toISOString(), // sample 2026-01-28T13:12:10.123Z
      mealTime: time,
      meal: optedOut ? null : selectedMeal,
      optedOut,
    };

    console.log("submiting vote:", payLoad);
  };

  // logout function
  const handleLogout = () => {
    const sure = confirm("Are you sure to logout");
    if (sure) {
      logout();
      console.log(`${user?.username} logged out successfully`);
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  const handleOptOut = () => {
    if (!optedOut) {
      const sure = confirm(`Are you sure to opt out for ${time}`);
      if (!sure) return;
      setOptedOut(true);
      setSelectedMeal(null);
      console.log(`${user} opted out for ${time}`);
    } else {
      setOptedOut(false);
    }
  };
  useEffect(() => {
    console.log("selected meals", selectedMeal);
  }, [selectedMeal]);

  return (
    <div className="employee-dash">
      <DashboardHeader username={user?.username} onLogout={handleLogout} />
      <div className="meals-container">
        <MealTimeSelector
          value={time}
          onChange={setTime}
          options={Object.keys(MEAL_OPTIONS)}
        />

        <MealHeader mealTitle={mealTitle} />
        {/* food cards */}
        <div className="food-card-grid">
          {currentMealOption.map((meal) => (
            <FoodCard
              disabled={optedOut}
              meal={meal}
              key={meal.id}
              onAction={handleMealSelection}
              isSelected={selectedMeal?.id === meal.id}
            />
          ))}
        </div>

        <OptOutButton
          mealTitle={mealTitle}
          optedOut={optedOut}
          onToggle={handleOptOut}
        />
      </div>
      <SubmissionSummary
        submitted={alreadySubmitted}
        optedOut={optedOut}
        selectedMeal={selectedMeal}
      />
      <SubmitButton onSubmit={handleSubmitMeals} optedOut={optedOut} />
    </div>
  );
}

export default EmployeeDashboard;
