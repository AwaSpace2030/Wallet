import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute check:", { user, loading });

  if (loading) return <span className="spinner"></span>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
