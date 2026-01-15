import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import DemoAccountCard from "../../component/DemoAccount";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setIsPending(true);

    const { user, error } = await login(email, password);

    if (error) {
      setErrorMessage(error);
      setIsPending(false);
      return;
    }

    if (user) {
      setEmail("");
      setPassword("");

      navigate("/dashboard", {
        state: {
          snackbar: {
            message: "Login successful 🎉",
            type: "success",
          },
        },
      });
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
        <h2>Login</h2>

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

        <button
          type="submit"
          className="btn-primary btn-submit"
          disabled={isPending}
        >
          {isPending ? <span className="spinner"></span> : "Login"}
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <p>
          Not a member?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>

        <Link to="/forgotpassword" className="link">
          Forgot password?
        </Link>
        <DemoAccountCard />
      </motion.form>
    </div>
  );
}

export default Login;
