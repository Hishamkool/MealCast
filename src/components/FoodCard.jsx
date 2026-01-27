import "./FoodCard.css";
import {
  GRADIENT_VEG,
  GRADIENT_NONVEG,
  GRADIENT_TINT,
} from "../constants/colors";
import { useState } from "react";

function FoodCard({ meal }) {
  const [count, setCount] = useState(1);

  if (!meal) {
    return;
  }
  return (
    <div className="meal-card">
      <div
        className="meal-title-cnt"
        style={{
          backgroundImage: `${GRADIENT_TINT},
            url("/public/images/food_items/biriyani-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="meal-title">
          {/* <img
            src="/images/food_items/fast-food.png"
            alt="ghee rice"
            className="food-img"
          /> */}
          <span className="meal-name">{meal.name}</span>
        </div>

        {meal.type && (
          <div className="variant">
            Variant: {meal.type}
            <span className={`meal-indicator ${meal.type}`}></span>
          </div>
        )}
      </div>

      <div className="meal-actions">
        {meal.showCount && (
          <div className="count-cnt">
            <button
              className="btn-base count-btn"
              onClick={() => setCount((previous) => Math.max(previous - 1, 1))}
            >
              -
            </button>
            <span className="count-value">{count}</span>
            <button
              className="btn-base count-btn"
              onClick={() => setCount((previous) => previous + 1)}
            >
              +
            </button>
          </div>
        )}
        <button className="btn-base btn-positive">Add item</button>
      </div>
    </div>
  );
}

export default FoodCard;
