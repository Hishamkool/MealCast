import { useEffect, useState } from "react";
import getTimeLeftUtil from "../utils/timeLeft.utils";

// aim is to create update the ui whenever the deadline changes aka mealtime is changed
function useCountdownHook(deadlineISO) {
  const getDefaultState = () => ({
    hours: 0,
    min: 0,
    sec: 0,
    isExpired: false,
    isActive: false, // deadline is set or not, means null or not
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!deadlineISO) {
      return getDefaultState();
    }
    const initial = getTimeLeftUtil(deadlineISO);
    return { ...initial, isActive: true };
  });

  useEffect(() => {
    if (!deadlineISO) {
      setTimeLeft(getDefaultState());
      return;
    }

    const update = () => {
      const next = getTimeLeftUtil(deadlineISO); //for every new deadline iso

      setTimeLeft({
        ...next,
        isActive: true,
      });

      return next.isExpired;
    };
    const initialExpired = update();

    if (initialExpired) {
      return;
    }

    const intervalID = setInterval(() => {
      const expired = update();
      if (expired) {
        clearInterval(intervalID);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, [deadlineISO]);

  //returning time left so that we can dispaly it
  return timeLeft;
}
export default useCountdownHook;
