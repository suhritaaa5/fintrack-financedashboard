import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [role, setRole] = useState("viewer");

  const toggleRole = () => {
    setRole((prev) => (prev === "viewer" ? "admin" : "viewer"));
  };

  const isAdmin = role === "admin";

  return (
    <AppContext.Provider value={{ role, setRole, toggleRole, isAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export const useApp = () => useContext(AppContext);