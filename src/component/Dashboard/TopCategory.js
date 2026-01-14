import styles from "./DashboardCards.module.css";
import { motion } from "framer-motion";
import { IoStarOutline } from "react-icons/io5";
import { calculateTopCategory } from "../../services/TopCategory";

export default function TopCategory({
  mainValue,
  subtitle = "Top Category",
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
      <div className={styles.cardContent}>
        <div className={styles.textPart}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {title && (
            <p className={`${styles.title} ${styles["category-title"]}`}>
              {title}
            </p>
          )}
          {mainValue && (
            <h3 className={`${styles.mainValue} ${styles["Category-value"]} `}>
              {mainValue}
            </h3>
          )}
        </div>

        <div className={styles.iconPart}>
          <IoStarOutline />
        </div>
      </div>
    </motion.div>
  );
}
