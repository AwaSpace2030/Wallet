import styles from "./Transactions.module.css";

function Transactions() {
  return (
    <div className={`${styles["trans-con"]} trans-con-responsive`}>
      <div className={styles["main-con"]}>
        {/* هنا ستعرض قائمة العمليات بشكل بطاقة مختصرة */}
        Main Content
      </div>
      <div className={styles["right-side"]}>
        {/* هنا سيكون الفورم لإضافة العمليات */}
        Side Form
      </div>
    </div>
  );
}

export default Transactions;
