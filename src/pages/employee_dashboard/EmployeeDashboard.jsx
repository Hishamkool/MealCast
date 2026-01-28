import { MEAL_OPTIONS } from "../../constants/meals";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import FoodCard from "../../components/FoodCard";
import "./EmployeeDashboard.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../context/SnackBarContext";
function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);
  // set the meal time
  const [time, setTime] = useState(Object.keys(MEAL_OPTIONS)[0]);
  // finding selected food card
  const [selectedMeal, setSelectedMeal] = useState(null);
  // state of opted out status
  const [optedOut, setOptedOut] = useState(false);

  const mealTitle = time.charAt(0).toUpperCase() + time.slice(1);
  const currentMealOption = MEAL_OPTIONS[time];

  // functions
  // card selection
  const handleMealSelection = (meal, count) => {
    setSelectedMeal({ ...meal, count });
    setOptedOut(false);
  };
  // submitting meals
  const handleSubmitMeals = () => {
    //if opted out && !selected meal , submit true
    // if !optedout && selected meal , submit true
    // if optedout && selected meal , submit true -- meal is null - handled in pay load
    // if !opted out && ! selected meal ,  submit false

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
  // if (!user) {
  //   return <div>User not found</div>;
  // }

  // if (!user.username) {
  //   return <div>User name empty</div>;
  // }
  //when user exists
  return (
    <div className="employee-dash">
      <div className="title">
        <h1>Hello, {user?.username ?? "Guest"}!</h1>
        <button className="btn-base logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="meals-container">
        <select
          name="select-time"
          id="select-time"
          onChange={(e) => setTime(e.target.value)}
        >
          {Object.keys(MEAL_OPTIONS).map((item) => {
            return (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            );
          })}
        </select>
        <div className="meals-cnt-title">
          <h3>Food items for {mealTitle}</h3>
          <div className="vote-ends-in">
            <span>Vote ends in</span>
            <div>01:30pm</div>
          </div>
        </div>
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
        <div className="center-btn">
          <button
            className={`btn-base ${optedOut ? "btn-positive" : "btn-negative"} `}
            onClick={handleOptOut}
          >
            {optedOut ? `Need ${mealTitle}` : `Dont need ${mealTitle}`}
          </button>
        </div>
      </div>

      <div className="submit-vote-cnt center-btn">
        <button className="btn-base btn-positive" onClick={handleSubmitMeals}>
          {optedOut ? "SUBMIT OPT OUT" : "SUBMIT VOTE"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
