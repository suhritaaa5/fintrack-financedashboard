# FinTrack — Finance Dashboard UI
---
## Overview
This is a finance dashboard that helps users track income, expenses, and spending patterns. It focuses on clean UI, responsive design, and interactive data visualization for keeping the track of the financial health. Features a slate glass dark mode and a gradient-based orange–yellow light mode for a visually refined experience.
---
## Tech Stack
- React
- Tailwind CSS
- Recharts
- Context API
- Shadcn/ui (UI components)
- lucide-react for icons
---
## Setup
```bash
git clone https://github.com/suhritaaa5/fintrack
cd project
npm install
npm run dev
```
---
## Features
### Dashboard
- Shows summary cards
- Includes charts for understanding the overall situation of Financial Health
- Displays Recent transactions


## Transactions
A detailed and interactive transactions table allows users to explore their financial activity.

### Displays transaction details including:
- Date
- Description
- Category highlighted with green if income and red if expense
- Amount 
- Recurring status along with tooltip which shows next date of payment if recurring 

### Search and Sorting Functionalities
- Search transactions by description,category
#### Filter By
- Type (Income / Expense) 
- Recurring status (Recurring / Non-recurring)
#### ↕ Sort by
- Date
- Amount
- Category

- Multi-select transactions (Admin only)
- Bulk delete with confirmation (Admin only)
- Provides real-time feedback using toast notifications
- Handles edge cases like empty states gracefully

## Role-Based UI
### Viewer
- can only view financial overview
- No modification access (when user toggle in top bar selected all edit options are hidden)
### Admin
- Can add, edit, and delete transactions
- Can select multiple transactions for bulk actions asks for confirmation too
## Transaction Overview Chart 
 - Visualizes income vs expense trends over time
- Helps users understand spending patterns and financial flow

## State Management
- Global state managed using React Context API
### Stores:
- Transactions data
- User role
### Persistence:
- Data stored in localStorage
- Theme preference saved across sessions

## Dark Mode and Theme
- Toggle between light and dark mode
- Theme preference is persisted using localStorage
### Carefully designed color system:
- Light mode uses warm gradients (orange → yellow)
- Dark mode uses slate-based glass UI
### Consistent styling across:
- Cards
- Tables
- Charts
- Buttons
## Insights
- Patterns visualized using charts
- Budget utilization tracking
- Income vs expense comparison over time for apt understanding of financial health
