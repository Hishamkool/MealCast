// src/constants/meals.js
export const MEAL_OPTIONS = {
  breakfast: [
    {
      id: "chapathi",
      name: "Chapathi",
      showCount: true,
      type: "veg",
    },
    {
      id: "dosa",
      name: "Dosa",
      showCount: true,
      type: "veg",
    },
  ],

  lunch: [
    {
      id: "veg-biriyani",
      groupId: "biriyani",
      name: "Biriyani & Cauliflower",
      showCount: false,
      type: "veg",
    },
    {
      id: "nonveg-biriyani",
      groupId: "biriyani",
      name: "Biriyani & Chicken Curry",
      showCount: false,
      type: "non-veg",
    },
    {
      id: "meals",
      groupId: "meals",
      name: "Rice & Curry",
      showCount: false,
      type: "veg",
    },
  ],

  snacks: [],

  dinner: [
    {
      id: "appam",
      name: "Appam & Mutta Curry",
      showCount: true,
      type: "non-veg",
    },
  ],
};
