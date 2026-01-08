import { SideForm } from "./SideForm";
import styles from "./Transactions.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { useTransactions } from "../Hooks/useTransaction";

export default function Transactions() {
  const { transactions, deleteTransaction, loading, error } = useTransactions();

  return (
    <div className={`${styles["trans-con"]} trans-con-responsive`}>
      <div className={styles["main-con"]}>
        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul className={styles["transaction-list"]}>
          {transactions.length === 0 ? (
            <li className={styles["no-trans"]}>No transactions yet</li>
          ) : (
            transactions.map((t) => (
              <li key={t.id} className={styles["transaction-card"]}>
                <div className={styles["card-left"]}>
                  <h5>{t.title}</h5>
                  <p>
                    {new Date(t.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <h4>{Number(t.amount).toFixed(2)} $</h4>
                <button
                  className={styles["card-delete-btn"]}
                  onClick={() => deleteTransaction(t.id)}
                >
                  <IoCloseOutline />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <SideForm />
    </div>
  );
}
