import { useEffect, useState } from "react";
import getTimeLeftUtil from "../utils/getTimeLeftUtil";

// aim is to create update the ui whenever the deadline changes aka mealtime is changed
function useCountdownHook(deadlineISO) {
  const [timeleft, setTimeLeft] = useState(() => {
    return deadlineISO ? getTimeLeftUtil(deadlineISO) : null;
  });

  useEffect(() => {
    if (!deadlineISO) return;

    // finding timeleft immediately  when deadline changes
    setTimeLeft(getTimeLeftUtil(deadlineISO));

    // creating a update interval -- updates the ui every one sec
    const intervelId = setInterval(() => {
      setTimeLeft(getTimeLeftUtil(deadlineISO));
    }, 1000);

    return function cleanup() {
      clearInterval(intervelId);
    };
  }, [deadlineISO]);

  //returning time left so that we can dispaly it
  return timeleft;
}
export default useCountdownHook;
