import "./SubmissionSummary.css";
import Check from "../../../assets/svg/check_circle.svg?react";
function SubmissionSummary({
  submitted,
  submittedMeal,
  autoSubmitted,
  formattedDeadline,
}) {
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
        !autoSubmitted && <p>You opted out for {mealTime} </p>
      ) : (
        <p>
          You have chosen {moreThanOneMeal ? meal?.count : "one"}{" "}
          {meal?.foodName}
          {moreThanOneMeal ? "'s" : ""}
        </p>
      )}
      {autoSubmitted && (
        <>
          <p>Automatically opted out (deadline reached)</p>
          {formattedDeadline && (
            <div>
              <div>Deadline: </div>

              <div>
                Date: <strong>{formattedDeadline.date}</strong>
              </div>
              <div>
                Time: <strong>{formattedDeadline.time}</strong>{" "}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SubmissionSummary;
