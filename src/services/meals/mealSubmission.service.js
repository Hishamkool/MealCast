import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { DATABASE_MEAL_SUBMISSION } from "../../constants/firebase_constants";

const submissionRef = collection(db, DATABASE_MEAL_SUBMISSION);
// to submit meals by employes
export async function submitMeal(payload) {
  const docRef = await addDoc(submissionRef, payload);
  return docRef.id;
}

export async function fetchTodaysSubmission(username, date) {
  if (!username || !date) {
    console.error("Empty parameters passed", { username, date });
    return [];
  }
  const q = query(
    submissionRef,
    where("username", "==", username),
    where("date", "==", date),
  );

  const snapshot = await getDocs(q);

  const submissionsToday = [];
  snapshot.forEach((doc) => {
    submissionsToday.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  console.log({ submissionsToday });
  return submissionsToday; // array of submissions
}
/* 
// const customID = generateCustomID(payload);
function generateCustomID(payload) {
  const { autoSubmitted, date, user, mealTime } = payload;
  const userFormatted = user.toLowerCase().trim().replace(/\s+/g, "_"); //\s is for white space character and + is for using only one _ for multiple consicutive whiteSpces

  const customID = `${date}_${userFormatted}_${mealTime}_${autoSubmitted ? "auto_submitted" : "user_submitted"}`;
  return customID;
}
 */
