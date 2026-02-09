import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  DATABASE_MEAL_DEADLINES,
  DATABASE_MEAL_OPTIONS,
} from "../../constants/firebase_constants";

export async function fetchEmployeeMeals() {
  const mealsSnap = await getDocs(collection(db, DATABASE_MEAL_OPTIONS));
  const deadlineSnap = await getDocs(collection(db, DATABASE_MEAL_DEADLINES));

  const meals = mealsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const deadlines = deadlineSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log({ meals, deadlines });

  return { meals, deadlines };
}
