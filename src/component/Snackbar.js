import { useEffect, useState } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ text, type, duration }) => {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) return;

    setDisplayText(text);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [text, duration]);

  return (
    <div
      className={`${styles.snackbar} ${styles[type]} ${
        visible ? styles.show : styles.hide
      }`}
    >
      {displayText}
    </div>
  );
};

export default Snackbar;
