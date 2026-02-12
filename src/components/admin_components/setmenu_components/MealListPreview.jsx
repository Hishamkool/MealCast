import React, { useState } from "react";

import { WEEKDAYS } from "../../../constants/day.constants";
function MealListPreview({ mealOptions, loading }) {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const [selectedWeekday, setSelectedWeekday] = useState(today);
  const mealsEntries = Object.entries(mealOptions);
  console.log(mealsEntries); //key is meal time and values is items array , deadline iso
  return (
    <section className="meal-preview-section">
      {loading ? (
        <div>
          <h3>Fetching Submitted Meals...</h3>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="meal-preview-header">
            <h2>Menu Preview</h2>
            <label htmlFor="selected-weekday">Choose a day:</label>
            <select
              name="selected-weekday"
              id="selected-weekday"
              value={selectedWeekday}
              onChange={(e) => {
                setSelectedWeekday(e.target.value);
              }}
            >
              {WEEKDAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Meal options */}
          {mealsEntries.map(([mealtime, { items, deadlineISO }]) => (
            <div key={mealtime} className="">
              <h3>{mealtime}</h3>

              {items.map((meal) => (
                <div key={meal.id} className="set-menu-meal-card">
                  <h3>{meal.foodName?.trim()}</h3>
                  <p>Meal Time: {meal.mealTime}</p>
                  <p>Type: {meal.type}</p>
                  <p>Allow count: {meal.allowCount}</p>

                  <p>Status: {meal.active === true ? "Active" : "Unknown"}</p>
                  {meal.createdAt && (
                    <p>
                      Created At:{" "}
                      {new Date(meal.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default MealListPreview;
