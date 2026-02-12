import React from "react";
import "./MealHeader.css";
import isoStringFormatter from "../../../utils/deadlineFormat.utils";
function MealHeader({
  mealTitle,
  optedOut,
  onOptOut,
  alreadySubmitted,
  countdown,
  deadlineTime,
}) {
  if (!countdown) {
    return (
      <div className="meals-cnt-title">
        <h3>Menu for {mealTitle}</h3>
        <p>Loading Deadline...</p>
      </div>
    );
  }

  const { hours, min, sec, isExpired } = countdown;
  const deadline = deadlineTime ? isoStringFormatter(deadlineTime) : null;
  // const deadline = null;
  return (
    <div className="meals-cnt-title">
      <h3>Menu for {mealTitle}</h3>

      <div className={`btn-container ${alreadySubmitted ? "invisible" : ""}`}>
        {/* deadline card */}
        <div className="base-card  deadline">
          <div>Deadline:</div>
          {deadline ? (
            <>
              <div>
                Date: <strong>{deadline.date}</strong>
              </div>
              <div>
                Time: <strong>{deadline.time}</strong>{" "}
              </div>
            </>
          ) : (
            <div>00:00</div>
          )}
        </div>
        {/* vote ends by card */}
        {countdown && (
          <div className="base-card vote-ends-in  ">
            {isExpired ? (
              <>
                <span>Votting closed</span>
                <strong>00:00</strong>
              </>
            ) : (
              <>
                <span>Vote ends in</span>
                <strong>
                  {hours}h {min}m {sec}s
                </strong>
              </>
            )}
          </div>
        )}

        {/* Opt out button */}
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
