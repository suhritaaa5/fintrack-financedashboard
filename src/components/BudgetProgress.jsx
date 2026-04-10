import { useState } from "react";
import { Pencil, Check, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { updateBudget } from "../data/budget";
export function BudgetProgress({ budget, currentExpenses, percentageUsed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget ? budget.toString() : "");

  const [isLoading, setIsLoading] = useState(false);
  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    const res = updateBudget(amount);

    if (res.success) {
      toast.success("Budget updated successfully");
      setIsEditing(false);

      window.location.reload();
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setNewBudget(budget ? budget.toString() : "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm sm:text-xl font-bold text-slate-800 dark:text-white">
  Monthly Budget
</p>
      </div>

      {/* Budget + Edit */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-24 sm:w-28 lg:w-32 

                       bg-orange-200 dark:bg-slate-600 dark:text-slate-200
                       border-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-slate-400"
              placeholder="Enter amount"
              autoFocus
              disabled={isLoading}
            />

            <Button variant="ghost" size="icon" onClick={handleUpdateBudget}>
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <p className="text-lg sm:text-sm text-slate-800 dark:text-slate-200">
              {budget
                ? `₹${formatINR(currentExpenses)} of ₹${formatINR(budget)} spent`
                : "No budget set"}
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

      {/* Progress Section */}
      {budget != null && (
        <div className="space-y-2">
          <div className="w-full h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-in-out ${percentageUsed >= 90
                ? "bg-gradient-to-r from-red-500 to-red-600"
                : percentageUsed >= 75
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-green-400 to-emerald-500"
                }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>{percentageUsed.toFixed(1)}% used</span>

            {percentageUsed > 100 && (
              <span className="text-red-500 font-medium">
                Overspending <AlertTriangle className="inline h-3 w-3 ml-1" />
              </span>
            )}
          </div>

          <p className="  font-semibold  text-slate-700 dark:text-slate-100  sm:text-sm">
            {percentageUsed > 90 && "Almost exceeded your budget Mate..!"}
            {percentageUsed > 70 && percentageUsed <= 90 && "Careful spending required Mate..!"}
            {percentageUsed <= 70 && "You're on track Mate..!"}
          </p>
        </div>
      )}
    </div>
  );
}
