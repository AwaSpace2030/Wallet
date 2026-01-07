import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const useFirestoreData = (collectionName, options = {}) => {
  const [data, setData] = useState([]); // لتخزين النتائج
  const [loading, setLoading] = useState(true); // حالة الانتظار
  const [error, setError] = useState(null); // حالة الخطأ

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let colRef = collection(db, collectionName);

        if (options.orderBy) {
          colRef = query(
            colRef,
            orderBy(options.orderBy, options.orderDirection || "asc")
          );
        }

        const snapshot = await getDocs(colRef);

        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (options.fields && options.fields.length > 0) {
          const filteredDocs = docs.map((doc) => {
            const obj = {};
            options.fields.forEach((field) => {
              if (doc[field] !== undefined) obj[field] = doc[field];
            });
            return { id: doc.id, ...obj };
          });
          setData(filteredDocs);
        } else {
          setData(docs);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, JSON.stringify(options)]);

  return { data, loading, error };
};
