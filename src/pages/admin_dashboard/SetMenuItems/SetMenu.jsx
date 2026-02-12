import React, { useContext, useEffect, useState } from "react";
import "./SetMenu.css";
import { addMealOption } from "../../../services/meals/mealOptions.service";
import { SnackBarContext } from "../../../context/SnackBarContext";

import {
  getMealDeadline,
  setMealDeadline,
} from "../../../services/meals/mealDeadlines.service";

import { fetchEmployeeMeals } from "../../../services/meals/mealOptions.service";
import SetMenuForm from "../../../components/admin_components/setmenu_components/SetMenuForm";
import MealListPreview from "../../../components/admin_components/setmenu_components/MealListPreview";
import {
  isoToLocalInput,
  localInputToISO,
} from "../../../utils/utcConversion.utils";
import { structureEmployeeMeals } from "../../../utils/strucrureMeals.utils";
import DialogBox from "../../../components/DialogBox/DialogBox";
import { capitalizeFirst } from "../../../utils/captitalize.first.utils";

function SetMenu() {
  const { showSnackBar } = useContext(SnackBarContext);
  const [loadingAddMenu, setLoadingAddMenu] = useState(false);
  const [deadlineLoading, setDeadlineLoading] = useState(false);
  const [showDialogAddItem, setShowDialogAddItem] = useState(false);

  const [mealTime, setMealTime] = useState("breakfast");
  const [deadlineInput, setDeadlineInput] = useState(""); // use this as single source, lockeddeadline will be set to deadline input if value exists
  const [weekday, setWeekday] = useState("monday"); // to select days of the week to repeat the menu
  /* backend states */
  const [lockedDeadline, setLockedDeadline] = useState(null); // from backend
  const [mealOptions, setMealOptions] = useState([]); // meal option from backend - fetchEmployeeMeals
  const [loadingMealOptions, setLoadingMealOptions] = useState(false);
  /* useEffects */
  // to fetch deadline
  useEffect(() => {
    const fetchDeadline = async (mealTime) => {
      try {
        setDeadlineLoading(true);
        const deadlineData = await getMealDeadline(mealTime);
        if (deadlineData) {
          setLockedDeadline(deadlineData.deadlineISO);
        } else {
          setLockedDeadline(null);
        }
      } catch (error) {
        console.error("failed to fetch deadline", error);
        setLockedDeadline(null);
      } finally {
        setDeadlineLoading(false);
      }
    };

    fetchDeadline(mealTime);
  }, [mealTime]);

  // to lock deadline if exists
  useEffect(() => {
    if (lockedDeadline) {
      //   converting to local time before saving to deadline time to show in ui
      setDeadlineInput(isoToLocalInput(lockedDeadline));
    } else {
      setDeadlineInput("");
    }
  }, [lockedDeadline]);

  //  loading
  useEffect(() => {
    loadMeals();
  }, [loadingAddMenu === true]);
  /* functions */

  // function to loaded added menu options
  const loadMeals = async () => {
    try {
      setLoadingMealOptions(true);
      const { meals, deadlines } = await fetchEmployeeMeals();
      const structuredMeals = structureEmployeeMeals(meals, deadlines);
      setMealOptions(structuredMeals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMealOptions(false);
    }
  };

  const handleOpenAddMenuDialog = () => {
    setShowDialogAddItem(true);
  };
  // function to add menu items
  const handleAddMenuItem = async () => {
    const form = document.getElementById("submit-meal-form");
    const formData = new FormData(form);
    // by using formdata i can get access to all the inputs with name attribute
    // meal time is from state variable
    const foodName = formData.get("food-name");
    const type = formData.get("food-variant");
    const allowCount = formData.get("allowMultiple") === "true"; // formdata.get takes string value so passing bool values
    const deadlineValue = deadlineInput;
    if (!weekday) {
      showSnackBar("week day is required", "warning");
      return;
    }
    if (allowCount === "") {
      showSnackBar("CHoose if user should add count or not", "error");
      return;
    }
    if (!foodName) {
      showSnackBar("Food name is required", "warning");
      return;
    }
    if (!deadlineValue && !lockedDeadline) {
      showSnackBar(
        "Deadline is required for the first time per mealtime",
        "warning",
      );
      return;
    }
    try {
      setLoadingAddMenu(true);
      // if locked deadline exists then use it or create a new one and push it
      let deadlineISO = lockedDeadline;
      if (!lockedDeadline) {
        deadlineISO = localInputToISO(deadlineInput);
        await setMealDeadline(mealTime, deadlineISO);
        setLockedDeadline(deadlineISO);
      }
      const payload = {
        weekday,
        mealTime,
        foodName,
        type,
        allowCount,
        active: true,
        createdAt: new Date().toISOString(),
      };
      await addMealOption(payload);
      setLoadingAddMenu(false);
      await loadMeals();
      showSnackBar("Meals added successfully", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      showSnackBar("Failed to add meals!", "warning");
    }
    setShowDialogAddItem(false);
  };

  return (
    <div className="set-menu-page">
      <header className="setmenu-header">
        <h1>Set Menu Items</h1>
      </header>
      {/* input form fields */}
      <SetMenuForm
        handleOpenAddMenuDialog={handleOpenAddMenuDialog}
        weekday={weekday}
        setWeekday={setWeekday}
        mealTime={mealTime}
        setMealTime={setMealTime}
        deadlineInput={deadlineInput}
        setDeadlineInput={setDeadlineInput}
        lockedDeadline={lockedDeadline}
        loadingAddMenu={loadingAddMenu}
        deadlineLoading={deadlineLoading}
      />

      {/* menu items view  */}
      <MealListPreview mealOptions={mealOptions} loading={loadingMealOptions} />

      <DialogBox
        open={showDialogAddItem}
        onClose={() => setShowDialogAddItem(false)}
        title="Confirm Add Item"
        description={
          <>
            Are you sure you want to add item on{" "}
            <strong>{capitalizeFirst(weekday)}</strong>?
          </>
        }
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => setShowDialogAddItem(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleAddMenuItem()}
            >
              Sure
            </button>
          </>
        }
      />
    </div>
  );
}

export default SetMenu;
