import React, { useMemo, useState } from "react";
import "./MealListPreview.css";
import { WEEKDAYS } from "../../../constants/day.constants";
import isoStringFormatter from "../../../utils/deadlineFormat.utils";
import { capitalizeFirst } from "../../../utils/captitalize.first.utils";
import { getTodayWeekday } from "../../../utils/getTodayWeekday.utils";

function MealListPreview({ mealOptions, loading }) {
  const today = getTodayWeekday();

  const [selectedWeekday, setSelectedWeekday] = useState(today);

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
                      <div key={meal.id} className="filterlist-menu-card">
                        <h3>{meal.foodName?.trim()}</h3>
                        <p>Type: {meal.type}</p>
                        <p>Allow count: {meal.allowCount ? "Yes" : "No"}</p>
                        <p>
                          Status: {meal.active === true ? "Active" : "Unknown"}
                        </p>
                        {meal.createdAt && (
                          <p>
                            Created At:{" "}
                            {new Date(meal.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default MealListPreview;
