


/** @format */
import { useState } from "react";
import TopLoader from "../components/TopLoader";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ onLogout, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useSelector((state) => state.workspace);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopLoader loading={loading} />
        <Header
          title={title}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
