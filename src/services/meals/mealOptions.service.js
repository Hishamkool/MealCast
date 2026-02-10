import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  DATABASE_MEAL_DEADLINES,
  DATABASE_MEAL_OPTIONS,
} from "../../constants/firebase_constants";

//mealoptions collection reference
const mealOptionsRef = collection(db, DATABASE_MEAL_OPTIONS);

// Admin for setting meals menu items
export async function addMealOption(mealData) {
  const docRef = await addDoc(mealOptionsRef, mealData);
  return docRef.id;
}

// fetching meals to display them for employees dashboard
export async function fetchEmployeeMeals() {
  const mealsSnap = await getDocs(collection(db, DATABASE_MEAL_OPTIONS));
  const deadlineSnap = await getDocs(collection(db, DATABASE_MEAL_DEADLINES));

  const meals = mealsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const deadlines = deadlineSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { meals, deadlines };
}

/* export async function getMealOption() {
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

export async function deleteMealOption(mealID) {
  await deleteDoc(doc(db, DATABASE_MEAL_OPTIONS, mealID));
}
 */
