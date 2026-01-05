import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isCancelled = useRef(false);
  const [, forceUpdate] = useState(0);

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { user: res.user, error: null };
    } catch (err) {
      if (!isCancelled.current) {
        const errorMessages = {
          "auth/email-already-in-use": "Email is already in use!",
          "auth/invalid-email": "Invalid email address!",
          "auth/weak-password": "Password is too weak!",
          "auth/network-request-failed": "Network error. Please try again.",
        };

        const message = errorMessages[err.code] || "An error occurred!";
        setError(message);
        return { user: null, error: message };
      }
      return { user: null, error: "An unknown error occurred!" };
    } finally {
      if (!isCancelled.current) setIsPending(false);
      forceUpdate((n) => n + 1);
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { error, isPending, signup };
};
