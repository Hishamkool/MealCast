import "./FoodCard.css";
import { GRADIENT_MEAL } from "../constants/colors";
function FoodCard() {
  return (
    <div className="meal-card" style={{ background: GRADIENT_MEAL }}>
      <div className="meal-title">
        <img
          src="/images/food_items/ghee_rice.png"
          alt="ghee rice"
          className="food-img"
        />
        <span className="meal-name">Biriyani</span>
      </div>
      <div className="meal-actions">
        <button className="btn-base">I will eat</button>
        <button className="btn-base btn-red">Opt Out for this meal</button>
      </div>
    </div>
  );
}

export default FoodCard;
