import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <nav>
      <div className={`container ${styles.navCon}`}>
        <Link to="/">
          <h2 className={styles.logo}>Wallet</h2>
        </Link>
        <div className={styles["right-nav"]}>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-out-line">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
