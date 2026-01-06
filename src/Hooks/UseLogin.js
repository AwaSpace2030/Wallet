// src/Hooks/useLogin.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { user: res.user, error: null };
    } catch (err) {
      const errorMessages = {
        "auth/user-not-found": "No account found with this email",
        "auth/wrong-password": "Incorrect password",
        "auth/invalid-email": "Invalid email address",
        "auth/network-request-failed": "Network error, try again",
      };

      const message =
        errorMessages[err.code] || "Login failed, please try again";

      return { user: null, error: message };
    }
  };

  return { login };
};
