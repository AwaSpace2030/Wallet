import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AppUserContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="router-spinner">
        <span className="spinner spinner-large"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return <Outlet />;
}
