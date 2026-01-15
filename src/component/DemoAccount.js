// DemoAccountCard.jsx
import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import styles from "./DemoAccountCard.module.css"; // أنشئ CSS خاص إذا أحببت

export default function DemoAccountCard() {
  return (
    <div className={styles.card}>
      <h4>Demo Account</h4>
      <div className={styles.info}>
        <div className={styles.row}>
          <FiMail className={styles.icon} />
          <span>admin@gmail.com</span>
        </div>
        <div className={styles.row}>
          <FiLock className={styles.icon} />
          <span>Pass123321*</span>
        </div>
      </div>
    </div>
  );
}
