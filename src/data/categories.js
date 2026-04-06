export const defaultCategories = [
  // Income Categories (warm greens + golds)
  {
    id: "salary",
    name: "Salary",
    type: "INCOME",
    color: "#16a34a", // green-600
    icon: "Wallet",
  },
  {
    id: "freelance",
    name: "Freelance",
    type: "INCOME",
    color: "#22c55e", // green-500
    icon: "Laptop",
  },
  {
    id: "investments",
    name: "Investments",
    type: "INCOME",
    color: "#ca8a04", // yellow-600
    icon: "TrendingUp",
  },
  {
    id: "business",
    name: "Business",
    type: "INCOME",
    color: "#ea580c", // orange-600
    icon: "Building",
  },
  {
    id: "rental",
    name: "Rental",
    type: "INCOME",
    color: "#f59e0b", // amber-500
    icon: "Home",
  },
  {
    id: "other-income",
    name: "Other Income",
    type: "INCOME",
    color: "#78716c", // warm gray
    icon: "Plus",
  },

  // Expense Categories (warm reds/oranges/pinks)
  {
    id: "housing",
    name: "Housing",
    type: "EXPENSE",
    color: "#dc2626", // red-600
    icon: "Home",
  },
  {
    id: "transportation",
    name: "Transportation",
    type: "EXPENSE",
    color: "#f97316", // orange-500
    icon: "Car",
  },
  {
    id: "groceries",
    name: "Groceries",
    type: "EXPENSE",
    color: "#65a30d", // lime-600
    icon: "Shopping",
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "EXPENSE",
    color: "#0ea5e9", // sky-500 (slight contrast)
    icon: "Zap",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "EXPENSE",
    color: "#c026d3", // fuchsia-600
    icon: "Film",
  },
  {
    id: "food",
    name: "Food",
    type: "EXPENSE",
    color: "#f97316", // orange-500 (fits theme 🔥)
    icon: "UtensilsCrossed",
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "EXPENSE",
    color: "#db2777", // pink-600
    icon: "ShoppingBag",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    type: "EXPENSE",
    color: "#14b8a6", // teal-500 (balanced)
    icon: "HeartPulse",
  },
  {
    id: "education",
    name: "Education",
    type: "EXPENSE",
    color: "#7c3aed", // violet-600
    icon: "GraduationCap",
  },
  {
    id: "personal",
    name: "Personal Care",
    type: "EXPENSE",
    color: "#d946ef", // fuchsia-500
    icon: "Smile",
  },
  {
    id: "travel",
    name: "Travel",
    type: "EXPENSE",
    color: "#0284c7", // sky-600
    icon: "Plane",
  },
  {
    id: "insurance",
    name: "Insurance",
    type: "EXPENSE",
    color: "#475569", // slate-600
    icon: "Shield",
  },
  {
    id: "gifts",
    name: "Gifts & Donations",
    type: "EXPENSE",
    color: "#fb7185", // rose-400
    icon: "Gift",
  },
  {
    id: "bills",
    name: "Bills & Fees",
    type: "EXPENSE",
    color: "#f43f5e", // rose-500
    icon: "Receipt",
  },
  {
    id: "other-expense",
    name: "Other Expenses",
    type: "EXPENSE",
    color: "#6b7280", // gray-500
    icon: "MoreHorizontal",
  },
];
export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});