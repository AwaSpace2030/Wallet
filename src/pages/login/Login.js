import { useState } from "react";
import styles from "../login/login.module.css";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <div className={`container ${styles.login}`}>
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles["login-form"]}
        onSubmit={handleSubmit}
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

        <button type="submit" className="btn-primary btn-submit">
          Login
        </button>
      </motion.form>
    </div>
  );
}

export default Login;
