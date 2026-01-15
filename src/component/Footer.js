import styles from "./Footer.module.css";

import { FiHeart } from "react-icons/fi"; // Feather

function Footer() {
  return (
    <footer>
      <p>
        © 2026 Wallet. Built with care for your finances <FiHeart />
      </p>
    </footer>
  );
}

export default Footer;
