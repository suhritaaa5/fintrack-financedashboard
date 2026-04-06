"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export default function TransactionChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now),
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const rawDate = new Date(transaction.date);
      const key = format(rawDate, "yyyy-MM-dd"); // ✅ real sortable key
      const label = format(rawDate, "MMM dd");

      if (!acc[key])
        acc[key] = { date: label, sortKey: key, income: 0, expense: 0 };

      if (transaction.type === "INCOME") acc[key].income += transaction.amount;
      else acc[key].expense += transaction.amount;

      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.sortKey) - new Date(b.sortKey),
    );
  }, [transactions, dateRange]);

  const totals = useMemo(
    () =>
      
      filteredData.reduce(
        
        (acc, day) => ({
          income: acc.income + day.income,
          expense: acc.expense + day.expense,
        }),
        { income: 0, expense: 0 },
      ),
    [filteredData],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
          Transaction Overview
        </CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px] bg-orange-50 dark:bg-slate-700 border dark:border-slate-600 shadow-md rounded-md text-slate-900 dark:text-slate-200">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>

          <SelectContent className="bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-600 shadow-lg rounded-md">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem
                key={key}
                value={key}
                className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-6 text-sm">
          <div className="text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-400">
              Total Income
            </p>
            <p className="text-lg font-bold text-green-600">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-400">
              Total Expenses
            </p>
            <p className="text-lg font-bold text-red-600">
              ${totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-400">
              Net
            </p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="h-[300px]">
          {filteredData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
              No transactions in this range
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="incomeLineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#166534" /> {/* Dark green */}
                    <stop offset="100%" stopColor="#22c55e" />{" "}
                    {/* Light green */}
                  </linearGradient>
                  <linearGradient
                    id="expenseLineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#991b1b" /> {/* Dark red */}
                    <stop offset="100%" stopColor="#ef4444" /> {/* Light red */}
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value, name) => [`$${value}`, name]}
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,165,0,0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{
                    color: "#334155", // slate-700
                    fontWeight: 500,
                  }}
                  itemStyle={{
                    color: "#334155",
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-slate-900 dark:text-slate-400">
                      {value}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="url(#incomeLineGradient)" // <- gradient applied here
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationEasing="ease-in-out"
                  animationDuration={1000}
                />

                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="url(#expenseLineGradient)" // <- gradient applied here
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationEasing="ease-in-out"
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
