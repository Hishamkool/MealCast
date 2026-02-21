import React, { useEffect, useMemo, useState } from "react";
import "./MealListPreview.css";
import { WEEKDAYS } from "../../../constants/day.constants";
import isoStringFormatter from "../../../utils/deadlineFormat.utils";
import { capitalizeFirst } from "../../../utils/captitalize.first.utils";
import { getTodayWeekday } from "../../../utils/getTodayWeekday.utils";
import { OrbitProgress } from "react-loading-indicators";
import DialogBox from "../../DialogBox/DialogBox";

function MealListPreview({ mealOptions, loading, onUpdateMeal }) {
  const today = getTodayWeekday();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState(today);
  //edit dialogbox use states
  const [selectedMeal, setSelectedMeal] = useState(null); //current meal when clicking edit button
  const [editedName, setEditedName] = useState(""); //change food name
  const [editedStats, setEditedStatus] = useState(true); // active or inactive state
  const [saving, setSaving] = useState(false); // loading state while updating food details
  //function to open edit menu
  const handleOpenEditMenu = (meal) => {
    setShowEditDialog(true);
    setSelectedMeal(meal);
  };
  const handleCloseEditMenu = () => {
    setShowEditDialog(false);
    setSelectedMeal(null);
  };
  // function to confirm the edits on the food details
  const handleSaveChanges = async () => {
    setSaving(true);
    const updatedMeal = {
      ...selectedMeal,
      foodName: editedName && editedName.trim(),
      active: editedStats && editedStats,
    };
    try {
      await onUpdateMeal(updatedMeal);
      handleCloseEditMenu();
      console.log("updated food name and status");
      console.log({ updatedMeal });
    } finally {
      setSaving(false);
    }
  };
  //filtering meals based on weekday and only returning if there are items
  const filteredMeals = useMemo(() => {
    return Object.entries(mealOptions || {})
      .map(([mealtime, { items, deadlineISO }]) => ({
        mealtime,
        deadlineISO,
        items: items.filter((meal) => {
          return meal.weekday?.toLowerCase() === selectedWeekday;
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [selectedWeekday, mealOptions]);

  //when edit button is clicked prefill the edited name and edited status
  useEffect(() => {
    if (selectedMeal) {
      setEditedName(selectedMeal.foodName || "");
      setEditedStatus(selectedMeal.active === true);
    }
  }, [selectedMeal]);
  return (
    <section className="meal-preview-section">
      {/* Header */}
      <div className="meal-preview-header">
        <h2>Menu for {capitalizeFirst(selectedWeekday)}</h2>
        <div className="chooseDay">
          <label htmlFor="selected-weekday">Choose a day:</label>
          <select
            className="selectDay"
            name="selected-weekday"
            id="selected-weekday"
            value={selectedWeekday}
            onChange={(e) => {
              setSelectedWeekday(e.target.value);
            }}
          >
            {WEEKDAYS.map((day) => (
              <option key={day} value={day}>
                {capitalizeFirst(day)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Loading */}
      {loading && (
        <div className="loading-submited-meals">
          <OrbitProgress color="#2f26d9" size="small" text="" textColor="" />

          <h3>Fetching Submitted Meals...</h3>
        </div>
      )}
      {!loading && filteredMeals.length === 0 && (
        <div className="loading-submited-meals noItemsAdded">
          <h3>No items added</h3>
        </div>
      )}
      {/* Meal options */}
      {!loading &&
        filteredMeals.map(({ mealtime, items, deadlineISO }) => {
          const { date, time } = isoStringFormatter(deadlineISO);

          return (
            <div key={mealtime}>
              <div className="filtered-items">
                <div className="filter-header">
                  <h2>{capitalizeFirst(mealtime)}</h2>
                  <span>
                    Deadline : {date} {time}
                  </span>
                </div>
                <div className="filterlist-card-cnt">
                  {items.map((meal) => {
                    return (
                      <div
                        key={meal.id}
                        className={`filterlist-menu-card ${meal.active === false ? "inactive-card" : ""}`}
                      >
                        <h3>{meal.foodName?.trim()}</h3>
                        <p>Type: {meal.type}</p>
                        <p>Allow count: {meal.allowCount ? "Yes" : "No"}</p>
                        <p>
                          Status:{" "}
                          {meal.active === true ? "Active" : "In Active"}
                        </p>
                        {meal.createdAt && (
                          <p>
                            Created At:{" "}
                            {new Date(meal.createdAt).toLocaleDateString()}
                          </p>
                        )}
                        <button
                          className="btn-base edit-btn"
                          onClick={() => handleOpenEditMenu(meal)}
                        >
                          Edit
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      <DialogBox
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        title="Edit Food Details"
        impNote={"Inactive foods are not visible to the employees"}
        description={
          <div className="edit-dialog-description">
            <div className="updateName">
              <label htmlFor="edit-food-name">Edit Food Name:</label>
              <input
                type="text"
                id="edit-food-name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="food-state">
              <p>Change food state: </p>
              <input
                type="radio"
                name="food-state-radio"
                id="active-food"
                checked={editedStats === true}
                onChange={() => setEditedStatus(true)}
              />
              <label htmlFor="active-food">Active</label>
              <input
                type="radio"
                name="food-state-radio"
                id="inactive-food"
                checked={editedStats === false}
                onChange={() => setEditedStatus(false)}
              />
              <label htmlFor="inactive-food">In Active</label>
            </div>
          </div>
        }
        actions={
          <>
            <button
              type="button"
              className="cancel-btn btn-base"
              onClick={() => setShowEditDialog(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="accept-btn btn-base"
              onClick={() => handleSaveChanges()}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        }
      />
    </section>
  );
}

export default MealListPreview;
