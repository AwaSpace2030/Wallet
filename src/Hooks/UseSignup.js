import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase/config"; //
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isCancelled = useRef(false);

  const signup = async (email, password, name) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", res.user.uid);
      await setDoc(userDocRef, { name, email });

      if (!isCancelled.current) setIsPending(false);

      return { user: res.user, userData: { name, email }, error: null };
    } catch (err) {
      if (!isCancelled.current) setError(err.message);
      if (!isCancelled.current) setIsPending(false);
      return { user: null, userData: null, error: err.message };
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { error, isPending, signup };
};
