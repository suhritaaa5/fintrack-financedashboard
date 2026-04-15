import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, PlusCircle, ShieldUser, Sun, User, Moon, X, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

const CATEGORIES = {
  INCOME: ["salary", "freelance", "investments", "other-income"],
  EXPENSE: [
    "housing", "transportation", "groceries", "utilities",
    "entertainment", "food", "shopping", "healthcare", "education", "travel",
  ],
};

const RECURRING_INTERVALS = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

const AddTransactionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    type: "EXPENSE",
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    recurring: false,
    recurringInterval: "MONTHLY",
  });
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid positive amount";
    if (!form.category) e.category = "Please select a category";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const txn = {
      id: crypto.randomUUID(),
      type: form.type,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      date: new Date(form.date).toISOString(),
      status: "COMPLETED",
      recurring: form.recurring,
      recurringInterval: form.recurring ? form.recurringInterval : null,
      nextRecurringDate: form.recurring
        ? (() => {
            const d = new Date(form.date);
            if (form.recurringInterval === "DAILY") d.setDate(d.getDate() + 1);
            else if (form.recurringInterval === "WEEKLY") d.setDate(d.getDate() + 7);
            else if (form.recurringInterval === "MONTHLY") d.setMonth(d.getMonth() + 1);
            else d.setFullYear(d.getFullYear() + 1);
            return d.toISOString();
          })()
        : null,
    };

    onAdd(txn);
    onClose();
  };

  const categories = CATEGORIES[form.type] || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-orange-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-orange-400 to-yellow-300 dark:from-slate-800 dark:to-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Add Transaction
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/10 transition">
            <X className="w-5 h-5 text-slate-800 dark:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-xl overflow-hidden border border-orange-200 dark:border-slate-600">
            {["EXPENSE", "INCOME"].map((t) => (
              <button
                key={t}
                onClick={() => { set("type", t); set("category", ""); }}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                  form.type === t
                    ? t === "EXPENSE"
                      ? "bg-gradient-to-r from-orange-600 to-yellow-300 text-white"
                      : "bg-gradient-to-r from-green-600 to-green-300 text-white"
                    : "bg-orange-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-orange-100 dark:hover:bg-slate-700"
                }`}
              >
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="e.g. Monthly rent"
              className="w-full px-3 py-2 rounded-lg text-sm bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 rounded-lg text-sm bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 capitalize"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Recurring — toggle and label side-by-side, no overlap */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Recurring Transaction
              </span>
              {/* Custom toggle switch */}
              <button
                type="button"
                onClick={() => set("recurring", !form.recurring)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                  form.recurring ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
                role="switch"
                aria-checked={form.recurring}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                    form.recurring ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {form.recurring && (
              <select
                value={form.recurringInterval}
                onChange={(e) => set("recurringInterval", e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {RECURRING_INTERVALS.map((i) => (
                  <option key={i} value={i}>
                    {i.charAt(0) + i.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-orange-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:opacity-90 transition"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

const Topbar = ({ sideBarCollapsed, onToggleSidebar }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const { role, setRole, isAdmin, setTransactions } = useApp();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showModal, setShowModal] = useState(false);

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

  const handleAddTransaction = (txn) => {
    setTransactions((prev) => [txn, ...prev]);
  };

  return (
    <>
      <div className="h-20 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              {getTitle()}
            </h2>
            {isDashboard && (
              <p className="text-sm text-slate-700 dark:text-slate-400">
                Welcome back! Stay on Track with your Financial Health
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3">
          {/* Viewer */}
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

          {/* Admin */}
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

          {/* New Transaction (admin only) */}
          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="group flex items-center gap-0.5 px-3 h-10 bg-gradient-to-r from-orange-600 to-yellow-300 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition" />
              <span className="text-xs text-black max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100 transition-all">
                New
              </span>
            </button>
          )}

          {/* Dark mode */}
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

      {/* Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </>
  );
};

export default Topbar;
