import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

import NavbarLanding from "../../component/NavbarLanding";
import styles from "./landing.module.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <NavbarLanding />

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
          <motion.lable
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={styles["intro-lable"]}
          >
            Web application to manage your expenses
          </motion.lable>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h1>
              Take Control of Your{" "}
              <span className={styles["highlight-text"]}>Daily Expenses </span>
              Easily
            </h1>
          </motion.h1>

          <motion.ul
            className={styles.features}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <li>
              <FiCheck className={styles.checkIcon} /> Easy expense tracking
            </li>
            <li>
              <FiCheck className={styles.checkIcon} /> Monthly statistics
            </li>
            <li>
              <FiCheck className={styles.checkIcon} /> User-friendly interface
            </li>
          </motion.ul>

          <div className={styles["intro-buttons"]}>
            <motion.button
              onClick={() => navigate("/login")}
              className={`btn-primary ${styles["btn-start"]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Get Started
            </motion.button>
            <motion.button
              onClick={() => navigate("/About")}
              className={`btn-primary ${styles["btn-more"]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
