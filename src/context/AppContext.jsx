import { createContext, useContext, useState, useEffect } from "react";
import { generateTransactions } from "../data/generateTransactions";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer");
  const toggleRole = () => setRole((prev) => (prev === "viewer" ? "admin" : "viewer"));
  const isAdmin = role === "admin";

  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    }
    const generated = generateTransactions();
    localStorage.setItem("transactions", JSON.stringify(generated.transactions));
    return generated.transactions;
  });

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  // Budget in context — no page reload needed when updated
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : null;
  });

  const updateBudget = (amount) => {
    localStorage.setItem("budget", JSON.stringify(amount));
    setBudget(amount);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        isAdmin,
        transactions,
        setTransactions,
        budget,
        updateBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export const useApp = () => useContext(AppContext);
