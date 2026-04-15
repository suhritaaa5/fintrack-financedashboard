
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

export default function BalanceChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const range = DATE_RANGES[dateRange];
    const now = new Date();

    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter((t) => {
      const txnDate = new Date(t.date);
      if (isNaN(txnDate)) return false;

      return txnDate >= startDate && txnDate <= endOfDay(now);
    });

    const grouped = filtered.reduce((acc, t) => {
      const key = format(new Date(t.date), "yyyy-MM-dd");
      const label = format(new Date(t.date), "MMM dd");

      if (!acc[key]) {
        acc[key] = { date: label, sortKey: key, income: 0, expense: 0 };
      }

      if (t.type === "INCOME") acc[key].income += t.amount;
      else acc[key].expense += t.amount;

      return acc;
    }, {});

    const sorted = Object.values(grouped).sort(
      (a, b) => new Date(a.sortKey) - new Date(b.sortKey)
    );

    let runningBalance = 0;

    return sorted.map((day) => {
      runningBalance = Number((runningBalance + (day.income - day.expense)).toFixed(2));

      return {
        date: day.date,
        balance: runningBalance,
        sortKey: day.sortKey,
      };
    });
  }, [transactions, dateRange]);

  return (
    <Card className="h-full w-full flex flex-col 
      bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl 
      rounded-2xl border border-orange-200/30 dark:border-slate-700/40">

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">
          Balance Overview
        </CardTitle>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[130px] bg-orange-50 dark:bg-slate-700 border  border-slate-600 shadow-md rounded-md text-slate-900 dark:text-slate-200 text-sm">
            <SelectValue />
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

      {/* Chart */}
      <CardContent className="flex-1 p-0">
        <div className="w-full h-full min-h-[200px]">
          {filteredData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
              No data in this range
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="date"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
  new Intl.NumberFormat("en-IN").format(value)
}
                />

                <Tooltip
                  formatter={(value) => [`₹${value}`, "Balance"]}
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,165,0,0.2)",
                    borderRadius: "10px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="url(#balanceGradient)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}