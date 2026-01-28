import React, { useContext } from "react";
import CheckIcon from "../assets/svg/simple_check.svg?react";
import { SnackBarContext } from "../context/SnackBarContext";
import "./SnackBar.css";

function SnackBar() {
  const icons = {
    success: <CheckIcon className="snackbar-icon" />,
    error: <CheckIcon className="snackbar-icon" />,
    warning: "⚠️",
    default: "ℹ️",
  };
  const { open, msg, variant } = useContext(SnackBarContext);

  /* disabling the snackbar which is not opened else present in dom and  prevents clicks   */
  if (!open) {
    return null;
  }
  return (
    <div className={`snackbar ${variant}`}>
      <span>
        {icons[variant]} {msg}
      </span>
    </div>
  );
}

export default SnackBar;
