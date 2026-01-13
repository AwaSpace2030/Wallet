// src/component/Dashboard/TotalExpenses.jsx
import styles from "./TotalExpenses.module.css";
import { motion } from "framer-motion";

export default function TotalExpenses({
  mainValue,
  subtitle = "Total Expenses",
  title = "This month",
}) {
  return (
    <motion.div
      className={styles.boxCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {mainValue && <h3 className={styles.mainValue}>{mainValue}</h3>}
      {title && <p className={styles.title}>{title}</p>}
    </motion.div>
  );
}
