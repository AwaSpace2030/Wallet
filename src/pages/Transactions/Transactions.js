import styles from "./Transactions.module.css";
import Transactions from "../../component/Transactions";
import Headerbar from "../../component/Header/Headerbar";
import { useAuth } from "../../Context/AppUserContext";

export default function Transaction() {
  const { userData, loading } = useAuth();
  const userName = userData?.name || "User";

  return (
    <div className="container">
      <Headerbar
        title="Transactions"
        subtitle="Track and manage your expenses with ease"
        userName={userName}
        loading={loading}
      />

      <Transactions />
    </div>
  );
}
