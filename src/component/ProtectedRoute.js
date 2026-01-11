import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AppUserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute check:", { user, loading });

  if (loading)
    return (
      <div className="router-spinner">
        <span className="spinner spinner-larg"></span>
      </div>
    );
  if (!user) return <Navigate to="/home" replace />;

  return children;
}
