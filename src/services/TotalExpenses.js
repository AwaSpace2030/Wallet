// services/calculateTotalExpenses.js
export function calculateTotalExpenses(transactions) {
  if (!transactions || transactions.length === 0) return 0;
  return transactions.reduce((sum, t) => sum + Number(t.amount), 0);
}
