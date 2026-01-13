import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuth } from "../Context/AppUserContext";
import { auth } from "../firebase/config";
import { IoExitOutline, IoPersonCircle } from "react-icons/io5";

function Navbar() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const showUserMenu = !loading && user && userData?.name;

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navCon}`}>
        <Link to="/">
          <div className={styles["logo-con"]}>
            <img
              src="/logo.svg"
              alt="Wallet Logo"
              className={styles["logo-icon"]}
            />
            <h2 className={styles.logo}>Wallet</h2>
          </div>
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

          {showUserMenu && (
            <>
              <ul className={styles["rs-nav"]}>
                <Link to="/dashboard" className="link-effect">
                  Dashboard
                </Link>
                <Link to="/transaction" className="link-effect">
                  Transactions
                </Link>
              </ul>
              <div className={styles.userInfo}>
                <IoPersonCircle size={30} className={styles.userIcon} />
                <span className={styles.username}>{userData.name}</span>
              </div>
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
