import { MEAL_TIMES } from "../constants/mealTime.constants";

//gived submission based on meal time, food and its count and contains the count opted out an unique users
export function structureSubmissions(submissions) {
  const structured = {};

  MEAL_TIMES.forEach(({ key: mealTime, label }) => {
    structured[mealTime] = {
      mealTime,
      label,
      totalSubmissions: 0,
      optedOutCount: 0,
      uniqueUsers: new Set(),
      foodItems: {},
    };
  });

  submissions.forEach((submission) => {
    const mealTime = submission.mealTime;

    if (!structured[mealTime]) return; // if mealtimes form submisison dont match with constant

    const structuredMeal = structured[mealTime];

    structuredMeal.totalSubmissions++;

    if (submission.optedOut) {
      structuredMeal.optedOutCount++;
    }

    if (submission.username) {
      structuredMeal.uniqueUsers.add(submission.username);
    }

    // count of food time if meal not null
    if (
      !submission.optedOut &&
      submission.meal?.foodName &&
      submission.meal?.count
    ) {
      const foodName = submission.meal.foodName;
      const count = submission.meal.count;
      structuredMeal.foodItems[foodName] =
        (structuredMeal.foodItems[foodName] || 0) + count;
    }

    // count of unique users
    Object.values(structured).forEach((structuredMeal) => {
      structuredMeal.uniqueUsersCount = structuredMeal.uniqueUsers.size;
    });
  });
  return structured;
}

/* eg: 
{
  breakfast: {
    foodItems: {
      "Chapathi": 5,  // 3 + 2
      "Rice": 1
    },
    optedOutCount: 1,
    totalSubmissions: 4,
    uniqueUserCount: 3
  }
} */
