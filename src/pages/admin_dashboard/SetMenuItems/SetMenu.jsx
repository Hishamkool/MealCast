import React, { useContext, useEffect, useState } from "react";
import "./SetMenu.css";
import {
  addMealOption,
  updateMealOption,
} from "../../../services/meals/mealOptions.service";
import { SnackBarContext } from "../../../context/SnackBarContext";

import { setMealDeadline } from "../../../services/meals/mealDeadlines.service";

import { fetchEmployeeMeals } from "../../../services/meals/mealOptions.service";
import SetMenuForm from "../../../components/admin_components/setmenu_components/SetMenuForm";
import MealListPreview from "../../../components/admin_components/setmenu_components/MealListPreview";

import { structureEmployeeMeals } from "../../../utils/strucrureMeals.utils";
import DialogBox from "../../../components/DialogBox/DialogBox";
import { capitalizeFirst } from "../../../utils/captitalize.first.utils";

function SetMenu() {
  const { showSnackBar } = useContext(SnackBarContext);
  const [loadingAddMenu, setLoadingAddMenu] = useState(false);
  const [showDialogAddItem, setShowDialogAddItem] = useState(false);
  const [mealTime, setMealTime] = useState("breakfast");
  const [cutoffTime, setCutoffTime] = useState(""); //cuttoff time input
  const [offset, setOffset] = useState(); // this is used to tell if the vote ends by today or the day before itself
  const [deadlineLoading, setDeadlineLoading] = useState(false);
  const [weekday, setWeekday] = useState("monday"); // to select days of the week to repeat the menu
  /* backend states */

  const [mealOptions, setMealOptions] = useState([]); // meal option from backend - fetchEmployeeMeals
  const [loadingMealOptions, setLoadingMealOptions] = useState(false);
  /* useEffects */
  // to fetch deadline
  useEffect(() => {
    /*   const fetchDeadline = async (mealTime) => {
      try {
        setDeadlineLoading(true);
        const deadlineData = await getMealDeadline(mealTime);
      } catch (error) {
        console.error("failed to fetch deadline", error);
      } finally {
        setDeadlineLoading(false);
      }
    }; 
    fetchDeadline(mealTime); */
  }, [mealTime]);

  //  loading
  useEffect(() => {
    loadMeals();
  }, [loadingAddMenu === true]);
  /* functions */
  //function to edit the meal name or active status
  const handleUpdateMeal = async (updatedMeal) => {
    try {
      const uploadPayload = {
        foodName: updatedMeal.foodName,
        active: updatedMeal.active,
      };

      await updateMealOption(updatedMeal.id, uploadPayload);
      // await loadMeals(); //causing flikering so

      setMealOptions((prev) => {
        const newState = { ...prev };

        Object.keys(newState).forEach((mealtime) => {
          newState[mealtime].items = newState[mealtime].items.map((item) =>
            item.id === updatedMeal.id ? { ...item, ...uploadPayload } : item,
          );
        });
        return newState;
      });
    } catch (error) {
      console.error("Failed to update meals", error);
      showSnackBar("Failed to update meal", "error");
    }
  };
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
    const foodName = formData.get("food-name");
    const type = formData.get("food-variant");
    const allowCount = formData.get("allowMultiple") === "true"; // formdata.get takes string value so passing bool values

    if (!weekday) {
      showSnackBar("week day is required", "warning");
      return;
    }
    if (allowCount === "") {
      showSnackBar("Choose if user should add count or not", "error");
      return;
    }
    if (!foodName) {
      showSnackBar("Food name is required", "warning");
      return;
    }
    if (!cutoffTime) {
      showSnackBar("Cutoff time is required", "warning", "warning");
      return;
    }
    try {
      setLoadingAddMenu(true);
      // setting deadline
      await setMealDeadline(mealTime, cutoffTime, offset);

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
        cutoffTime={cutoffTime}
        setCutoffTime={setCutoffTime}
        offset={offset}
        setOffset={setOffset}
        loadingAddMenu={loadingAddMenu}
        deadlineLoading={deadlineLoading}
      />

      {/* menu items view  */}
      <MealListPreview
        mealOptions={mealOptions}
        loading={loadingMealOptions}
        onUpdateMeal={handleUpdateMeal}
      />

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
