import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routes";
import FoodCard from "../../components/employee_components/FoodCard/FoodCard";
import "./EmployeeDashboard.css";
import { SnackBarContext } from "../../context/SnackBarContext";
import DashboardHeader from "../../components/employee_components/DashboardHeader/DashboardHeader";
import MealTimeSelector from "../../components/employee_components/MealTimeSelector/MealTimeSelector";
import MealHeader from "../../components/employee_components/MealHeader/MealHeader";
import SubmissionSummary from "../../components/employee_components/SubmissionSummary/SubmissionSummary";
import SubmitButton from "../../components/employee_components/SubmitButton/SubmitButton";
import DialogBox from "../../components/DialogBox/DialogBox";
import useCountdownHook from "../../hooks/useCountdownHook";
import isoStringFormatter from "../../utils/deadlineFormat.utils";
import { STORAGE_KEYS } from "../../constants/storageKeys";
// import { MEAL_OPTIONS } from "../../constants/meals"; //dummy data

/* api */
import { fetchEmployeeMeals } from "../../services/meals/mealOptions.service";
import {
  fetchTodaysSubmission,
  submitMeal,
} from "../../services/meals/mealSubmission.service";
import { structureEmployeeMeals } from "../../utils/strucrureMeals.utils";
import { getTodayWeekday } from "../../utils/getTodayWeekday.utils";

// default or initial state of meal
const EMPTY_MEAL_STATE = {
  optedOut: false,
  submitted: false,
  selectedMeal: null,
  payload: null,
  autoSubmitted: false,
};
function EmployeeDashboard() {
  const { user, logout } = useAuth(); //login authentication
  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext);
  const DEFAULT_MEAL_TIME = "breakfast";
  const [loadingMeals, setLoadingMeals] = useState(true);
  console.log("Rendering employee dashboard...");

  const [mealTime, setMealTime] = useState(DEFAULT_MEAL_TIME); // meal time status "lunch""dinner"
  /* changing to single value of truth */
  const [mealOptions, setMealOptions] = useState({}); //STATE TO FETCH MEAL OPTIONS FROM BACKEND
  const [mealOptionsState, setMealOptionsState] = useState({}); // to manage all the states of the selected , submitted , optedout meals

  const mealTitle = mealTime.charAt(0).toUpperCase() + mealTime.slice(1); // DEFAULT WILL BE BREAKFAST
  const mealData = mealOptions?.[mealTime]; // {deadline and items} per mealtime ,items contain menu
  const currentMenu = mealData?.items ?? []; // menu for a meal time
  const deadlineISO = mealData?.deadlineISO ?? null; // deadline before optout for each mealtime
  const countdown = useCountdownHook(deadlineISO); // countdown hook to get the remaining time and update the counter

  /* dialog box states */
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // to show and hide logout dialog box
  const [showOptOutDialog, setShowOptOutDialog] = useState(false); // to show or hide opt out confirmation dialog
  /* SINGLE SOURCE OF TRUTH FOR THE MEALS SELECTION , SUBMITION , OPTING OUT ETC */
  const currentMealState = mealOptionsState[mealTime] ?? EMPTY_MEAL_STATE;
  const selectedMeal = currentMealState.selectedMeal;
  const optedOut = currentMealState.optedOut; //current meal time is opted out
  const alreadySubmitted = currentMealState.submitted;

  /* USE EFFECTS */
  useEffect(() => {
    // if countdown.isExpired === false then return else call the autosubmit function
    if (!countdown?.isExpired) return;
    const current = mealOptionsState[mealTime];
    if (current?.submitted) return;
    autoSubmitOnDeadline();
  }, [countdown?.isExpired]);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        setLoadingMeals(true);
        const { meals, deadlines } = await fetchEmployeeMeals();
        //meals contains menu for all weekdays
        //  to get only todays

        const todaysWeekDay = getTodayWeekday(); // monday, tuesday ...
        const todaysMeals = meals.filter((meal) => {
          return meal.weekday?.toLowerCase() === todaysWeekDay;
        });
        console.log(todaysMeals);

        const structuredMeals = structureEmployeeMeals(todaysMeals, deadlines);
        setMealOptions(structuredMeals);

        // to set submission status on fetched meals.
        const date = new Date().toISOString().split("T")[0];
        try {
          const todaysSubmissions = await fetchTodaysSubmission(
            user?.username,
            date,
          );

          const derivedMealsState = {};
          todaysSubmissions.forEach((sub) => {
            derivedMealsState[sub.mealTime] = {
              submitted: true,
              optedOut: sub.optedOut,
              selectedMeal: sub.meal,
              autoSubmitted: sub.autoSubmitted ?? false,
              payload: sub,
            };
          });
          setMealOptionsState(derivedMealsState);
        } catch (error) {
          console.error(error);
          showSnackBar("Error fetching todays submissions", "error");
        }
        setMealTime(DEFAULT_MEAL_TIME);
      } catch (error) {
        console.error(error);
        showSnackBar("Failed to load meals", "error");
      } finally {
        setLoadingMeals(false);
      }
    };

    loadMeals();
  }, []);
  /* FUNCTIONS */
  // food card selection
  const handleMealSelection = (meal, count) => {
    setMealOptionsState((prev) => ({
      ...prev,
      [mealTime]: {
        ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
        selectedMeal: { ...meal, count },
        optedOut: false,
      },
    }));
  };
  // submitting meals
  const handleSubmitMeals = async () => {
    if (alreadySubmitted) {
      showSnackBar(`Already submitted for ${mealTime}`, "error");
      return;
    }
    if (!selectedMeal && !optedOut) {
      showSnackBar("Please select a meal or opt out", "warning");
      return;
    }
    const payload = {
      username: user?.username ?? "Guest",
      mealTime,
      mealId: optedOut ? null : selectedMeal.id,
      meal: optedOut ? null : selectedMeal,
      optedOut,
      autoSubmitted: false,
      date: new Date().toISOString().split("T")[0],
      submittedAt: new Date().toISOString(),
    };
    try {
      await submitMeal(payload);
      setMealOptionsState((prev) => ({
        ...prev,
        [mealTime]: {
          ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
          submitted: true,
          payload: payload,
        },
      }));
      showSnackBar("Successfully submitted", "success");
    } catch (error) {
      console.error(error);
      showSnackBar("Submission failed", "error");
    }

    localStorage.setItem(STORAGE_KEYS.SUBMIT_PAYLOAD, JSON.stringify(payload));
  };
  // auto submit meals when deadline is reached
  const autoSubmitOnDeadline = async () => {
    const current = mealOptionsState[mealTime] ?? EMPTY_MEAL_STATE;
    // need not work if user submits before deadline so
    if (current.submitted) return;
    // also if no data for coundown isExpired
    if (!countdown?.isExpired) return;

    const payload = {
      username: user?.username ?? "Guest",
      mealTime,
      meal: null,
      mealId: null,
      optedOut: true,
      autoSubmitted: true,
      reason: "deadline_expired",
      date: new Date().toISOString().split("T")[0],
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitMeal(payload);

      setMealOptionsState((prev) => ({
        ...prev,
        [mealTime]: {
          ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
          submitted: true,
          optedOut: true,
          autoSubmitted: true,
          selectedMeal: null,
          payload,
        },
      }));

      showSnackBar(`voting closed for ${mealTime} — auto opted out`, "warning");
    } catch (error) {
      console.error(error);
      showSnackBar("Failed To auto opt out", "error");
    }
  };

  // logout function
  // logout click to open dialog box
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  const handleConfirmLogout = () => {
    logout();
    console.log(`${user?.username} logged out successfully`);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  // opt out function
  const handleOptOutClick = () => {
    if (alreadySubmitted) return;
    if (!optedOut) {
      setShowOptOutDialog(true); // confirmation dialog
    } else {
      // setOptedOut(false); // setting opted out to false to make sure that the food cards are active
      setMealOptionsState((prev) => ({
        ...prev,
        [mealTime]: {
          ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
          optedOut: false,
        },
      }));
    }
  };
  const handleConfirmOptOut = async () => {
    const payload = {
      username: user?.username ?? "Guest",
      optedOut: true,
      mealTime,
      mealId: null,
      meal: null,
      autoSubmitted: false,
      submittedAt: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
    };
    try {
      await submitMeal(payload);

      setMealOptionsState((prev) => ({
        ...prev,
        [mealTime]: {
          ...(prev[mealTime] ?? EMPTY_MEAL_STATE),
          submitted: true,
          optedOut: true,
          selectedMeal: null,
          payload,
        },
      }));

      console.log(`${user} opted out for ${mealTime}`);
      showSnackBar(`Opted out for ${mealTime} successfully`, "success");
    } catch (error) {
      console.error(error);
      showSnackBar("Failed to opt out", "error");
    }

    setShowOptOutDialog(false);
  };

  //one time function to get the date and time form the deadline string , only calculated when deadline changes aka mealtime changes(depended upon it)
  const memoriseFormattedDeadlineISO = useMemo(() => {
    return deadlineISO ? isoStringFormatter(deadlineISO) : null;
  }, [deadlineISO]);

  return (
    <div className="employee-dash">
      <DashboardHeader username={user?.username} onLogout={handleLogoutClick} />
      <div className="meals-container">
        {/* <MealHeader mealTitle={mealTitle} /> */}
        <div>
          Choose meal time
          <MealTimeSelector
            currentMealTime={mealTime}
            changeMealTime={setMealTime}
          />
        </div>

        <MealHeader
          mealTitle={mealTitle}
          optedOut={optedOut}
          onOptOut={handleOptOutClick}
          alreadySubmitted={alreadySubmitted}
          countdown={countdown}
          deadlineTime={deadlineISO}
        />
        <SubmissionSummary
          submitted={alreadySubmitted}
          submittedMeal={currentMealState.payload}
          autoSubmitted={currentMealState.autoSubmitted}
          formattedDeadline={memoriseFormattedDeadlineISO}
        />
        {/* food cards */}
        <div className="food-card-grid">
          {loadingMeals ? (
            <div>
              <h3>Fetching Menu .........</h3>
            </div>
          ) : currentMenu.length === 0 ? (
            <div>No menu found for {mealTime}</div>
          ) : (
            currentMenu.map((meal) => (
              <FoodCard
                key={meal.id}
                mealId={meal.id}
                alreadySubmitted={alreadySubmitted}
                optedOut={optedOut}
                activeSubmissionId={currentMealState.payload?.meal?.id} //submitted item
                meal={meal}
                handleMealSelection={handleMealSelection} //selected meal
                isSelected={selectedMeal?.id === meal.id}
              />
            ))
          )}
        </div>
      </div>

      <SubmitButton
        onSubmit={handleSubmitMeals}
        disabled={alreadySubmitted}
        optedOut={optedOut}
      />
      {/*  logout dialog box  */}
      <DialogBox
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleConfirmLogout()}
            >
              Sure
            </button>
          </>
        }
      />
      {/* opt out dialog box */}
      <DialogBox
        open={showOptOutDialog}
        onClose={() => {
          setShowOptOutDialog(false);
        }}
        title="Skip this meal?"
        description={`Are you sure you don't want ${mealTime} today?`}
        impNote="This action cannot be undone."
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => {
                setShowOptOutDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleConfirmOptOut()}
            >
              Sure
            </button>
          </>
        }
      ></DialogBox>
    </div>
  );
}

export default EmployeeDashboard;
