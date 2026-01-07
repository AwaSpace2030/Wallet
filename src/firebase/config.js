import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZu1roO9o0pEyNlYmMRFQS0wEzzZrysRQ",
  authDomain: "reactlab-b02d5.firebaseapp.com",
  projectId: "reactlab-b02d5",
  storageBucket: "reactlab-b02d5.appspot.com",
  messagingSenderId: "899505822798",
  appId: "1:899505822798:web:f66ad1fd92875747b5b71f",
  measurementId: "G-FYGGKPGNLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
