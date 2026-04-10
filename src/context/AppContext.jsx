import { createContext, useContext, useState, useEffect } from "react";
import { generateTransactions } from "../data/generateTransactions";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // ✅ Role logic (your existing)
  const [role, setRole] = useState("viewer");

  const toggleRole = () => {
    setRole((prev) => (prev === "viewer" ? "admin" : "viewer"));
  };

  const isAdmin = role === "admin";

  // ✅ NEW: Transactions logic (move from Layout here)
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
  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toggleRole,
        isAdmin,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export const useApp = () => useContext(AppContext);
