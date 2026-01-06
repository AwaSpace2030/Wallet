import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isCancelled = useRef(false);

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!isCancelled.current) {
        setIsPending(false);
      }
      return { user: res.user, error: null };
    } catch (err) {
      const errorMessages = {
        "auth/email-already-in-use": "Email is already in use!",
        "auth/invalid-email": "Invalid email address!",
        "auth/weak-password": "Password is too weak!",
        "auth/network-request-failed": "Network error. Please try again.",
      };

      const message = errorMessages[err.code] || "An error occurred!";

      if (!isCancelled.current) setError(message);
      if (!isCancelled.current) setIsPending(false);

      return { user: null, error: message };
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { error, isPending, signup };
};
