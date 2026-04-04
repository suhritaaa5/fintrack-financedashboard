import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, PlusCircle, ShieldUser, Sun, User, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";

const Topbar = ({ sideBarCollapsed, onToggleSidebar }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const { role, setRole, isAdmin } = useApp();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const getTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/transactions") return "Transactions";
    if (location.pathname === "/insights") return "Insights";
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="h-20 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80  backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
      {/*LeftSec*/}
      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:block">
          <h2 className="text-xl font-black text-slate-800 dark:text-white">
            {" "}
            {getTitle()}{" "}
          </h2>
          {isDashboard && (
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Welcome back! Stay on Track with your Financial Health
            </p>
          )}
        </div>
      </div>
      {/*RightSec*/}
      <div className="flex items-center space-x-3">
        {/*user*/}
        <button
          onClick={() => setRole("viewer")}
          className={`group flex items-center gap-0.5 px-3 h-10 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
            role === "viewer"
              ? "bg-blue-600 text-white"
              : "bg-gradient-to-r from-orange-600 to-yellow-300"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs max-w-0 opacity-0 overflow-hidden group-hover:max-w-[60px] group-hover:opacity-100 transition-all duration-300">
            User
          </span>
        </button>

        {/*admin*/}
        <button
          onClick={() => setRole("admin")}
          className={`group flex items-center gap-0.5 px-3 h-10 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
            role === "admin"
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-orange-600 to-yellow-300 text-black"
          }`}
        >
          <ShieldUser className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />

          <span className="text-xs max-w-0 opacity-0 overflow-hidden group-hover:max-w-[60px] group-hover:opacity-100 transition-all duration-300">
            Admin
          </span>
        </button>
        {/*new transaction */}
        {isAdmin && (
          <div className="flex items-center gap-3">
            {/* New */}
            <button className="group flex items-center gap-0.5 px-3 h-10 bg-gradient-to-r from-orange-600 to-yellow-300 rounded-xl shadow-lg hover:scale-105">
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition" />
              <span className="text-xs text-black max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100 transition-all">
                New
              </span>
            </button>
          </div>
        )}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-800 dark:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
