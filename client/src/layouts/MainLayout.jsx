/** @format */

// // import { useState } from "react"
// // import { Outlet } from "react-router-dom"
// // import Sidebar from "../components/Sidebar"
// // import Header from "../components/Header"

// // const MainLayout = ({ onLogout }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false)

// //   return (
// //     <div className="h-screen flex overflow-hidden bg-gray-100">
// //       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
// //       <div className="flex-1 overflow-auto focus:outline-none">
// //         <Header title="Dashboard" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={onLogout} />
// //         <main className="flex-1 relative pb-8 z-0 overflow-auto md:ml-64 lg:ml-72">
// //           {/* Added responsive margin to prevent overlap */}
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   )
// // }

// // export default MainLayout

// import { useState } from "react"
// import TopLoader from "../components/TopLoader"
// import { useSelector } from "react-redux"
// import Sidebar from "../components/Sidebar"
// import Header from "../components/Header"
// import { Outlet } from "react-router-dom"
// const MainLayout = ({ onLogout }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const { loading } = useSelector((state) => state.workspace) // read loading from Redux

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">
//       <TopLoader loading={loading} />
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//       <div className="flex-1 overflow-auto focus:outline-none">
//         <Header title="Dashboard" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={onLogout} />
//         <main className="flex-1 relative pb-8 z-0 overflow-auto md:ml-64 lg:ml-72">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }
// export default MainLayout

import {useState} from "react";
import TopLoader from "../components/TopLoader";
import {useSelector} from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {Outlet} from "react-router-dom";

const MainLayout = ({onLogout}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {loading} = useSelector((state) => state.workspace);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-100'>
      {/* Sidebar - fixed width */}
      <div className='w-64 lg:w-72 flex-shrink-0'>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
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
