import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // استيراد أيقونة GitHub
import styles from "./NavbarLanding.module.css";

function NavbarLanding() {
  return (
    <div className={styles.nav}>
      <Link to="/home">
        <div className={styles["nav-logo"]}>
          <img src="/logo.svg" className="logo" alt="logo" />
          <p>Wallet</p>
        </div>
      </Link>

      <ul className={styles["right-nav"]}>
        <li>
          <Link to="/landing">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <a
            href="https://github.com/AwaSpace2030/Wallet"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.getLink}
          >
            <FaGithub size={20} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavbarLanding;
