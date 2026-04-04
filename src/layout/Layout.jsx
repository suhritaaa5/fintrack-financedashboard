import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Layout = ({ children }) => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={sideBarCollapsed}
        onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="flex-1 flex flex-col">
        <Topbar sideBarCollapsed={sideBarCollapsed} onToggleSidebar={()=> setSideBarCollapsed(!sideBarCollapsed)}/>

        <div className="p-5 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;