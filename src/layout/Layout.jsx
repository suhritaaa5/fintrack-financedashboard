import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={sideBarCollapsed}
        onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          sideBarCollapsed={sideBarCollapsed}
          onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
        />

        <div className="p-5 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;