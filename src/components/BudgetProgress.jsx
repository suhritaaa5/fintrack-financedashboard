"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({
  budget,
  currentExpenses,
  percentageUsed,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    budget ? budget.toString() : ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  // ✅ Handle Update
  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  // ✅ Cancel Edit
  const handleCancel = () => {
    setNewBudget(budget ? budget.toString() : "");
    setIsEditing(false);
  };

  // ✅ Success Handling
  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  // ✅ Error Handling
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">
            Monthly Budget
          </CardTitle>

          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-28"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {budget
                    ? `₹${currentExpenses.toFixed(
                        2
                      )} of ₹${budget.toFixed(2)} spent`
                    : "No budget set"}
                </CardDescription>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {budget && (
          <div className="space-y-2">
            {/* ✅ Progress Bar */}
            <Progress
              value={Math.min(percentageUsed, 100)}
              extraStyles={`${
                percentageUsed >= 90
                  ? "bg-red-500"
                  : percentageUsed >= 75
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />

            {/* ✅ Footer Info */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentageUsed.toFixed(1)}% used</span>

              {percentageUsed > 100 && (
                <span className="text-red-500 font-medium">
                  Overspending 🚨
                </span>
              )}
            </div>

            {/* ✅ Smart Insight */}
            <p className="text-xs">
              {percentageUsed > 90 && "⚠️ Almost exceeded your budget!"}
              {percentageUsed > 70 &&
                percentageUsed <= 90 &&
                "⚡ Careful spending"}
              {percentageUsed <= 70 && "✅ You're on track"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}