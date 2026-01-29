import React from "react";

function SubmitButton({ onSubmit, optedOut }) {
  return (
    <div className="submit-vote-cnt center-btn">
      <button className="btn-base btn-positive" onClick={onSubmit}>
        {optedOut ? "SUBMIT OPT OUT" : "SUBMIT VOTE"}
      </button>
    </div>
  );
}

export default SubmitButton;
