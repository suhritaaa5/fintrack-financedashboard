import { subDays } from "date-fns";


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

// Random amount generator
const getRandomAmount = (min, max) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

// Random category generator
const getRandomCategory = (type) => {
  const list = CATEGORIES[type];
  const random = list[Math.floor(Math.random() * list.length)];

  return {
    category: random.name,
    amount: getRandomAmount(random.range[0], random.range[1]),
  };
};

// MAIN FUNCTION
export const generateTransactions = (days = 90) => {
  const transactions = [];
  let totalBalance = 0;

  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);

    // 1–3 transactions per day
    const perDay = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < perDay; j++) {
      const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
      const { category, amount } = getRandomCategory(type);

      const transaction = {
        id: crypto.randomUUID(),
        type,
        amount,
        description:
          type === "INCOME"
            ? `Received ${category}`
            : `Paid for ${category}`,
        date,
        category,
        status: "COMPLETED",
      };

      totalBalance += type === "INCOME" ? amount : -amount;
      transactions.push(transaction);
    }
  }

  return {
    transactions,
    totalBalance,
  };
};