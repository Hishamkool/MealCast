import React, { createContext, useState } from "react";
export const SnackBarContext = createContext();

function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("Test message");
  const [variant, setVariant] = useState("success");

  /* function to update the state */
  const showSnackBar = (message, variant = "default") => {
    (setMsg(message), setOpen(true), setVariant(variant));
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <SnackBarContext.Provider value={{ open, msg, variant, showSnackBar }}>
      {children}
    </SnackBarContext.Provider>
  );
}

export default SnackBarProvider;
