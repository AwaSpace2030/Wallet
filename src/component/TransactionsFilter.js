import styles from "./TransactionsFilter.module.css";

export default function TransactionsFilter({ filters, onChange, onApply }) {
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
  return (
    <div className={styles["filter-con"]}>
      <form className={`form ${styles["form-filter"]}`}>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categoryList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
        />
      </form>
    </div>
  );
}
