import { MEAL_TIMES } from "../../../constants/mealTime.constants";
import "./MealTimeSelector.css";

function MealTimeSelector({ currentMealTime, changeMealTime }) {
  return (
    <div className="meal-time-selector">
      {MEAL_TIMES.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            type="button"
            className={`meal-btn ${currentMealTime === item.key ? "active" : ""}`}
            onClick={() => changeMealTime(item.key)}
          >
            <span className="icon">
              <Icon className="meal-icon" />
            </span>
            <span className="label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MealTimeSelector;
