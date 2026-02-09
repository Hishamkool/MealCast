import React, { useContext, useEffect, useState } from "react";
import "./SetMenu.css";
import { addMealOption } from "../../../services/mealOptions.service";
import { SnackBarContext } from "../../../context/SnackBarContext";
import {
  getMealDeadline,
  setMealDeadline,
} from "../../../services/mealDeadlines.service";

function SetMenu() {
  const { showSnackBar } = useContext(SnackBarContext);
  const [loading, setLoading] = useState(false);
  const [deadlineLoading, setDeadlineLoading] = useState(false);

  const [mealTime, setMealTime] = useState("breakfast");
  const [lockedDeadline, setLockedDeadline] = useState(null); // from backend
  const [deadlineInput, setDeadlineInput] = useState(""); // use this as single source, lockeddeadline will be set to deadline input if value exists

  /* useEffects */
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

  useEffect(() => {
    if (lockedDeadline) {
      //   converting to local time before saving to deadline time to show in ui
      setDeadlineInput(isoToLocalInput(lockedDeadline));
    } else {
      setDeadlineInput("");
    }
  }, [lockedDeadline]);

  /* functions */
  // function to convert utc iso time to local time while displaying time from backend
  function isoToLocalInput(ISOString) {
    const date = new Date(ISOString);
    const offset = date.getTimezoneOffset() * 60 * 1000; // in milliseconds
    const localTime = new Date(date.getTime() - offset); // here we get offset in minus already in ist , so -(-) becomes +
    return localTime.toISOString().slice(0, 16);
  }

  //function to convert local input to iso string
  function localInputToISO(localInput) {
    return new Date(localInput).toISOString();
  }

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
      setLoading(true);
      // if locked deadline exists then use it or create a new one and push it
      let deadlineISO = lockedDeadline;
      if (!lockedDeadline) {
        deadlineISO = localInputToISO(deadlineInput);
        await setMealDeadline(mealTime, deadlineISO);
        setLockedDeadline(deadlineISO);
      }
      const payload = {
        mealTime,
        foodName,
        type,
        allowCount,
        active: true,
        createdAt: new Date().toISOString(),
      };
      await addMealOption(payload);
      setLoading(false);
      showSnackBar("Meals added successfully", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      showSnackBar("Failed to add meals!", "warning");
    }
  };

  return (
    <div className="set-menu-page">
      <header className="setmenu-header">
        <h1>Set Menu Items</h1>
      </header>

      <section className="input-section">
        <div className="form-container">
          <form
            id="submit-meal-form"
            action=""
            className="grid-container-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMenuItem();
            }}
          >
            <label htmlFor="meal-time">Choose MealTime</label>
            <select
              id="meal-time"
              name="meal-time"
              value={mealTime}
              onChange={(e) => setMealTime(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>

            {/* deadline */}
            <label htmlFor="">Select Deadline</label>
            <input
              type="datetime-local"
              name="deadline"
              onChange={(e) => {
                setDeadlineInput(e.target.value);
              }}
              value={deadlineInput}
              required={!lockedDeadline} //if not deadline from backend
              disabled={!!lockedDeadline} // if locked deadline exists then lock it
            />
            {/* food name */}
            <label htmlFor="food-name">Enter food name</label>
            <input
              className="set-menu-input"
              type="text"
              name="food-name"
              id="food-name"
              required
              placeholder="Chapathi and veg kuruma"
            />

            {/* veg or non veg radio*/}
            <p>Choose a Type</p>
            <div className="radio-group">
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="food-variant"
                  id="veg"
                  defaultChecked
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
            <label>
              Users can add count:
              <small className="info-text">( eg: select no for lunch ) </small>
            </label>

            <div className="radio-group">
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="allowMultiple"
                  id="multiple"
                  defaultChecked
                  value={"true"}
                />
                <label htmlFor="multiple">YES</label>
              </div>
              <div className="radio-label-button">
                <input
                  type="radio"
                  name="allowMultiple"
                  id="single"
                  value={"false"}
                />
                <label htmlFor="single">NO (only 1 item)</label>
              </div>
            </div>
            <button
              type="submit"
              className="add-button"
              disabled={loading || deadlineLoading}
            >
              {loading ? "Adding...." : "Add Item"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SetMenu;
