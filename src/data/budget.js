export const getCurrentBudget = (transactions) => {
  const budget = JSON.parse(localStorage.getItem("budget"));

  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );

  const currentExpenses = transactions
    .filter((t) => {
      const txnDate = new Date(t.date);
      return (
        t.type === "EXPENSE" &&
        txnDate >= startOfMonth &&
        txnDate < endOfMonth
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const hasBudget = budget !== null && budget !== undefined;

  const remaining = hasBudget ? budget - currentExpenses : null;

  const percentageUsed =
    hasBudget && budget > 0
      ? Math.min((currentExpenses / budget) * 100, 100)
      : 0;

  return {
    budget,
    currentExpenses,
    remaining,
    percentageUsed,
  };
};