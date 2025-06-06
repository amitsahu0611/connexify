
// import {useState} from "react";
// import TopLoader from "../components/TopLoader";
// import {useSelector} from "react-redux";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import {Outlet} from "react-router-dom";

// const MainLayout = ({onLogout}) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const {loading} = useSelector((state) => state.workspace);

//   return (
//     <div className='flex h-screen overflow-hidden bg-gray-100'>
//       {/* Sidebar - fixed width */}
//       <div className='w-64 lg:w-72 flex-shrink-0'>
//         <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//       </div>

//       {/* Main Content */}
//       <div className='flex-1 flex flex-col overflow-hidden'>
//         <TopLoader loading={loading} />
//         <Header
//           title='Dashboard'
//           onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//           onLogout={onLogout}
//         />
//         <main className='flex-1 overflow-auto p-4'>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


import { useState } from "react";
import TopLoader from "../components/TopLoader";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse state
  const { loading } = useSelector((state) => state.workspace);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "ml-20" : "ml-72"
        }`}
      >
        <TopLoader loading={loading} />
        <Header
          title='Dashboard'
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
        <main className='flex-1 overflow-auto p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

