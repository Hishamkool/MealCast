import React, { createContext, useState, useRef } from "react";
export const SnackBarContext = createContext();

function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);
  //   for fade out animation
  const [exiting, setExiting] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState("");
  //   timer reference to cancel previous timeout else new snackbar will close fast
  const timeId = useRef(null);
  //   to add key to snack bar to let react know every new snackbar clicks for enter animation
  const [snackId, setSackId] = useState(0);

  /* function to update the state */
  const showSnackBar = (message, variant = "default") => {
    //if already timer exit cancel it
    if (timeId.current) {
      clearTimeout(timeId.current);
    }

    setMsg(message);
    setVariant(variant);
    setOpen(true);
    setExiting(false);
    setSackId(Date.now()); // new id when showSnackbar
    timeId.current = setTimeout(() => {
      setExiting(true);

      setTimeout(() => {
        setOpen(false);
      }, 250); //   animation duration for exit 250ms
    }, 3000);
  };

  return (
    <SnackBarContext.Provider
      value={{ open, exiting, snackId, msg, variant, showSnackBar }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}

export default SnackBarProvider;
