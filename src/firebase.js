import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByBmI2d9bE6ImRzwqom_MwfFZx1e43Lt4",
  authDomain: "hive-cbbbc.firebaseapp.com",
  projectId: "hive-cbbbc",
  storageBucket: "hive-cbbbc.appspot.com",
  messagingSenderId: "621161163647",
  appId: "1:621161163647:web:310cfa823fc72b7d18c84a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
