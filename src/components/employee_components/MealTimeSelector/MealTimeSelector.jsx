import "./MealTimeSelector.css";
import BreakfastSvg from "../../../assets/svg/breakfast_icon.svg?react";
import LunchSvg from "../../../assets/svg/lunch_icon.svg?react";
import SnacksSvg from "../../../assets/svg/snacks_icon.svg?react";
import DinnerSvg from "../../../assets/svg/dinner_icon.svg?react";

const MEAL_TIMES = [
  //make sure the "keys" are same as key names in meal options
  {
    key: "breakfast",
    label: "Breakfast",
    icon: BreakfastSvg,
  },
  { key: "lunch", label: "Lunch", icon: LunchSvg },
  { key: "dinner", label: "Dinner", icon: DinnerSvg },
  { key: "snacks", label: "Snacks", icon: SnacksSvg },
];

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
