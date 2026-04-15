import {
  subDays,
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from "date-fns";

const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [45000, 85000] },
    { name: "freelance", range: [8000, 30000] },
    { name: "investments", range: [3000, 15000] },
    { name: "other-income", range: [1000, 8000] },
  ],
  EXPENSE: [
    { name: "housing", range: [8000, 20000] },
    { name: "transportation", range: [500, 4000] },
    { name: "groceries", range: [1500, 6000] },
    { name: "utilities", range: [800, 3000] },
    { name: "entertainment", range: [500, 2500] },
    { name: "food", range: [300, 1500] },
    { name: "shopping", range: [1000, 8000] },
    { name: "healthcare", range: [500, 10000] },
    { name: "education", range: [2000, 12000] },
    { name: "travel", range: [3000, 25000] },
  ],
};

const getNextDate = (date, interval) => {
  if (interval === "DAILY") return addDays(date, 1);
  if (interval === "WEEKLY") return addWeeks(date, 1);
  if (interval === "MONTHLY") return addMonths(date, 1);
  if (interval === "YEARLY") return addYears(date, 1);
  return null;
};

const getRandomAmount = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomCategory = (type) => {
  const list = CATEGORIES[type];
  const random = list[Math.floor(Math.random() * list.length)];
  return {
    category: random.name,
    amount: getRandomAmount(random.range[0], random.range[1]),
  };
};

export const generateTransactions = (days = 90) => {
  const transactions = [];
  let totalBalance = 0;
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const perDay = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < perDay; j++) {
      const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
      const { category, amount } = getRandomCategory(type);

      const recurring = Math.random() < 0.15;
      const intervals = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
      const recurringInterval = recurring
        ? intervals[Math.floor(Math.random() * intervals.length)]
        : null;

      const transaction = {
        id: crypto.randomUUID(),
        type,
        amount,
        description:
          type === "INCOME" ? `Received ${category}` : `Paid for ${category}`,
        date: date.toISOString(),
        category,
        status: "COMPLETED",
        recurring,
        recurringInterval,
        nextRecurringDate: recurring
          ? getNextDate(date, recurringInterval)?.toISOString()
          : null,
      };

      transactions.push(transaction);
      totalBalance += type === "INCOME" ? amount : -amount;

      if (recurring) {
        let nextDate = getNextDate(date, recurringInterval);

        while (nextDate && nextDate <= today) {
          const recurringTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
            date: nextDate.toISOString(),
            nextRecurringDate: getNextDate(nextDate, recurringInterval)?.toISOString(),
          };

          transactions.push(recurringTransaction);
          totalBalance += type === "INCOME" ? amount : -amount;

          nextDate = getNextDate(nextDate, recurringInterval);
        }
      }
    }
  }

  return { transactions, totalBalance };
};
