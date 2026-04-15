import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRightLeft,
  
  Landmark,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    id: "transactions",
    icon: ArrowRightLeft,
    label: "Transactions",
  },
  
];

const Sidebar = ({ collapsed, onToggle, currentPage, onPageChange, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      {/*Logo*/}
      <div className="h-20 flex items-center px-4 border-b border-slate-200/50 dark:border-slate-600/50">
        <div className="flex items-center space-x-3">
          <div className=" w-10 h-10 bg-gradient-to-r from-orange-600 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg ">
            <Landmark className="w-6 h-6 text-white" />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                FinTrack
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Finance Dashboard
              </p>
            </div>
          )}
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === "/"
              ? item.id === "dashboard"
              : location.pathname.includes(item.id);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  navigate(`/${item.id === "dashboard" ? "" : item.id}`);
                  // Close mobile drawer after navigation
                  if (onNavigate) onNavigate();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-orange-500 to-yellow-300 text-white "
              : "text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }
        `}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-6 h-6 ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  />

                  {!collapsed && (
                    <span
                      className={`font-medium ml-2 ${
                        isActive
                          ? "text-white"
                          : "text-slate-700 dark:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
