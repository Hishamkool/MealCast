import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DATABASE_MEAL_SUBMISSION } from "../constants/firebase_constants";

const submissionRef = collection(db, DATABASE_MEAL_SUBMISSION);

export async function submitMeal(payload) {
  return await addDoc(submissionRef, payload);
}
