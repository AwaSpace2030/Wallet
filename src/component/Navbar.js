import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase/config";
import { IoExitOutline, IoPersonCircle } from "react-icons/io5";
import { useFirestoreData } from "../Hooks/UseFirestoreData";

function Navbar() {
  // Auth context to get current user and loading state
  const { user, loading: authLoading } = useAuth();

  // Firestore hook to get users collection and loading state
  const { data: users, loading: usersLoading } = useFirestoreData("users");

  // Location to check current path
  const location = useLocation();

  // Local state to store the current user's name
  const [currentUserName, setCurrentUserName] = useState("User");

  // Effect to update currentUserName when users data is loaded or user changes
  useEffect(() => {
    if (!usersLoading && user) {
      // Normalize emails to lower case to avoid case-sensitivity issues
      const matchedUser = users.find(
        (u) => u.email?.toLowerCase() === user.email.toLowerCase()
      );

      setCurrentUserName(matchedUser?.name || "User"); // fallback if not found
    }
  }, [users, usersLoading, user]);

  // Sign out function
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Determine if we should show user info
  // Only show the user's name and avatar on Dashboard page ("/")
  const showUserInfo = user && location.pathname === "/";

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navCon}`}>
        {/* Logo / Home link */}
        <Link to="/">
          <h2 className={styles.logo}>Wallet</h2>
        </Link>

        <div className={styles["right-nav"]}>
          {/* If user is not logged in, show Login and Signup buttons */}
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

          {/* If user is logged in and on Dashboard, show user info and Sign Out */}
          {showUserInfo && (
            <>
              <div className={styles.userInfo}>
                {/* Avatar icon */}
                <IoPersonCircle size={30} className={styles.userIcon} />
                {/* Display current user's name */}
                <span className={styles.username}>{currentUserName}</span>
              </div>

              {/* Sign out button */}
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
