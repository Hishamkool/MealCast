import { MEAL_TIMES } from "../constants/mealTime.constants";
import { calculateDeadlineISO } from "./calculateDeadlineISO.utils";

// structure data received from fetchEmployeeMeals service
export function structureEmployeeMeals(meals, deadlines) {
  const structured = {};
  const mealTimes = MEAL_TIMES.map((item) => {
    return item.key;
  });

  //initilizing structure
  mealTimes.forEach((mealtime) => {
    structured[mealtime] = {
      items: [],
      deadlineISO: null,
    };
  });

  //pusing meal_options to items
  meals.forEach((meal) => {
    if (!meal?.mealTime || !structured[meal.mealTime]) return;
    structured[meal.mealTime].items.push(meal);
  });

  //id = breakfast, lunch ... (mealTime)
  deadlines.forEach((deadline) => {
    if (!structured[deadline?.id]) return; //if id changes to other than mealtime

    structured[deadline.id].deadlineISO = calculateDeadlineISO(
      deadline.cutoffTime,
      deadline.offset,
    );
  });

  return structured;
}
