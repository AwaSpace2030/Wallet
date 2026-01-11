import "./App.css";
import "./styles/forms.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./Context/AppUserContext";
import Landing from "./pages/Landing/Landing";
import { LayoutWithNavbar } from "./component/LayoutWithNavbar";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWithNavbar>
          <Routes>
            <Route path="/home" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Landing />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LayoutWithNavbar>
      </Router>
    </AuthProvider>
  );
}

export default App;
