function SetMenuForm({
  handleOpenAddMenuDialog,
  weekday,
  setWeekday,
  mealTime,
  setMealTime,
  deadlineInput,
  setDeadlineInput,
  lockedDeadline,
  loadingAddMenu,
  deadlineLoading,
}) {
  return (
    <section className="input-section">
      <div className="form-container">
        <form
          id="submit-meal-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleOpenAddMenuDialog();
          }}
        >
          <div className="grid-container-form">
            {/* select date */}
            <label htmlFor="weekday">Choose Weekday</label>
            <select
              id="weekday"
              name="weekday"
              value={weekday}
              required
              onChange={(e) => setWeekday(e.target.value)}
            >
              <option value="monday">Every Monday's</option>
              <option value="tuesday">Every Tuesday's</option>
              <option value="wednesday">Every Wednesday's</option>
              <option value="thursday">Every Thursday's</option>
              <option value="friday">Every Friday's</option>
              <option value="saturday">Every Saturday's</option>
              <option value="sunday">Every Sunday's</option>
            </select>
            {/* meal time */}
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
            <label htmlFor="deadline">Select Deadline</label>
            <input
              type="datetime-local"
              name="deadline"
              id="deadline"
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
                  value={"veg"}
                  required
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
                  value={"true"}
                  required
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
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="add-button btn-base"
              disabled={loadingAddMenu || deadlineLoading}
            >
              {loadingAddMenu ? "Adding...." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SetMenuForm;
