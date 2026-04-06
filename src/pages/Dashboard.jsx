import React from "react";
import { useApp } from "../context/AppContext";
import { getCurrentBudget } from "../data/budget";
import { BudgetProgress } from "../components/BudgetProgress";
import RecentTransactions from "../components/RecentTransactions";
import ExpensePieChart from "../components/ExpensePieChart";
const Dashboard = () => {
  const { transactions } = useApp();
  const { budget, currentExpenses, percentageUsed } =
    getCurrentBudget(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* CARD 1 (Boxes) */}

      <div
        className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] p-4 
                bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl 
                border border-orange-200/30 dark:border-slate-700/40"
      >
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* BOX 1 */}

          <div
            className="bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-500 dark:to-yellow-200
                    rounded-xl flex flex-col items-center justify-center text-sm font-medium 
                    text-slate-700 dark:text-white p-4 shadow-md
                    transition-transform duration-200 transform hover:scale-105 hover:brightness-110"
          >
            <p className="text-xs">Revenue</p>
            <p className="text-lg font-semibold">₹12,345</p>
          </div>

          {/* BOX 2 */}

          <div
            className="bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-500 dark:to-yellow-200
                    rounded-xl flex flex-col items-center justify-center text-sm font-medium 
                    text-slate-700 dark:text-white p-4 shadow-md
                    transition-transform duration-200 transform hover:scale-105 hover:brightness-110"
          >
            <p className="text-xs">Expenses</p>
            <p className="text-lg font-semibold">₹7,890</p>
          </div>

          {/* BOX 3 */}
          <div
            className="bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-500 dark:to-yellow-200
                    rounded-xl flex flex-col items-center justify-center text-sm font-medium 
                    text-slate-700 dark:text-white p-4 shadow-md
                    transition-transform duration-200 transform hover:scale-105 hover:brightness-110"
          >
            <p className="text-xs">Profit</p>
            <p className="text-lg font-semibold">₹4,455</p>
          </div>

          {/* BOX 4 */}
          <div
            className="bg-gradient-to-r from-orange-300 to-yellow-200 dark:from-orange-500 dark:to-yellow-200
                    rounded-xl flex flex-col items-center justify-center text-sm font-medium 
                    text-slate-700 dark:text-white p-4 shadow-md
                    transition-transform duration-200 transform hover:scale-105 hover:brightness-110"
          >
            <p className="text-xs">Savings</p>
            <p className="text-lg font-semibold">₹2,500</p>
          </div>
        </div>
      </div>


      {/* CARD 2 (Balance Chart) */}
      <div className="min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] p-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-orange-200/30 dark:border-slate-700/40 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Balance Chart</p>
      </div>


      {/* CARD 3 (Spending Breakdown) */}
<div className="bg-gradient-to-br from-orange-300 to-yellow-100 dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
                backdrop-blur-xl rounded-2xl border border-orange-200/40 dark:border-slate-700/50 p-5 flex flex-col
                lg:h-[300px]">
  <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-4">
    Spending Breakdown
  </h3>
  <div className="flex-1 overflow-hidden">
    <div className="h-full bg-orange-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/40 dark:border-slate-700/40 p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      <ExpensePieChart />
    </div>
  </div>
</div>



      {/* CARD 4 (Monthly Budget) */}
      <div
        className=" col-span-1 sm:col-span-2 lg:col-span-2  bg-gradient-to-br from-orange-300  to-yellow-100  dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60
    backdrop-blur-xl  rounded-2xl  border border-orange-200/40 dark:border-slate-700/50  p-5 "
      >
        {/* Inner Card */}
        <div
          className=" bg-orange-100 dark:bg-slate-900/80  rounded-xl border border-slate-200/40 dark:border-slate-700/40
      p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-xl
    "
        >
          <BudgetProgress
            budget={budget}
            currentExpenses={currentExpenses}
            percentageUsed={percentageUsed}
          />
        </div>
      </div>
      
      {/* NEW CARD beside Recent Transactions */}


      {/* CARD 5 (Transactions) */}
      <div
        className="col-span-1 sm:col-span-2 lg:col-span-2  bg-gradient-to-br from-orange-300  to-yellow-100  
             dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 backdrop-blur-xl rounded-2xl 
              border border-orange-200/40 dark:border-slate-700/50  
              p-5 flex flex-col"
      >
        {/* Container */}
        <div className="flex-1 overflow-hidden">

          {/* INNER DABBA (same as Card 4) */}
          <div
            className="h-full  bg-orange-100 dark:bg-slate-900/80  rounded-xl border border-slate-200/40 dark:border-slate-700/40
                p-4 sm:p-5 shadow-md  transition-all duration-300 hover:shadow-xl overflow-y-auto"
          >
            <RecentTransactions />
          </div>

        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-300 to-yellow-100 dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-900/60 
                backdrop-blur-xl rounded-2xl border border-orange-200/40 dark:border-slate-700/50 p-5 flex flex-col
                lg:h-[300px]">
  <div className="flex-1 overflow-hidden">
    <div className="h-full bg-orange-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/40 dark:border-slate-700/40 p-4 sm:p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      <p className="text-slate-700 dark:text-white">New Card Content</p>
    </div>
  </div>
</div>

      
    </div>
    
    

  );
};

export default Dashboard;
