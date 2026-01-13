import { formatDate } from "../../utils/formatDate";
import styles from "./headerbar.module.css";

export default function Headerbar({ title, subtitle, userName, loading }) {
  return (
    <div className={styles.header}>
      {loading ? (
        <p>Loading your data...</p>
      ) : (
        <>
          <div className={styles.left}>
            <h2>{title || "Page Title"}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          <div className={styles.right}>
            {userName && (
              <span>
                {userName}, {formatDate()}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
