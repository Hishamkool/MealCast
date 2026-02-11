import { doc, getDoc, setDoc } from "firebase/firestore";
import { DATABASE_MEAL_DEADLINES } from "../../constants/firebase_constants";
import { db } from "../firebase";

// function to get deadline set by admin for a particular mealtime
export async function getMealDeadline(mealTime) {
  const ref = doc(db, DATABASE_MEAL_DEADLINES, mealTime);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
}

// function to set a deadline to a particular meal time to lock it
export async function setMealDeadline(mealTime, deadlineISO) {
  const ref = doc(db, DATABASE_MEAL_DEADLINES, mealTime);
  await setDoc(ref, {
    deadlineISO,
    createdAt: new Date().toISOString(),
  });
}
