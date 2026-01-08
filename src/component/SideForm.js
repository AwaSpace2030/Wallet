import { useState } from "react";
import { useTransactions } from "../Hooks/useTransaction";
import styles from "./Transactions.module.css";

export function SideForm() {
  const [tranName, setTransName] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction, loading, error } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tranName || !amount) return;

    const newTransId = await addTransaction(tranName, amount);
    if (newTransId) {
      setTransName("");
      setAmount("");
    }
  };

  return (
    <div className={`${styles["right-side"]} Boxshadow`}>
      <h3>Add Transaction</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className={`form ${styles["trans-form"]}`} onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name</span>
          <input
            type="text"
            placeholder="Enter transaction"
            value={tranName}
            onChange={(e) => setTransName(e.target.value)}
          />
        </label>

        <label>
          <span>Amount ($)</span>
          <input
            type="number"
            placeholder="Amount in $"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button
          className={`${styles["submit-btn"]} btn-primary`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
