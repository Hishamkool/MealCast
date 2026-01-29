import React from "react";

function MealHeader({ mealTitle }) {
  return (
    <div className="meals-cnt-title">
      <h3>Food items for {mealTitle}</h3>
      <div className="vote-ends-in">
        <span>Vote ends in</span>
        <div>01:30pm</div>
      </div>
    </div>
  );
}

export default MealHeader;
