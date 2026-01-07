import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const addUserToDB = async (email, name) => {
  try {
    await addDoc(collection(db, "users"), {
      email,
      name,
      createdAt: new Date().toISOString(),
    });
    console.log("User added to Firestore successfully");
  } catch (error) {
    console.error("Error adding user to Firestore:", error.message);
    throw error;
  }
};
