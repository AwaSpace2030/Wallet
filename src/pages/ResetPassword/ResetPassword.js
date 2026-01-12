import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../firebase/config";
import styles from "../login/login.module.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const oobCode = searchParams.get("oobCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.confirmPasswordReset(oobCode, password);
      setMessage("Password reset successfully ✅");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className={`container ${styles.login}`}>
      <form className={`form ${styles["login-form"]}`} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <label className={styles.label}>
          <span>New Password</span>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn-primary btn-submit">
          Reset Password
        </button>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
}
