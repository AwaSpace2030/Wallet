import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";
import { useSignup } from "../../Hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validatePassword";
import { auth } from "../../firebase/config";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [localPending, setLocalPending] = useState(false);

  const navigate = useNavigate();
  const { signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const pwdError = validatePassword(password, confirmPassword);
    if (pwdError) {
      setErrorMessage(pwdError);
      return;
    }

    setLocalPending(true);

    try {
      const { user, userData, error } = await signup(email, password, name);

      if (!user || !userData) {
        throw new Error(error || "Signup failed");
      }

      navigate("/dashboard", {
        state: {
          snackbar: {
            message: "You’re all set! Registration completed successfully 🎉",
            type: "success",
          },
        },
      });
    } catch (err) {
      await auth.signOut();
      setErrorMessage(err.message);
    } finally {
      setLocalPending(false);
    }
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
        <h2>Create Account</h2>

        <label className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>

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

        <label className={styles.label}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>

        <label className={styles.label}>
          <span>Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </label>

        <button
          type="submit"
          className="btn-primary btn-submit"
          disabled={localPending}
        >
          {localPending ? <span className="spinner"></span> : "Sign Up"}
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p className={styles.info}>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
