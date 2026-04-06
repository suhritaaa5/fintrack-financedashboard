"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useApp } from "../context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const COLORS = [
  "#f97316", // orange-500
  "#fb923c", // orange-400
  "#fdba74", // orange-300
  "#fde68a", // yellow-300
  "#fcd34d", // yellow-400
  "#fbbf24", // amber-400
];

const ExpensePieChart = () => {
  const { transactions } = useApp();

  const currentDate = new Date();

  // ✅ Filter current month expenses
  const currentMonthExpenses = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });

  // ✅ Group by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const pieData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-transparent shadow-none border-none">
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
          Spending Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[280px]">
          {pieData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              No expenses this month
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* 🔥 Smooth gradient feel */}
                <defs>
                  <linearGradient id="pieGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                </defs>

                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive
                  animationDuration={900}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                {/* ✅ CENTER TEXT (premium touch) */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-800 dark:fill-white text-sm font-semibold"
                >
                  ₹{new Intl.NumberFormat("en-IN").format(total)}
                </text>

                {/* ✅ Tooltip (MATCHED STYLE) */}
                <Tooltip
                  formatter={(value) =>
                    `₹${new Intl.NumberFormat("en-IN").format(value)}`
                  }
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,165,0,0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{
                    color: "#334155",
                    fontWeight: 500,
                  }}
                  itemStyle={{
                    color: "#334155",
                  }}
                />

                {/* ✅ Legend (clean like chart) */}
                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => (
                    <span className="text-slate-700 dark:text-slate-400 text-xs">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;