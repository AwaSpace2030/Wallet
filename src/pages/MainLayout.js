import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="private-content">
        <Outlet />
      </div>
    </>
  );
}
