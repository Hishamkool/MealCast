export const MEAL_OPTIONS = {
  breakfast: {
    deadlineTime: "2026-02-05T08:30:00.000Z", // Updated to Feb 5, 2026
    items: [
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
  },

  lunch: {
    deadlineTime: "2026-02-05T13:30:00.000Z", // Updated to Feb 5, 2026
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
    deadlineTime: "2026-02-05T12:53:00.000Z",
    items: [],
  },

  dinner: {
    deadlineTime: "2026-02-05T20:30:00.000Z", // Updated to Feb 5, 2026
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
      {
        id: "ghee-rice-chicken",
        name: "Ghee Rice & Chicken Curry",
        showCount: false,
        type: "non-veg",
      },
      {
        id: "ghee-rice-veg",
        name: "Ghee Rice & Veg Curry",
        showCount: false,
        type: "veg",
      },
      {
        id: "fried-rice-veg",
        name: "Veg Fried Rice",
        showCount: false,
        type: "veg",
      },
      {
        id: "fried-rice-chicken",
        name: "Chicken Fried Rice",
        showCount: false,
        type: "non-veg",
      },
    ],
  },
};
