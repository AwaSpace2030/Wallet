import { Link, useNavigate } from "react-router-dom";
import styles from "./landing.module.css";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <Link to={"/home"}>
          <div className={styles["nav-logo"]}>
            <img src="/logo-green.svg" className="logo" />
            <p>Wallet</p>
          </div>
        </Link>

        <ul className={styles["right-nav"]}>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
      </div>

      <div className={styles["landing-con"]}>
        <motion.div
          className={styles["left-side"]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles["hero-img"]}></div>
        </motion.div>

        <div className={styles["right-side"]}>
          <motion.img
            src="/logo.svg"
            alt="logo"
            className="logo"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Wallet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Easily Track Your Daily Expenses
          </motion.p>

          <motion.ul
            className={styles.features}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <li>Free to use</li>
            <li>Secure</li>
            <li>Easy setup</li>
          </motion.ul>

          <motion.button
            onClick={() => navigate("/login")}
            className={`btn-primary ${styles["btn-start"]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
