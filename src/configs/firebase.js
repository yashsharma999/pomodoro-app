import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXDa8tmPMDjpPR66q7sAQ6NA7xY21Chw0",
  authDomain: "pomodoro-app-ca5d2.firebaseapp.com",
  projectId: "pomodoro-app-ca5d2",
  storageBucket: "pomodoro-app-ca5d2.appspot.com",
  messagingSenderId: "197721182418",
  appId: "1:197721182418:web:d32c43f88d3091310d5d0b",
  measurementId: "G-NC9CMHBQ70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
