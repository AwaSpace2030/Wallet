import styles from "./dashboard.module.css";
import Snackbar from "../../component/Snackbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AppUserContext";
import Transactions from "../../component/Transactions";
import { formatDate } from "../../utils/formatDate";

export default function Dashboard() {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState(null);

  const { userData, loading } = useAuth();
  const userName = userData?.name || "User";

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className={`${styles.dashboard} container`}>
      <div className={styles.header}>
        {loading && <p>Loading your data...</p>}
        {!loading && (
          <h3>
            Welcome <span className={styles["w-user"]}>{userName}</span>{" "}
            <span className={styles.animateEmoji}>👋</span>
          </h3>
        )}
        <div className="today-date">{formatDate()}</div>
      </div>

      <Transactions />

      {snackbar && (
        <Snackbar
          text={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration || 3000}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
}
