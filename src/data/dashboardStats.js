export const getDashboardStats = (transactions = []) => {
  let income = 0;
  let expense = 0;

  const categoryMap = {};
  let maxExpense = 0;
  let expenseCount = 0;

  let firstDate = null;
  let lastDate = null;

  transactions.forEach((t) => {
    const date = new Date(t.date);

    // Track date range
    if (!firstDate || date < firstDate) firstDate = date;
    if (!lastDate || date > lastDate) lastDate = date;

    if (t.type === "INCOME") {
      income += t.amount;
    }

    if (t.type === "EXPENSE") {
      expense += t.amount;
      expenseCount++;

      // Top category
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;

      // Biggest expense
      if (t.amount > maxExpense) {
        maxExpense = t.amount;
      }
    }
  });

  // Top category
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

  // Avg daily spend
  let avgDailySpend = 0;

  if (firstDate && lastDate) {
    const days =
      Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;

    avgDailySpend = days > 0 ? expense / days : 0;
  }

  const expenseRatio = income > 0 ? (expense / income) * 100 : 0;

  return {
    income,
    expense,
    net,
    savingsRate,
    topCategory,
    maxExpense,
    avgDailySpend,
    expenseRatio,
  };
};