import Footer from "../../component/Footer";
import NavbarLanding from "../../component/NavbarLanding";
import styles from "./about.module.css";
import { FiExternalLink } from "react-icons/fi";

import {
  FiTrendingUp,
  FiLayout,
  FiLock,
  FiSmartphone,
  FiTarget,
} from "react-icons/fi";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function About() {
  const features = [
    { icon: <FiTrendingUp />, text: "Track daily expenses" },
    { icon: <FiLayout />, text: "Categorize expenses" },
    { icon: <FiTrendingUp />, text: "Monthly expense dashboard" },
    { icon: <FiTrendingUp />, text: "Visual charts & statistics" },
    { icon: <FiLayout />, text: "Simple and clean interface" },
    { icon: <FiLock />, text: "Secure authentication" },
    { icon: <FiSmartphone />, text: "Responsive design" },
    { icon: <FiLock />, text: "Cloud data storage with Firebase" },
  ];

  const techStack = [
    "React",
    "React Router",
    "Firebase (Authentication & Cloud Firestore)",
    "CSS Modules",
    "Framer Motion",
  ];

  const futureImprovements = [
    "Dark mode for better user experience",
    "Export reports to PDF/CSV",
    "Notifications & reminders",
    "Income tracking (adding the ability to log and track income)",
  ];

  return (
    <div className={styles.About}>
      {/* Navbar */}
      <div className={styles.header}>
        <NavbarLanding />
      </div>

      {/* Main Container */}
      <div
        className={`${styles.container} ${styles["about-con"]} container about-con`}
      >
        {/* Page Title */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1>About Wallet</h1>
          <p className={styles.subtitle}>
            A minimal expense tracking application built for simplicity and
            clarity.
          </p>
        </motion.section>

        {/* Project Overview */}
        <motion.section
          className={styles["text-box"]}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Project Overview</h2>
          <p>
            Wallet is a personal finance React web application that helps users
            track their daily expenses in a clean and intuitive way. The focus
            of this project is to remove unnecessary complexity and provide a
            smooth user experience.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Features</h2>
          <ul className={styles["feat-cards"]}>
            {features.map((f, idx) => (
              <motion.li
                className={styles.card}
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
              >
                <span className={styles.icon}>{f.icon}</span>
                <span>{f.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Tech Stack</h2>
          <ul className={styles["tech-tags"]}>
            {techStack.map((tech, idx) => (
              <motion.li
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
              >
                {tech}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Purpose */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Purpose</h2>
          <p>
            This project was created as a learning experience and a foundation
            for future features and improvements.
          </p>
        </motion.section>

        {/* Future Improvements */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Future Improvements</h2>
          <ul className={styles["feat-cards"]}>
            {futureImprovements.map((item, idx) => (
              <motion.li
                className={styles.card}
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
              >
                <span className={styles.icon}>
                  <FiTarget />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>View on GitHub</h2>
          <p>
            Curious to see the code? Visit the project on GitHub:{" "}
            <a
              href="https://github.com/AwaSpace2030/Wallet"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkOut}
            >
              Wallet GitHub Repository <FiExternalLink />
            </a>
            .
          </p>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
