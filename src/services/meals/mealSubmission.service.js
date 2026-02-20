import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DATABASE_MEAL_SUBMISSION } from "../../constants/firebase_constants";

const submissionRef = collection(db, DATABASE_MEAL_SUBMISSION);
// to submit meals by employes
export async function submitMeal(payload) {
  const docRef = await addDoc(submissionRef, payload);
  return docRef.id;
}

// live service
export function fetchTodaysSubmissions(callback) {
  const today = new Date().toISOString().split("T")[0];

  const q = query(submissionRef, where("date", "==", today));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      console.log("No submissions found");
      callback([]);
      return;
    }

    const submissions = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    submissions.forEach((submission) => {
      console.table(submission);
    });
    callback(submissions);
  });
  return unsubscribe;
}

export async function fetchTodaysSubmissionUser(username, date) {
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
