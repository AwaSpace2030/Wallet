import { useState } from "react";
import { SideForm } from "./SideForm";
import styles from "./Transactions.module.css";
import { useTransactions } from "../Hooks/useTransaction";
import TransactionsFilter from "./TransactionsFilter";
import { IoCloseOutline, IoPricetagOutline } from "react-icons/io5";
import { motion } from "framer-motion"; // ← استيراد Framer Motion

export default function Transactions() {
  const { transactions, deleteTransaction, loading, error } = useTransactions();

  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const filteredTransactions = transactions.filter((t) => {
    const matchCategory = !filters.category || t.category === filters.category;

    const transactionDate = new Date(t.date).setHours(0, 0, 0, 0);
    const startDate = filters.startDate
      ? new Date(filters.startDate).setHours(0, 0, 0, 0)
      : null;
    const endDate = filters.endDate
      ? new Date(filters.endDate).setHours(23, 59, 59, 999)
      : null;

    const matchStartDate = !startDate || transactionDate >= startDate;
    const matchEndDate = !endDate || transactionDate <= endDate;

    return matchCategory && matchStartDate && matchEndDate;
  });

  const totalAmount = filteredTransactions.reduce(
    (acc, t) => acc + Number(t.amount),
    0
  );

  return (
    <div className={`${styles["trans-con"]} trans-con-responsive`}>
      <div className={styles["main-con"]}>
        <TransactionsFilter
          filters={filters}
          onChange={setFilters}
          onReset={() =>
            setFilters({ category: "", startDate: "", endDate: "" })
          }
        />

        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul className={styles["transaction-list"]}>
          {filteredTransactions.length === 0 ? (
            <li className={styles["no-trans"]}>No transactions found</li>
          ) : (
            <>
              {filteredTransactions.map((t) => (
                <motion.li
                  key={t.id}
                  className={styles["transaction-card"]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles["card-left"]}>
                    <h5>{t.title}</h5>
                    <span className={styles["transaction-category"]}>
                      <IoPricetagOutline style={{ marginRight: "4px" }} />
                      {t.category}
                    </span>
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
                </motion.li>
              ))}

              <motion.li
                className={`${styles["transaction-card"]} ${styles["total-card"]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles["card-left"]}>
                  <h5>Total Expenses</h5>
                </div>
                <h4>{totalAmount.toFixed(2)} $</h4>
              </motion.li>
            </>
          )}
        </ul>
      </div>
      <SideForm />
    </div>
  );
}
