import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { DATABASE_MEAL_OPTIONS } from "../constants/firebase_constants";

//mealoptions collection reference
const mealOptionsRef = collection(db, DATABASE_MEAL_OPTIONS);

export async function addMealOption(mealData) {
  const docRef = await addDoc(mealOptionsRef, mealData);
  return docRef.id;
}

export async function getMealOption() {
  const snapshot = await getDocs(mealOptionsRef);

  return snapshot.forEach((doc) => {
    ({
      id: doc.id,
      ...doc.data(),
    });
  });
}

export async function updateMealOption(mealID, updateData) {
  const mealRef = doc(db, DATABASE_MEAL_OPTIONS, mealID);
  await updateDoc(mealRef, updateData);
}

export async function deletseMealOption(mealID) {
  await deleteDoc(doc(db, DATABASE_MEAL_OPTIONS, mealID));
}
