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

// Indian number format helper
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

// Custom legend that shows name + amount properly aligned
const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null;
  return (
    <ul className="flex flex-col gap-1 mt-2 px-2">
      {payload.map((entry, i) => (
        <li key={i} className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-700 dark:text-slate-300 truncate capitalize">
              {entry.value}
            </span>
          </div>
          <span className="text-slate-800 dark:text-slate-200 font-semibold whitespace-nowrap">
            {formatINR(entry.payload.value)}
          </span>
        </li>
      ))}
    </ul>
  );
};

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
      value: Math.round(value),
    }));
  }, [transactions]);

  const total = React.useMemo(
    () => pieData.reduce((sum, item) => sum + item.value, 0),
    [pieData]
  );

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardHeader className="flex flex-row items-center justify-center pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
          Spending Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2">
        <div className="h-[200px]">
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
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                {/* Centre label */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isDark ? "#f8fafc" : "#0f172a"}
                  fontSize={13}
                  fontWeight="600"
                >
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(total)}
                </text>

                <Tooltip
                  formatter={(value, name) => [
                    formatINR(value),
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff7ed",
                    border: "1px solid rgba(255,165,0,0.3)",
                    borderRadius: "10px",
                    color: "#0f172a",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{ color: "#0f172a" }}
                  labelStyle={{ color: "#0f172a" }}
                  wrapperStyle={{ zIndex: 1000 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Custom legend below chart with proper amount alignment */}
        {pieData.length > 0 && (
          <CustomLegend
            payload={pieData.map((item, i) => ({
              value: item.name,
              color: COLORS[i % COLORS.length],
              payload: item,
            }))}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
