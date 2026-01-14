// services/TotalTransactions.js
export function calculateTotalTransactions(transactions) {
  if (!transactions || transactions.length === 0) return 0;

  return transactions.length;
}
