import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Snackbar from "../../component/Snackbar";
import { useAuth } from "../../Context/AppUserContext";
import Headerbar from "../../component/Header/Headerbar";
import { useTransactions } from "../../Hooks/useTransaction";
import TotalExpenses from "../../component/Dashboard/TotalExpenses";

function Dashboard() {
  const location = useLocation();
  const { userData, loading } = useAuth();
  const userName = userData?.name || "User";
  const { transactions, loading: txLoading, error } = useTransactions();

  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const totalAmount = transactions.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );

  return (
    <div className="dashboard container">
      <Headerbar
        title="Dashboard"
        subtitle="Track and manage your expenses with ease"
        userName={userName}
        loading={loading}
      />

      {snackbar && (
        <Snackbar
          text={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration || 3000}
          onClose={() => setSnackbar(null)}
        />
      )}

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          marginTop: "20px",
        }}
      >
        <TotalExpenses
          subtitle="Total Expenses"
          mainValue={`$${totalAmount.toFixed(2)}`}
          title="This month"
        />
      </div>

      {txLoading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Dashboard;
