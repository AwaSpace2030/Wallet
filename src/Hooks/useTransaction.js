import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid)
    );

    // Realtime listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const trans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(trans);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addTransaction = async (title, amount) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    try {
      const newTransaction = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        title,
        amount: Number(amount),
        date: new Date().toISOString(),
      };

      await addDoc(collection(db, "transactions"), newTransaction);
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
  };
}
