export const MEAL_OPTIONS = {
  breakfast: {
    // Feb 7 breakfast → deadline = Feb 7 noon IST
    deadlineISO: "2026-02-07T07:30:00.000Z",
    items: [
      { id: "chapatthi", foodName: "Chapathi", allowCount: true, type: "veg" },
      { id: "dosa", foodName: "Dosa", allowCount: true, type: "veg" },
    ],
  },

  lunch: {
    // Feb 7 lunch → deadline = Feb 7 noon IST
    deadlineISO: "2026-02-07T06:30:00.000Z",
    items: [
      {
        id: "veg-biriyani",
        groupId: "biriyani",
        foodName: "Biriyani & Cauliflower",
        allowCount: false,
        type: "veg",
      },
      {
        id: "nonveg-biriyani",
        groupId: "biriyani",
        foodName: "Biriyani & Chicken Curry",
        allowCount: false,
        type: "non-veg",
      },
      {
        id: "meals",
        groupId: "meals",
        foodName: "Rice & Curry",
        allowCountt: false,
        type: "veg",
      },
    ],
  },

  snacks: {
    // (you didn’t specify snacks rule — keeping same-day noon)
    deadlineISO: "2026-02-07T06:30:00.000Z",
    items: [],
  },

  dinner: {
    // Feb 7 dinner → deadline = Feb 8 noon IST
    deadlineISO: "2026-02-08T06:30:00.000Z",
    items: [
      {
        id: "appam",
        foodName: "Appam & Mutta Curry",
        allowCountttt: true,
        type: "non-veg",
      },
      {
        id: "chapathi-veg-curry",
        foodName: "Chapathi & Veg Curry",
        allowCounttttt: true,
        type: "veg",
      },
      {
        id: "chapathi-chicken",
        foodName: "Chapathi & Chicken Curry",
        allowCounttttttt: true,
        type: "non-veg",
      },
      {
        id: "porotta-beef",
        foodName: "Porotta & Beef Curry",
        allowCountt: true,
        type: "non-veg",
      },
      {
        id: "porotta-veg",
        foodName: "Porotta & Veg Kurma",
        allowCount: true,
        type: "veg",
      },
      {
        id: "idiyappam-veg",
        foodName: "Idiyappam & Veg Stew",
        allowCount: true,
        type: "veg",
      },
      {
        id: "idiyappam-chicken",
        foodName: "Idiyappam & Chicken Stew",
        allowCount: true,
        type: "non-veg",
      },
    ],
  },
};
