import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase/config";
import { IoExitOutline } from "react-icons/io5";

function Navbar() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut(); // تسجيل الخروج
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <nav>
      <div className={`container ${styles.navCon}`}>
        <Link to="/">
          <h2 className={styles.logo}>Wallet</h2>
        </Link>
        <div className={styles["right-nav"]}>
          {!loading && !user && (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn-out-line">
                Signup
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link to="/" className="basic-link">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="btn-out-line">
                Sign Out <IoExitOutline />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
