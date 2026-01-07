import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useFirestoreData = (collectionName, options = {}) => {
  const { orderBy: orderField, orderDirection, fields } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let colRef = collection(db, collectionName);

    // Apply ordering if provided
    if (orderField) {
      colRef = query(colRef, orderBy(orderField, orderDirection || "asc"));
    }

    // Realtime listener
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter fields if provided
        if (fields && fields.length > 0) {
          const filteredDocs = docs.map((doc) => {
            const obj = {};
            fields.forEach((field) => {
              if (doc[field] !== undefined) obj[field] = doc[field];
            });
            return { id: doc.id, ...obj };
          });
          setData(filteredDocs);
        } else {
          setData(docs);
        }

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderField, orderDirection, fields]);

  return { data, loading, error };
};
