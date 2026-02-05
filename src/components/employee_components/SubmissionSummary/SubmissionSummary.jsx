import "./SubmissionSummary.css";
import Check from "../../../assets/svg/check_circle.svg?react";
function SubmissionSummary({ submitted, submittedMeal, autoSubmitted }) {
  if (!submitted || !submittedMeal) {
    return null;
  }
  const { meal, optedOut, mealTime } = submittedMeal;

  const moreThanOneMeal = meal?.count > 1;

  return (
    <div className={`submission-summary ${optedOut ? "optedOut" : ""}`}>
      <div className="submission-head">
        <h3>Successfully Submitted</h3>
        <Check /> {/* circle svg */}
      </div>
      {optedOut ? (
        <p>You opted out for {mealTime} </p>
      ) : (
        <p>
          You have chosen {moreThanOneMeal ? meal?.count : "one"} {meal?.name}
          {moreThanOneMeal ? "'s" : ""}
        </p>
      )}
      {autoSubmitted && <p>Automatically opted out due to deadline</p>}
    </div>
  );
}

export default SubmissionSummary;
