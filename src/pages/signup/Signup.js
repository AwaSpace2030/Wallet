import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";
import { useSignup } from "../../Hooks/UseSignup";
import { Link } from "react-router-dom";
import Snackbar from "../../component/Snackbar";
import { validatePassword } from "../../utils/validatePassword";
import { useNavigate } from "react-router-dom";
import { addUserToDB } from "../../utils/userService";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [localPending, setLocalPending] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const pwdError = validatePassword(password, confirmPassword);
    if (pwdError) {
      setErrorMessage(pwdError);
      return;
    }

    setLocalPending(true);
    try {
      const { user, error } = await signup(email, password);

      if (user) {
        await addUserToDB(email, name);

        setSuccessMessage("Account created successfully 🎉");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");

        setTimeout(() => {
          navigate("/");
        }, 4000);
      }

      if (error) setErrorMessage(error);
    } catch {
      setErrorMessage("Unexpected error");
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

        {successMessage && (
          <Snackbar text={successMessage} type="success" duration={3000} />
        )}

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p className={styles.info}>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>{" "}
          <Link to="/dashboard" className="link">
            dashboard
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
