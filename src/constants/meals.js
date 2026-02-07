export const MEAL_OPTIONS = {
  breakfast: {
    // Feb 7 breakfast → deadline = Feb 7 noon IST
    deadlineTime: "2026-02-07T07:30:00.000Z",
    items: [
      { id: "chapatthi", name: "Chapathi", showCount: true, type: "veg" },
      { id: "dosa", name: "Dosa", showCount: true, type: "veg" },
    ],
  },

  lunch: {
    // Feb 7 lunch → deadline = Feb 7 noon IST
    deadlineTime: "2026-02-07T06:30:00.000Z",
    items: [
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
  },

  snacks: {
    // (you didn’t specify snacks rule — keeping same-day noon)
    deadlineTime: "2026-02-07T06:30:00.000Z",
    items: [],
  },

  dinner: {
    // Feb 7 dinner → deadline = Feb 8 noon IST
    deadlineTime: "2026-02-08T06:30:00.000Z",
    items: [
      {
        id: "appam",
        name: "Appam & Mutta Curry",
        showCount: true,
        type: "non-veg",
      },
      {
        id: "chapathi-veg-curry",
        name: "Chapathi & Veg Curry",
        showCount: true,
        type: "veg",
      },
      {
        id: "chapathi-chicken",
        name: "Chapathi & Chicken Curry",
        showCount: true,
        type: "non-veg",
      },
      {
        id: "porotta-beef",
        name: "Porotta & Beef Curry",
        showCount: true,
        type: "non-veg",
      },
      {
        id: "porotta-veg",
        name: "Porotta & Veg Kurma",
        showCount: true,
        type: "veg",
      },
      {
        id: "idiyappam-veg",
        name: "Idiyappam & Veg Stew",
        showCount: true,
        type: "veg",
      },
      {
        id: "idiyappam-chicken",
        name: "Idiyappam & Chicken Stew",
        showCount: true,
        type: "non-veg",
      },
    ],
  },
};
