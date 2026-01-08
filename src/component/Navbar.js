import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase/config";
import { IoExitOutline, IoPersonCircle } from "react-icons/io5";
import { useFirestoreData } from "../Hooks/useFirestoreData";

function Navbar() {
  const { user, loading: authLoading } = useAuth();
  const { data: users, loading: usersLoading } = useFirestoreData("users");
  const location = useLocation();
  const [currentUserName, setCurrentUserName] = useState("User");

  useEffect(() => {
    if (!usersLoading && user) {
      const matchedUser = users.find(
        (u) => u.email?.toLowerCase() === user.email.toLowerCase()
      );
      setCurrentUserName(matchedUser?.name || "User");
    }
  }, [users, usersLoading, user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const showUserInfo = user && location.pathname === "/";

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navCon}`}>
        <Link to="/">
          <h2 className={styles.logo}>Wallet</h2>
        </Link>

        <div className={styles["right-nav"]}>
          {!authLoading && !user && (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn-out-line">
                Signup
              </Link>
            </>
          )}

          {showUserInfo && (
            <>
              <div className={styles.userInfo}>
                <IoPersonCircle size={30} className={styles.userIcon} />
                <span className={styles.username}>{currentUserName}</span>
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
