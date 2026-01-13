import "./App.css";
import "./styles/forms.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transactions/Transactions";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import About from "./pages/About/About";
import Landing from "./pages/Landing/Landing";

import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./Context/AppUserContext";
import LayoutWithNavbar from "./component/LayoutWithNavbar";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<LayoutWithNavbar />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transaction" element={<Transaction />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
