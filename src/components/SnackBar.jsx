import React, { useContext, useEffect, useState } from "react";

/* svg icons */
import SuccessIcon from "../assets/svg/check_circle.svg?react";
import DefaultIcon from "../assets/svg/circle_notifications.svg?react";
import ErrorIcon from "../assets/svg/error_circle.svg?react";
import ReportIcon from "../assets/svg/report.svg?react";
import SubmitIcon from "../assets/svg/send.svg?react";
import TickIcon from "../assets/svg/simple_check.svg?react";
import WarningIcon from "../assets/svg/warning.svg?react";

import { SnackBarContext } from "../context/SnackBarContext";
import "./SnackBar.css";

function SnackBar() {
  const icons = {
    success: <SuccessIcon className="snackbar-icon" />,
    error: <ErrorIcon className="snackbar-icon" />,
    warning: <WarningIcon className="snackbar-icon" />,
    default: <DefaultIcon className="snackbar-icon" />,
  };
  const { open, exiting, snackId, msg, variant } = useContext(SnackBarContext);

  if (!open) return null;

  return (
    <div
      key={snackId}
      className={`snackbar ${variant} ${exiting ? "exit" : "enter"}`}
    >
      {icons[variant]} {msg}
    </div>
  );
}

export default SnackBar;
