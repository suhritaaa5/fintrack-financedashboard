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
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      const generatedData = generateTransactions();
      setTransactions(generatedData.transactions);
      localStorage.setItem(
        "transactions",
        JSON.stringify(generatedData.transactions),
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
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
