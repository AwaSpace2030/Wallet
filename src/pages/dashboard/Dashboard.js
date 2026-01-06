import styles from "./dashboard.module.css";
import Snackbar from "../../component/Snackbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState("");

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
    }
  }, [location.state]);

  return (
    <div className={`${styles.dashboard} container`}>
      <h1>Welcome to Dashboard 🎉</h1>
      <p>This is your main dashboard page.</p>

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
