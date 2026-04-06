import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  PiggyBank,
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


  const stats = useMemo(() => {
    return getDashboardStats(transactions);
  }, [transactions]);
  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* CARD 1 (4 boxes) */}
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

              <p className="text-xs font-bold text-slate-800 ">
                Total Income
              </p>

              <p className="text-lg font-bold text-slate-800 ">
                ₹{stats.income.toFixed(0)}
              </p>
            </div>

            {/* Expense */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
    dark:from-orange-500 dark:to-yellow-200 
    rounded-xl flex flex-col items-center justify-center 
    p-4 shadow-md hover:scale-105 transition">

              <TrendingDown className="h-5 w-5 text-red-600 mb-1" />

              <p className="text-xs font-bold text-slate-900 ">
                Total Expenses
              </p>

              <p className="text-lg font-bold text-slate-900 ">
                ₹{stats.expense.toFixed(0)}
              </p>
            </div>

            {/* Net Balance */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
    dark:from-orange-500 dark:to-yellow-200 
    rounded-xl flex flex-col items-center justify-center 
    p-4 shadow-md hover:scale-105 transition">

              <Wallet className="h-5 w-5 text-blue-900 mb-1" />

              <p className="text-xs font-bold text-slate-900 ">
                Net Balance
              </p>

              <p className={`text-lg font-bold ${stats.net >= 0 ? "text-green-800" : "text-red-600"
                }`}>
                ₹{stats.net.toFixed(0)}
              </p>
            </div>

            {/* Savings Rate */}
            <div className="bg-gradient-to-r from-orange-300 to-yellow-200 
    dark:from-orange-500 dark:to-yellow-200 
    rounded-xl flex flex-col items-center justify-center 
    p-4 shadow-md hover:scale-105 transition">

              <PiggyBank className="h-5 w-5 text-green-700 mb-1" />

              <p className="sm:text-xs font-bold text-slate-900 ">
                Savings Rate
              </p>

              <p className="text-lg font-bold text-green-800 ">
                {stats.savingsRate.toFixed(1)}%
              </p>
            </div>

          </div>
        </div>

        {/* CARD 2 (Balance Chart) */}
        <div className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] p-5 
  bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 backdrop-blur-xl rounded-2xl 
  border border-orange-200/40 
          dark:border-slate-700/50
  flex flex-col">

          {/* Chart container */}
          <div className="flex-1 w-full h-full">
            <BalanceChart transactions={transactions} />
          </div>

        </div>

        {/* CARD 4 (Monthly Budget - wide) */}
        <div className="sm:col-span-2 bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50 p-5">

          <div className="bg-orange-00 dark:bg-slate-900/80 rounded-xl 
            border border-slate-200/40 dark:border-slate-700/40 
            p-4 sm:p-5 shadow-md">

            <BudgetProgress
              budget={budget}
              currentExpenses={currentExpenses}
              percentageUsed={percentageUsed}
            />

          </div>
        </div>

        {/* CARD 5 (Transactions - wide) */}
        <div className="sm:col-span-2 bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50 p-5 flex flex-col">

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

        {/* SPENDING */}
        <div className="bg-gradient-to-br from-orange-300 to-yellow-100 
dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
backdrop-blur-xl rounded-2xl border border-orange-200/40 
dark:border-slate-700/50 p-5 flex flex-col flex-[1.5] min-h-[340px]">

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

        {/* NEW SMALL CARD */}
        <div className="bg-gradient-to-br from-orange-300 to-yellow-100 
          dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
          backdrop-blur-xl rounded-2xl border border-orange-200/40 
          dark:border-slate-700/50 p-5 flex flex-col flex-1">

          <div className="bg-orange-50 dark:bg-slate-900/80 
            rounded-xl border border-slate-200/40 dark:border-slate-700/40 
            p-4 shadow-md h-full flex items-center justify-center">

            <p className="text-slate-700 dark:text-white">
              New Card Content
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;