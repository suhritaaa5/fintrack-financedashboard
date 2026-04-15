import { useState } from "react";
import { Pencil, Check, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useApp } from "../context/AppContext";

export function BudgetProgress({ currentExpenses, percentageUsed }) {
  const { budget, updateBudget } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget ? budget.toString() : "");
  const [isLoading, setIsLoading] = useState(false);

  // Raw (uncapped) percentage for caption logic
  const rawPercentage = budget && budget > 0
    ? (currentExpenses / budget) * 100
    : percentageUsed;

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

  const handleUpdateBudget = () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setIsLoading(true);
    // Updates context + localStorage — no reload needed
    updateBudget(amount);
    toast.success("Budget updated!");
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setNewBudget(budget ? budget.toString() : "");
    setIsEditing(false);
  };

  // Strictly ordered — no double-render at boundaries
  const getBudgetCaption = () => {
    if (rawPercentage > 100) return "You've exceeded your budget! ⚠️";
    if (rawPercentage >= 100) return "Budget fully used — time to stop spending!";
    if (rawPercentage >= 90) return "Almost at your budget limit, watch out!";
    if (rawPercentage >= 70) return "Careful spending required Mate..!";
    return "You're on track Mate..!";
  };

  const getBarColor = () => {
    if (rawPercentage >= 100) return "bg-gradient-to-r from-red-600 to-red-700";
    if (rawPercentage >= 90)  return "bg-gradient-to-r from-red-500 to-red-600";
    if (rawPercentage >= 75)  return "bg-gradient-to-r from-yellow-400 to-orange-400";
    return "bg-gradient-to-r from-green-400 to-emerald-500";
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Header */}
      <p className="text-sm sm:text-xl font-bold text-slate-800 dark:text-white">
        Monthly Budget
      </p>

      {/* Budget display + edit */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-24 sm:w-28 lg:w-32 bg-orange-200 dark:bg-slate-600 dark:text-slate-200 border-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-slate-400"
              placeholder="Enter amount"
              autoFocus
              disabled={isLoading}
            />
            <Button variant="ghost" size="icon" onClick={handleUpdateBudget} disabled={isLoading}>
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200">
              {budget
                ? `₹${formatINR(currentExpenses)} of ₹${formatINR(budget)} spent`
                : "No budget set — click pencil to add one"}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 sm:h-8 sm:w-8"
            >
              <Pencil className="text-slate-700 dark:text-slate-200 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Progress bar */}
      {budget != null && (
        <div className="space-y-2">
          <div className="w-full h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-in-out ${getBarColor()}`}
              style={{ width: `${Math.min(rawPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>{Math.min(rawPercentage, 100).toFixed(1)}% used</span>
            {rawPercentage > 100 && (
              <span className="text-red-500 font-medium">
                Overspending <AlertTriangle className="inline h-3 w-3 ml-1" />
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
            {getBudgetCaption()}
          </p>
        </div>
      )}
    </div>
  );
}
