import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuth } from "../Context/AppUserContext";
import { auth } from "../firebase/config";
import { IoExitOutline, IoPersonCircle } from "react-icons/io5";

function Navbar() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const showUserMenu =
    !loading && user && userData?.name && location.pathname === "/";

  return (
    <nav className={styles.navbar}>
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

          {showUserMenu && (
            <>
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
