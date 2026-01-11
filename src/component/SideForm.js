import { useState } from "react";
import { useTransactions } from "../Hooks/useTransaction";
import styles from "./Transactions.module.css";

export function SideForm() {
  const [tranName, setTransName] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction, loading, error } = useTransactions();
  const [category, setCategory] = useState("");

  const categoryList = [
    "Housing",
    "Utilities",
    "Food",
    "Transportation",
    "Health",
    "Education",
    "Clothing",
    "Entertainment",
    "Savings",
    "Others",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tranName || !amount) return;

    const newTransId = await addTransaction(tranName, amount, category);
    if (newTransId) {
      setTransName("");
      setAmount("");
      setCategory("");
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categoryList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

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
