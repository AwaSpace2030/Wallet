import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsPending(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! 📧 Check your inbox.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong.");
    }

    setIsPending(false);
  };

  return (
    <div className={`container ${styles.login}`}>
      <motion.form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Forgot Password</h2>

        <label className={styles.label}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <button
          type="submit"
          className="btn-primary btn-submit"
          disabled={isPending}
        >
          {isPending ? <span className="spinner"></span> : "Send Reset Link"}
        </button>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p>
          Remembered your password?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>

        <p>
          Not a member?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default ForgotPassword;
