"use client";

import React from "react";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useApp } from "../context/AppContext";

const RecentTransactions = () => {
  const { transactions } = useApp();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl sm:text-base font-bold text-slate-800 dark:text-white">Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        {recentTransactions.length === 0 ? (
          <p className="text-slate-800 dark:text-slate-300">
            No transactions
          </p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((t) => (
              <div key={t.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {t.description || "Untitled"}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-500">
                    {format(new Date(t.date), "PP")}
                  </p>
                </div>

                <div
                  className={`flex items-center ${
                    t.type === "EXPENSE"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {t.type === "EXPENSE" ? (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  )}
                  ${t.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;