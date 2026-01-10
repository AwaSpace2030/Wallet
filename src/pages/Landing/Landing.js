import { useNavigate } from "react-router-dom";
import styles from "./landing.module.css";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {/* Right Side - Image */}
      <motion.div
        className={styles["right-side"]}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles["cover-img"]}></div>
      </motion.div>

      {/* Left Side - Content */}
      <div className={styles["left-side"]}>
        {/* Logo from top */}
        <motion.img
          src="/logo.svg"
          alt="logo"
          className="logo"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* H1 from top */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Wallet
        </motion.h1>

        {/* Paragraph from top */}
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Easily Track Your Daily Expenses
        </motion.p>

        {/* Button from bottom */}
        <motion.button
          onClick={() => navigate("/login")}
          className={`btn-primary ${styles["btn-start"]}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}

export default Landing;
