import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const noNavbarPages = ["/landing", "/login", "/signup", "/forgotpassword"];

  return (
    <>
      {!noNavbarPages.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}
