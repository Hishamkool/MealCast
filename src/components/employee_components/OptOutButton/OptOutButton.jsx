import React from "react";
import "./OptOutButton.css";

function OptOutButton({ mealTitle, optedOut, onOptOut, alreadySubmitted }) {
  return (
    <div className="center-btn">
      <button
        className={`btn-base ${optedOut ? "btn-positive" : "btn-negative"} ${alreadySubmitted ? "invisible" : ""}`}
        onClick={onOptOut}
      >
        {optedOut ? `Need ${mealTitle}` : `Dont need ${mealTitle}`}
      </button>
    </div>
  );
}

export default OptOutButton;
