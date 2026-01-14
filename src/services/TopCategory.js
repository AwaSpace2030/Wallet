// services/calculateTopCategory.js
export function calculateTopCategory(transactions) {
  if (!transactions || transactions.length === 0)
    return { category: "-", total: 0 };

  const categoryMap = {};

  transactions.forEach((t) => {
    const category = t.category || "Uncategorized";
    const amount = Number(t.amount) || 0;

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += amount;
  });

  let topCategory = "";
  let maxTotal = 0;

  for (const [category, total] of Object.entries(categoryMap)) {
    if (total > maxTotal) {
      maxTotal = total;
      topCategory = category;
    }
  }

  return { category: topCategory, total: maxTotal };
}
