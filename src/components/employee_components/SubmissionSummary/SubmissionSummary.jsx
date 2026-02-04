import "./SubmissionSummary.css";
import Check from "../../../assets/svg/check_circle.svg?react";
function SubmissionSummary({ submitted, submittedMeal }) {
  if (!submitted || !submittedMeal) {
    return null;
  }
  const { meal, optedOut, mealTime } = submittedMeal;

  const moreThanOneMeal = meal?.count > 1;

  return (
    <div className="submission-summary">
      <div className="submission-head">
        <h3>Successfully Submitted</h3>
        <Check />
      </div>
      {optedOut ? (
        <p>You opted out for {mealTime} </p>
      ) : (
        <p>
          You have chosen {moreThanOneMeal ? meal?.count : "one"} {meal?.name}
          {moreThanOneMeal ? "'s" : ""}
        </p>
      )}
    </div>
  );
}

export default SubmissionSummary;
