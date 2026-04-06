import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import Transactions from './pages/Transactions'
import Layout from './layout/Layout'
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from './components/ui/tooltip' 

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-100 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>

      </div>

    </TooltipProvider>
  );
};

export default App;