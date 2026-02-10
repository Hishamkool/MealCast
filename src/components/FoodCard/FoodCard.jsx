import "./FoodCard.css";
import { GRADIENT_TINT } from "../../constants/colors";
import { useState } from "react";

function FoodCard({
  meal,
  handleMealSelection,
  isSelected,
  optedOut,
  mealId,
  activeSubmissionId,
  alreadySubmitted,
}) {
  const [count, setCount] = useState(1);

  // logic to disable food cards
  const isSubmittedMeal = alreadySubmitted && activeSubmissionId === mealId; // disabled
  const otherSubmittedMeal = alreadySubmitted && activeSubmissionId !== mealId; //grayscale
  const isDisabled = optedOut || isSubmittedMeal || otherSubmittedMeal;
  const isGrayedOut = optedOut || otherSubmittedMeal;

  if (!meal) {
    return;
  }
  return (
    <div
      className={`meal-card 
        ${isSelected ? "selected" : ""} 
        ${isDisabled ? "disabled" : ""}
        ${isGrayedOut ? "grayedOut" : ""}
        
        `}
      onClick={() => {
        if (isDisabled) return;
        handleMealSelection(meal, count);
      }}
    >
      {/* ${optedOut && activeSubmission === key ? "disabled" : ""} */}
      <div
        className="meal-title-cnt"
        style={{
          backgroundImage: `${GRADIENT_TINT},
            url("/public/images/food_items/biriyani-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="meal-title">
          <span className="meal-name">{meal.foodName}</span>
        </div>

        {meal.type && (
          <div className="variant">
            Variant: {meal.type}
            <span className={`meal-indicator ${meal.type}`}></span>
          </div>
        )}
      </div>
      <div className="meal-actions">
        {meal.allowCount && (
          <div className="count-cnt">
            <button
              className="btn-base count-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click selection
                if (isDisabled) return;
                const newCount = Math.max(count - 1, 1);
                setCount(newCount);
                handleMealSelection(meal, newCount);
              }}
            >
              -
            </button>
            <span className="count-value">{count}</span>
            <button
              className="btn-base count-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click
                if (isDisabled) return;
                const newCount = count + 1;
                setCount(newCount);
                handleMealSelection(meal, newCount);
              }}
            >
              +
            </button>
          </div>
        )}
        <button
          className={`select-btn btn-base btn-positive ${isSelected ? "btn-selected" : ""}`}
          onClick={() => {
            if (isDisabled) return;
            handleMealSelection(meal, count);
          }}
        >
          {isSubmittedMeal
            ? "Submitted"
            : isSelected
              ? "Selected"
              : "Select item"}
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
