import React from "react";

function MealTimeSelector({ value, onChange, options }) {
  return (
    <select
      name="select-time"
      id="select-time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((item) => {
        return (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        );
      })}
    </select>
  );
}

export default MealTimeSelector;
