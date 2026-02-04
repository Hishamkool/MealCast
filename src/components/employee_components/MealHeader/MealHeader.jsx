import React from "react";
import "./MealHeader.css";
function MealHeader({ mealTitle, optedOut, onOptOut, alreadySubmitted }) {
  return (
    <div className="meals-cnt-title">
      <h3>Menu for {mealTitle}</h3>
      <div className={`btn-container ${alreadySubmitted ? "invisible" : ""}`}>
        <div className="base-card vote-ends-in  ">
          <span>Vote ends by</span>
          <div>01:30pm</div>
        </div>
        <div>
          <button
            className={`btn-base base-card ${optedOut ? "btn-positive" : "btn-negative"} `}
            onClick={onOptOut}
          >
            {optedOut ? `Need ${mealTitle}` : `I do not need ${mealTitle}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealHeader;
