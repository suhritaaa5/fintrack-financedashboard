import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* CARD 1 */}
      <div className="h-64 p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-orange-200/30 dark:border-slate-700/40">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* BOX 1 */}
          <div className="bg-white/90 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-sm font-medium text-slate-700 dark:text-white">
            Box 1
          </div>

          {/* BOX 2 */}
          <div className="bg-white/90 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-sm font-medium text-slate-700 dark:text-white">
            Box 2
          </div>

          {/* BOX 3 */}
          <div className="bg-white/90 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-sm font-medium text-slate-700 dark:text-white">
            Box 3
          </div>

          {/* BOX 4 */}
          <div className="bg-white/90 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-sm font-medium text-slate-700 dark:text-white">
            Box 4
          </div>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="h-64 p-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-orange-200/30 dark:border-slate-700/40 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">balance chart</p>
      </div>

      {/* CARD 3 (TALL PIE CHART) */}
      <div className="row-span-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-200/30 dark:border-slate-700/40 p-5 flex flex-col">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-4">
          Spending Breakdown
        </h3>
        <div className="flex-1 flex items-center justify-center">Pie Chart</div>
      </div>

      {/* ✅ CARD 4 (BIG WIDE UNDER 1 & 2) */}
      <div className="col-span-2 row-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-200/30 dark:border-slate-700/40 p-5 flex flex-col">
        monthly budget
      </div>

      {/* ✅ CARD 4-2 (BIG WIDE UNDER 1 & 2) */}
      <div className="col-span-2 row-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-200/30 dark:border-slate-700/40 p-5 flex flex-col">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-4">
          Recent Transactions
        </h3>
        <div className="flex-1 flex items-center justify-center">
          Transactions Table
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
