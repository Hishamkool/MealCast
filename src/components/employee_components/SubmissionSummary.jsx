import React from "react";

function SubmissionSummary({ submitted, optedOut, selectedMeal }) {
  if (!submitted) {
    return null;
  }
  return (
    <div className="submission-summary">
      {optedOut ? (
        <p>You opted out for this meal</p>
      ) : (
        <p>
          You submitted:{selectedMeal.name} {selectedMeal.count}
        </p>
      )}
    </div>
  );
}

export default SubmissionSummary;
