# FinTrack — Finance Dashboard UI
---
## Overview

A modern frontend finance dashboard built with React, designed around real-world UX/UI patterns, thoughtful product decisions, and a strong focus on data usability. The application incorporates role-aware design principles to ensure tailored experiences for different user types.

It features a dual-theme system:

- A light theme with a warm orange–yellow gradient.
- A dark theme inspired by slate-toned glassmorphism, offering a sleek and focused interface.

The dashboard emphasizes clarity, accessibility, and intuitive data visualization, making complex financial information easy to interpret and act upon.

---

## 🚀 Live Demo

🔗 **[Open FinTrack Dashboard](https://fintrack-finance-dashboard-six.vercel.app/)**

---

## Technical Decisions

**The data is generated, not hardcoded.** `generateTransactions.js` creates realistic Indian financial history on first load — with income-to-expense ratios, category distributions based on real spending ranges (₹8,000–₹20,000 for housing, ₹300–₹1,500 for food), and classified as recurring/non-recurring schedules based on users input. 

**Recurring transactions are first-class data.** Rather than a boolean flag, each recurring transaction carries its interval (`DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`) and a computed `nextRecurringDate`. This powers a hover tooltip that tells you exactly when the next payment hits.

**Role-based UI is applied at the component level.** Switching to `Admin` unlocks bulk selection, per-row action menus, delete confirmation flows, and the ability to add new transactions. The `User` role sees the same components with the mutation surface hidden — no fake routing, no hidden pages, just clean conditional rendering driven by context.

**Budget updates without a page reload.** Budget state lives in `AppContext` alongside transactions. When you edit the budget, `updateBudget()` sets state directly — the dashboard's `useMemo` watching `[transactions, budget]` recomputes immediately. No `window.location.reload()`, no stale data.

**Theme is a design decision, not just a toggle.** Light mode uses a warm orange-yellow gradient to feel personal and approachable. Dark mode switches to a glassmorphism slate palette with `backdrop-blur-xl` and translucent surfaces — because dark mode users have different aesthetic expectations, and applying the same colour palette in both directions is a missed opportunity.

---

## Features

### Dashboard
- **4 stat tiles** — Total Income, Total Expenses, Net Balance, Savings Rate — all computed live from stored transactions using `useMemo`
- **Balance overview chart** — running balance trend over time with a date range selector (7D / 1M / 3M / 6M / All Time)
- **Spending breakdown** — donut chart with a custom legend component that pins category names left and INR amounts right, properly aligned regardless of label length
- **Monthly budget tracker** — editable inline, colour-coded progress bar (green → yellow → red), contextually accurate captions at every threshold
- **Financial insights panel** — highest spending category, single largest expense, average daily spend, expense-to-income ratio

### Transaction Management

The transactions table is the core feature and received the most design attention.

- **Search** — matches both description and category simultaneously
- **Sorting** — click-to-sort on Date, Category, and Amount with direction indicators
- **Filtering** — composable: Type (Income / Expense) and Recurrence ( Recurring / Non-Recurring)
- **Recurring badge with tooltip** — the ones which are recurring transactions show their  interval as a badge specifying their interval; hovering reveals the exact next payment date computed from the transaction's interval and last occurrence
- **Admin controls** — per-row delete, row-level checkbox selection, bulk delete with confirmation, toast feedback on all mutations
- **Clear filters** — appears only when at least one filter is active

### Add Transaction (Admin only)
- Full modal with type toggle, description, amount, date, category, and recurring toggle
- Category options change dynamically based on selected type
- Frequency selector appears only when recurring is enabled
- Client-side validation with inline error messages
- Persists to `localStorage` immediately

### Role System
Toggle between `User` and `Admin` from the topbar. Role state lives in `AppContext` and is consumed directly by components that need it — no prop drilling, no routing guards.

### Theming
- **Light:** `from-slate-50 via-orange-100 to-yellow-50` — warm orange - yellow gradient theme
- **Dark:** `from-slate-900 via-slate-800 to-slate-900` with `backdrop-blur-xl` slate glassmorphism theme
- Preference persisted to `localStorage` and applied on load

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| Components | shadcn/ui (Radix UI primitives) |
| Charts | Recharts |
| Icons | Lucide React |
| Date handling | date-fns |
| Notifications | react-hot-toast |
| Routing | React Router v6 |

---

## Getting Started

```bash
git clone https://github.com/suhritareddy/fintrack-finance-dashboard.git
cd fintrack-finance-dashboardUI
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

On first load, 90 days of transactions are generated and saved to `localStorage`. To reset the data, clear `localStorage` in DevTools and refresh.

Use the **User / Admin** toggle in the topbar to switch roles.

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── BalanceChart.jsx       # Running balance trend (Recharts)
│   ├── BudgetProgress.jsx     # Editable budget, context-driven, no-reload updates
│   ├── ExpensePieChart.jsx    
│   ├── RecentTransactions.jsx
│   ├── Sidebar.jsx          
│   ├── Topbar.jsx             # Role switcher, theme toggle, Add Transaction modal
│   ├── TransactionChart.jsx   # Income vs expense line chart
│   └── TransactionsTable.jsx  # Core feature — search, filter, sort, bulk actions
├── context/
│   └── AppContext.jsx         # Role, transactions, budget — all global state
├── data/
│   ├── budget.js
│   ├── categories.js
│   ├── dashboardStats.js      # Income, expense, net, savings rate, top category, avg daily spend
│   └── generateTransactions.js # 90-day realistic data generation with recurring logic
├── layout/
│   └── Layout.jsx           
├── pages/
│   ├── Dashboard.jsx
│   └── Transactions.jsx
└── App.jsx
```

---

