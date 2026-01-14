import styles from "../DashboardCards.module.css";
import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpensesOverTime({ transactions }) {
  const prepareLastMonthData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const dailyTotals = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        const day = date.getDate();
        const amount = Number(t.amount) || 0;
        dailyTotals[day] = (dailyTotals[day] || 0) + amount;
      }
    });

    return Object.keys(dailyTotals)
      .map((day) => ({
        day,
        amount: dailyTotals[day],
      }))
      .sort((a, b) => a.day - b.day);
  };

  const data = prepareLastMonthData();

  const monthName = new Date().toLocaleString("en-US", { month: "long" });

  if (!data.length) return <p>No expenses for this month</p>;

  return (
    <motion.div
      className={styles.boxCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <h3 className={styles.chartHeader}>Expenses Over Time – {monthName}</h3>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a6d44" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#0a6d44" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: "#333", fontSize: 12 }} />
            <YAxis
              tick={{ fill: "#333", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value) => `$${value}`} />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#1ec781"
              strokeWidth={2}
              dot={{ r: 5, fill: "#0a6d44" }}
              activeDot={{ r: 7, fill: "#0a6d44" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
