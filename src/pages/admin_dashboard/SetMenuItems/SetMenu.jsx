import React from "react";
import "./SetMenu.css";
function SetMenu() {
  const handleAddMenuItem = () => {};

  return (
    <div className="set-menu-page">
      <header className="setmenu-header">
        <h1>Set Menu Items</h1>
      </header>

      <section className="input-section">
        <div className="form-container">
          <form
            action=""
            className="grid-container-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMenuItem();
            }}
          >
            <label htmlFor="meal-time">Choose MealTime</label>
            <select id="meal-time">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>

            {/* deadline */}
            <label htmlFor="">Select Deadline</label>
            <input type="datetime-local" name="deadline" />
            {/* food name */}
            <label htmlFor="food-name">Enter food name</label>
            <input
              className="set-menu-input"
              type="text"
              name="food-name"
              id="food-name"
              placeholder="Biriyani"
            />

            {/* veg or non veg radio*/}
            <p>Choose a Type</p>
            <div className="radio-group">
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="food-variant"
                  id="veg"
                  value={"veg"}
                />
                <label htmlFor="veg">VEG </label>
              </div>
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="food-variant"
                  id="non-veg"
                  value={"non-veg"}
                />
                <label htmlFor="non-veg">NON VEG</label>
              </div>
            </div>

            {/* Count needed*/}
            <label>Users can add count:</label>
            <div className="radio-group">
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="need-count"
                  id="multiple"
                  value={"true"}
                />
                <label htmlFor="multiple">YES</label>
              </div>
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="need-count"
                  id="single"
                  value={"false"}
                />
                <label htmlFor="single">No (only 1 item)</label>
              </div>
            </div>
            <button type="submit" className="add-button">
              Add Item
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SetMenu;
