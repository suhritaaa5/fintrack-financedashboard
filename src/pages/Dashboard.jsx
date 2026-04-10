import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  PiggyBank,
  Crown,
  AlertTriangle,
  CalendarDays,
  Activity
} from "lucide-react";
import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { getCurrentBudget } from "../data/budget";
import { BudgetProgress } from "../components/BudgetProgress";
import RecentTransactions from "../components/RecentTransactions";
import ExpensePieChart from "../components/ExpensePieChart";
import { getDashboardStats } from "../data/dashboardStats";
import BalanceChart from "../components/BalanceChart";

const Dashboard = () => {
  const { transactions } = useApp();

  const { budget, currentExpenses, percentageUsed } =
    getCurrentBudget(transactions);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);

  const stats = useMemo(() => {
    return getDashboardStats(transactions);
  }, [transactions]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* CARD 1 */}
        <div className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] p-4 
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50">

          <div className="grid grid-cols-2 gap-4 h-full">

            {/* Income */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
              dark:from-orange-500 dark:to-yellow-200 
              rounded-xl flex flex-col items-center justify-center 
              p-4 shadow-md hover:scale-105 transition">

              <TrendingUp className="h-5 w-5 text-green-600 mb-1" />
              <p className="text-xs font-bold text-slate-800">Total Income</p>
              <p className="text-lg font-bold text-slate-800">
                ₹{formatINR(stats.income)}
              </p>
            </div>

            {/* Expense */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
              dark:from-orange-500 dark:to-yellow-200 
              rounded-xl flex flex-col items-center justify-center 
              p-4 shadow-md hover:scale-105 transition">

              <TrendingDown className="h-5 w-5 text-red-600 mb-1" />
              <p className="text-xs font-bold text-slate-900">Total Expenses</p>
              <p className="text-lg font-bold text-slate-900">
                ₹{formatINR(stats.expense)}
              </p>
            </div>

            {/* Net Balance */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
              dark:from-orange-500 dark:to-yellow-200 
              rounded-xl flex flex-col items-center justify-center 
              p-4 shadow-md hover:scale-105 transition">

              <Wallet className="h-5 w-5 text-blue-900 mb-1" />
              <p className="text-xs font-bold text-slate-900">Net Balance</p>
              <p className={`text-lg font-bold ${stats.net >= 0 ? "text-green-800" : "text-red-600"
                }`}>
                ₹{formatINR(stats.net)}
              </p>
            </div>

            {/* Savings Rate */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
              dark:from-orange-500 dark:to-yellow-200 
              rounded-xl flex flex-col items-center justify-center 
              p-4 shadow-md hover:scale-105 transition">

              <PiggyBank className="h-5 w-5 text-green-700 mb-1" />
              <p className="text-xs font-bold text-slate-900">Savings Rate</p>
              <p className="text-lg font-bold text-green-800">
                {stats.savingsRate.toFixed(1)}%
              </p>
            </div>

          </div>
        </div>

        {/* CARD 2 - BALANCE CHART */}
        <div className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] p-5 
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 
          backdrop-blur-xl rounded-2xl 
          border border-orange-200/40 dark:border-slate-700/50 
          flex flex-col">

          <div className="flex-1 w-full h-full">
            <BalanceChart transactions={transactions} />
          </div>
        </div>

        {/* CARD 3 - BUDGET */}
        <div className="sm:col-span-2 p-5 
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50">

          <div className="bg-orange-100 dark:bg-slate-900/80 rounded-xl 
            border border-slate-200/40 dark:border-slate-700/40 
            p-4 sm:p-5 shadow-md">

            <BudgetProgress
              budget={budget}
              currentExpenses={currentExpenses}
              percentageUsed={percentageUsed}
            />
          </div>
        </div>

        {/* CARD 4 - TRANSACTIONS */}
        <div className="sm:col-span-2 p-5 flex flex-col
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50">

          <div className="flex-1">
            <div className="h-full bg-orange-100 dark:bg-slate-900/80 
              rounded-xl border border-slate-200/40 dark:border-slate-700/40 
              p-4 sm:p-5 shadow-md overflow-y-auto">

              <RecentTransactions />
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-6">

        {/* PIE CHART */}
        <div className="p-5 flex flex-col flex-[1.5] min-h-[340px]
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50">

          <div className="flex-1">
            <div className="w-full h-full bg-orange-100 dark:bg-slate-900/80 
              rounded-xl border border-slate-200/40 dark:border-slate-700/40 
              p-4 shadow-md flex items-center justify-center">

              <div className="w-full h-full">
                <ExpensePieChart />
              </div>
            </div>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="p-5 flex flex-col flex-1
          bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50">



          <div
            className=" bg-gradient-to-br from-orange-200 to-yellow-100 
            dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
            backdrop-blur-xl rounded-2xl 
            border border-orange-200/40 dark:border-slate-700/50 
            p-5 flex flex-col justify-center h-full gap-3
             "
          >
            <p className="text-sm sm:text-lg font-bold text-slate-800 dark:text-white pb-2">
              Financial Insights
            </p>

            {/* Top Category */}
            <div className="flex items-center justify-between bg-orange-100 dark:bg-slate-900/80 p-3 rounded-xl shadow-md hover:scale-[1.02] transition">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-600" />
                <span className="text-slate-800 dark:text-white font-semibold text-sm">
                  Highest Spending Category
                </span>
              </div>
              <span className="text-purple-600 font-bold">
                {stats.topCategory || "—"}
              </span>
            </div>

            {/* Biggest Expense */}
            <div className="flex items-center justify-between bg-orange-100 dark:bg-slate-900/80 p-3 rounded-xl shadow-md hover:scale-[1.02] transition">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-slate-800 dark:text-white font-semibold text-sm">
                  Biggest Expense
                </span>
              </div>
              <span className="text-red-500 font-bold">
                ₹{formatINR(stats.maxExpense)}
              </span>
            </div>

            {/* Avg Daily Spend */}
            <div className="flex items-center justify-between bg-orange-100 dark:bg-slate-900/80 p-3 rounded-xl shadow-md hover:scale-[1.02] transition">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-orange-600" />
                <span className="text-slate-800 dark:text-white font-semibold text-sm">
                  Avg Daily Spend
                </span>
              </div>
              <span className="text-orange-600 font-bold">
                ₹{formatINR(stats.avgDailySpend)}
              </span>
            </div>

            {/* Expense Ratio */}
            <div className="flex items-center justify-between bg-orange-100 dark:bg-slate-900/80 p-3 rounded-xl shadow-md hover:scale-[1.02] transition">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-slate-800 dark:text-white font-semibold text-sm">
                  Expense Income Ratio
                </span>
              </div>

              <span
                className={`font-bold ${stats.expenseRatio > 80
                  ? "text-red-500"
                  : stats.expenseRatio > 50
                    ? "text-yellow-500"
                    : "text-green-500"
                  }`}
              >
                {stats.expenseRatio.toFixed(1)}%
              </span>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;