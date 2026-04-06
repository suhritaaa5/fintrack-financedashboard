import {
  subDays,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
} from "date-fns";

const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
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
  Number((Math.random() * (max - min) + min).toFixed(2));

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

      // ✅ BASE TRANSACTION
      const transaction = {
  id: crypto.randomUUID(),
  type,
  amount,
  description:
    type === "INCOME"
      ? `Received ${category}`
      : `Paid for ${category}`,
  date: date,
  category,
  status: "COMPLETED",
  recurring,
  recurringInterval,
  nextRecurringDate: recurring
    ? getNextDate(date, recurringInterval)
    : null,
};

      transactions.push(transaction);
      totalBalance += type === "INCOME" ? amount : -amount;

      // ✅ GENERATE FUTURE OCCURRENCES
      if (recurring) {
        let nextDate = getNextDate(date, recurringInterval);

        while (nextDate && !isBefore(today, nextDate)) {
          const recurringTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
            date: nextDate,

            
            nextRecurringDate: getNextDate(nextDate, recurringInterval),
            
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