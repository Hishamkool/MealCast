import BreakfastSvg from "../assets/svg/breakfast_icon.svg?react";
import LunchSvg from "../assets/svg/lunch_icon.svg?react";
import SnacksSvg from "../assets/svg/snacks_icon.svg?react";
import DinnerSvg from "../assets/svg/dinner_icon.svg?react";

export const MEAL_TIMES = [
  //make sure the "keys" are same as key names in meal options
  { key: "breakfast", label: "Breakfast", icon: BreakfastSvg },
  { key: "lunch", label: "Lunch", icon: LunchSvg },
  { key: "dinner", label: "Dinner", icon: DinnerSvg },
  { key: "snacks", label: "Snacks", icon: SnacksSvg },
];
