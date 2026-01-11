import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export function LayoutWithNavbar({ children }) {
  const location = useLocation();

  const navbarPages = ["/", "/profile"];

  const showNavbar = navbarPages.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
