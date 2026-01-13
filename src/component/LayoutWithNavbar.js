import { useLocation, Outlet } from "react-router-dom";

export default function LayoutWithNavbar() {
  const location = useLocation();

  const navbarPages = ["/dashboard", "/transaction", "/profile"];
  const showNavbar = navbarPages.includes(location.pathname);

  return (
    <>
      {showNavbar}
      <Outlet />
    </>
  );
}
