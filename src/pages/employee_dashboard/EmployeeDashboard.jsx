import { MEAL_OPTIONS } from "../../constants/meals";
import { useAuth } from "../../context/AuthContext";
import FoodCard from "../../components/FoodCard";
import "./EmployeeDashboard.css";
import { useState } from "react";
function EmployeeDashboard() {
  const { user } = useAuth();
  // set the meal time
  const [time, setTime] = useState(Object.keys(MEAL_OPTIONS)[0]);

  // const currentMealKey = foodTimes.lunch;

  const mealTitle = time.charAt(0).toUpperCase() + time.slice(1);
  const currentMealOption = MEAL_OPTIONS[time];
  // if (!user) {
  //   return <div>User not found</div>;
  // }

  // if (!user.username) {
  //   return <div>User name empty</div>;
  // }
  //when user exists
  return (
    <div className="employee-dash">
      <h1>Hello, {user?.username ?? "Sarah"}!</h1>
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
        <div className="food-card-grid">
          {currentMealOption.map((meal) => (
            <FoodCard meal={meal} key={meal.id} />
          ))}
        </div>
        <div className="center-btn">
          <button className="btn-base  btn-negative ">
            Opt out for {mealTitle}
          </button>
        </div>
      </div>

      <div className="submit-vote-cnt center-btn">
        <button className="btn-base btn-positive">SUBMIT VOTE</button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
