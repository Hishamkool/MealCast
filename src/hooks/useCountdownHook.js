import { useEffect, useState } from "react";
import getTimeLeftUtil from "../utils/getTimeLeftUtil";

// aim is to create update the ui whenever the deadline changes aka mealtime is changed
function useCountdownHook(deadlineISO) {
  const [timeleft, setTimeLeft] = useState(() => {
    return deadlineISO ? getTimeLeftUtil(deadlineISO) : null;
  });

  useEffect(() => {
    if (!deadlineISO) {
      setTimeLeft(null);
      return;
    }

    const intervelId = setInterval(() => {
      const next = getTimeLeftUtil(deadlineISO);
      setTimeLeft(next);
      if (next.isExpired) {
        clearInterval(intervelId);
      }
    }, 1000);

    const initial = getTimeLeftUtil(deadlineISO);
    setTimeLeft(initial);

    if (initial.isExpired) {
      clearInterval(intervelId);
    }

    return function cleanup() {
      clearInterval(intervelId);
    };
  }, [deadlineISO]);

  //returning time left so that we can dispaly it
  return timeleft;
}
export default useCountdownHook;
