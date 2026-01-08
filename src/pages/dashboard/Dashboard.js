import styles from "./dashboard.module.css";
import Snackbar from "../../component/Snackbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFirestoreData } from "../../Hooks/useFirestoreData";
import { auth } from "../../firebase/config";
import Transactions from "../../component/Transactions";
import { formatDate } from "../../utils/formatDate";

export default function Dashboard() {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState("");

  const userEmail = auth.currentUser?.email;
  const { data: users, loading, error } = useFirestoreData("users");

  const currentUser = users.find((user) => user.email === userEmail);
  const userName = currentUser ? currentUser.name : "";

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
    }
  }, [location.state]);

  return (
    <div className={`${styles.dashboard} container`}>
      <div className={styles.header}>
        {loading && <p>Loading your data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <h3>
            Welcome <span className={styles["w-user"]}> {userName} </span>👋
          </h3>
        )}
        <div className="today-date">{formatDate()}</div>
      </div>

      <Transactions />

      {snackbar && (
        <Snackbar
          text={snackbar}
          type="success"
          duration={3000}
          onClose={() => setSnackbar("")}
        />
      )}
    </div>
  );
}
