import React from "react";
import "./SubmitButton.css";
function SubmitButton({ onSubmit, optedOut, disabled }) {
  return (
    <div className={`submit-vote-cnt center-btn`}>
      <button
        className="btn-base submit-btn"
        onClick={onSubmit}
        disabled={disabled}
      >
        {disabled ? "Submitted" : optedOut ? "Submit Opt Out" : "Submit Vote"}
      </button>
    </div>
  );
}

export default SubmitButton;
