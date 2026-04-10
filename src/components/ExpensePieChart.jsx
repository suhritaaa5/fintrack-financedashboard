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
  "#f97316",
  "#fb923c",
  "#fdba74",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
];

const ExpensePieChart = () => {
  const { transactions } = useApp();
  const currentDate = new Date();
  const [isDark, setIsDark] = React.useState(false);

React.useEffect(() => {
  const checkDark = () => {
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  checkDark();

  const observer = new MutationObserver(checkDark);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}, []);
  const pieData = React.useMemo(() => {
    const expensesByCategory = (transactions || [])
      .filter((t) => {
        const d = new Date(t.date);
        if (isNaN(d)) return false;

        return (
          t.type === "EXPENSE" &&
          d.getMonth() === currentDate.getMonth() &&
          d.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const total = React.useMemo(
    () => pieData.reduce((sum, item) => sum + item.value, 0),
    [pieData]
  );

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardHeader className="flex flex-row items-center justify-center pb-4">
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
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-800 dark:fill-white text-sm font-semibold"
                >
                  ₹{new Intl.NumberFormat("en-IN").format(total)}
                </text>

                <Tooltip
  formatter={(value, name) => [
    `₹${new Intl.NumberFormat("en-IN").format(value)}`,
    name,
  ]}
  contentStyle={{
    backgroundColor: "#fff7ed", // always orange-50
    border: "1px solid rgba(255,165,0,0.3)",
    borderRadius: "10px",
    color: "#0f172a", // slate-900
    backdropFilter: "blur(6px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  }}
  itemStyle={{
    color: "#0f172a",
  }}
  labelStyle={{
    color: "#0f172a",
  }}
  wrapperStyle={{ zIndex: 1000 }}
/>

                <Legend
                  formatter={(value) => (
                    <span className="text-slate-800 dark:text-slate-400 text-xs font-medium">
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