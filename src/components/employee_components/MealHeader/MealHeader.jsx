import React from "react";
import "./MealHeader.css";
import isoStringFormatter from "../../../utils/deadlineFormat.utils";
function MealHeader({
  mealTitle,
  optedOut,
  onOptOut,
  alreadySubmitted,
  countdown,
  deadlineISO,
  loadingDeadlines,
}) {
  const { hours, min, sec, isExpired, isActive } = countdown;
  const deadline = deadlineISO ? isoStringFormatter(deadlineISO) : null;
  // const deadline = null;
  return (
    <div className="meals-cnt-title">
      <h3>Menu for {mealTitle}</h3>
      {loadingDeadlines ? (
        <p>Loading Deadline...</p>
      ) : deadline ? (
        <div className={`btn-container ${alreadySubmitted ? "invisible" : ""}`}>
          {/* deadline card */}
          <div className="base-card  deadline">
            <div>Deadline:</div>
            {deadline && (
              <>
                <div>
                  Date: <strong>{deadline.date}</strong>
                </div>
                <div>
                  Time: <strong>{deadline.time}</strong>{" "}
                </div>
              </>
            )}
          </div>
          {/* vote ends by card */}
          {deadline && isActive && (
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
      ) : (
        <div>Deadline not set</div>
      )}
    </div>
  );
}

export default MealHeader;
