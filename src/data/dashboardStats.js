export const getDashboardStats = (transactions) => {
  let income = 0;
  let expense = 0;
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "INCOME") {
      income += t.amount;
    } else {
      expense += t.amount;
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  let topCategory = null;
  let max = 0;

  for (const cat in categoryMap) {
    if (categoryMap[cat] > max) {
      max = categoryMap[cat];
      topCategory = cat;
    }
  }

  const net = income - expense;
  const savingsRate = income > 0 ? (net / income) * 100 : 0;

  return {
    income,
    expense,
    net,
    savingsRate,
    topCategory,
  };
};