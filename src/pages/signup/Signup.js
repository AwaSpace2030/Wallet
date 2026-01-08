import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";
import { useSignup } from "../../Hooks/useSignup";
import { Link } from "react-router-dom";
import Snackbar from "../../component/Snackbar";
import { validatePassword } from "../../utils/validatePassword";
import { useNavigate } from "react-router-dom";
import { addUserToDB } from "../../utils/userService";

export default function Signup() {
  // Local states for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // Local states for feedback and loading
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [localPending, setLocalPending] = useState(false);

  const navigate = useNavigate(); // Hook for programmatic navigation
  const { signup } = useSignup(); // Custom hook for signing up users

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    // Validate password and confirm password
    const pwdError = validatePassword(password, confirmPassword);
    if (pwdError) {
      setErrorMessage(pwdError);
      return;
    }

    setLocalPending(true); // Show spinner while processing

    try {
      // Sign up user with email and password
      const { user, error } = await signup(email, password);

      if (user) {
        // Add user to Firestore
        await addUserToDB(email, name);

        // Show success message via Snackbar
        setSuccessMessage("Account created successfully 🎉");

        // Navigate to Dashboard after a short delay
        setTimeout(() => {
          navigate("/"); // Redirect to Dashboard
        }, 2000); // 2 seconds delay for user feedback
      }

      if (error) setErrorMessage(error);
    } catch {
      setErrorMessage("Unexpected error");
    } finally {
      setLocalPending(false); // Hide spinner
    }
  };

  return (
    <div className={`container ${styles.login}`}>
      <motion.form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }} // Animation on mount
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Create Account</h2>

        {/* Name input */}
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

        {/* Email input */}
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

        {/* Password input */}
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

        {/* Confirm Password input */}
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

        {/* Submit button */}
        <button
          type="submit"
          className="btn-primary btn-submit"
          disabled={localPending}
        >
          {localPending ? <span className="spinner"></span> : "Sign Up"}
        </button>

        {/* Snackbar for success messages */}
        {successMessage && (
          <Snackbar text={successMessage} type="success" duration={3000} />
        )}

        {/* Display error messages */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {/* Links to Login and Dashboard */}
        <p className={styles.info}>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>{" "}
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
