import React from "react";

function OptOutButton({ mealTitle, optedOut, onToggle }) {
  return (
    <div className="center-btn">
      <button
        className={`btn-base ${optedOut ? "btn-positive" : "btn-negative"} `}
        onClick={onToggle}
      >
        {optedOut ? `Need ${mealTitle}` : `Dont need ${mealTitle}`}
      </button>
    </div>
  );
}

export default OptOutButton;
