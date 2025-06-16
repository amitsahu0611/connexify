// /** @format */
// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaChevronDown,
//   FaTimes,
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
// } from "react-icons/fa";
// import {
//   Contact,
//   FolderOpenDot,
//   Home,
//   Megaphone,
//   PlusSquare,
//   Upload,
//   UserPlus,
//   Users,
// } from "lucide-react";
// import { IoMdSearch } from "react-icons/io";

// const Sidebar = ({ isOpen, setIsOpen, collapsed, setCollapsed }) => {
//   const location = useLocation();
//   const sidebarRef = useRef(null);
//   const user = JSON.parse(localStorage.getItem("userData"));
//   const [openDropdown, setOpenDropdown] = useState(null);

//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setIsOpen(false);
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         window.innerWidth < 768
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && isOpen && window.innerWidth < 768) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen]);

//   const toggleDropdown = (index) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   const menuItems = [
//     {
//       title: "Dashboard",
//       path: "/dashboard",
//       icon: <Home className="h-4 w-4" />,
//     },
//     { title: "Teams", path: "/teams", icon: <Users className="h-4 w-4" /> },
//     {
//       title: "Search",
//       path: "/search",
//       icon: <IoMdSearch className="h-4 w-4" />,
//     },
//     {
//       title: "Leads",
//       icon: <UserPlus className="h-4 w-4" />,
//       dropdown: true,
//       items: [
//         {
//           title: "Add Single Leads",
//           path: "/leads",
//           icon: <Contact className="h-3.5 w-3.5" />,
//         },
//         {
//           title: "Add Bulk Leads",
//           path: "/leads/add",
//           icon: <Upload className="h-3.5 w-3.5" />,
//         },
//       ],
//     },
//     {
//       title: "Campaigns",
//       icon: <Megaphone className="h-4 w-4" />,
//       dropdown: true,
//       items: [
//         {
//           title: "Create Campaign",
//           path: "/campaign/createCampaign",
//           icon: <PlusSquare className="h-3.5 w-3.5" />,
//         },
//         {
//           title: "All Campaigns",
//           path: "/campaign/allCampaigns",
//           icon: <FolderOpenDot className="h-3.5 w-3.5" />,
//         },
//       ],
//     },
//   ];

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       <div
//         ref={sidebarRef}
//         className={`fixed top-0 left-0 h-full bg-white text-gray-100 shadow-xl z-30 transition-all duration-300 ease-in-out ${
//           collapsed ? "w-16" : "w-64"
//         } max-w-[80vw] md:relative`}
//       >
//         {/* Logo & Collapse Toggle */}
//         <div className="flex items-center justify-between px-3 py-4 border-b border-gray-700 relative h-20">
//           {!collapsed ? (
//             <div className="flex flex-col items-center justify-center w-full px-2">
//               <div className="text-xl font-bold text-white tracking-wide">
//                 CONNEXIFY
//               </div>
//               <div className="text-xs text-gray-400 mt-1">
//                 LEAD MANAGEMENT SYSTEM
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center w-full">
//               <div className="text-xl font-bold text-white">C</div>
//             </div>
//           )}
//           <button
//             className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full p-1 shadow-md"
//             onClick={() => setCollapsed(!collapsed)}
//           >
//             {collapsed ? (
//               <FaAngleDoubleRight className="h-3 w-3" />
//             ) : (
//               <FaAngleDoubleLeft className="h-3 w-3" />
//             )}
//           </button>
//           <button
//             className="md:hidden text-gray-400 hover:text-white absolute right-2 top-2"
//             onClick={() => setIsOpen(false)}
//           >
//             <FaTimes className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="flex flex-col h-[calc(100%-5rem)]">
//           <ul className="flex-1 overflow-y-auto space-y-1 mt-2 px-2">
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 {item.dropdown ? (
//                   <>
//                     <button
//                       onClick={() => toggleDropdown(index)}
//                       className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-700 rounded transition ${
//                         item.items.some((i) => location.pathname === i.path)
//                           ? "bg-gray-700"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-gray-300">{item.icon}</span>
//                         {!collapsed && (
//                           <span className="text-gray-100">{item.title}</span>
//                         )}
//                       </div>
//                       {!collapsed && (
//                         <FaChevronDown
//                           className={`h-2.5 w-2.5 text-gray-400 transition-transform ${
//                             openDropdown === index ? "rotate-180" : ""
//                           }`}
//                         />
//                       )}
//                     </button>
//                     {!collapsed && openDropdown === index && (
//                       <ul className="bg-gray-750 pl-8 rounded-b">
//                         {item.items.map((subItem, subIndex) => (
//                           <li key={subIndex}>
//                             <Link
//                               to={subItem.path}
//                               className={`flex items-center gap-2 pl-3 pr-3 py-2 text-xs hover:bg-gray-700 rounded transition ${
//                                 location.pathname === subItem.path
//                                   ? "bg-gray-700 text-white"
//                                   : "text-gray-300"
//                               }`}
//                               onClick={() =>
//                                 window.innerWidth < 768 && setIsOpen(false)
//                               }
//                             >
//                               {subItem.icon}
//                               {!collapsed && <span>{subItem.title}</span>}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-700 rounded transition ${
//                       location.pathname === item.path
//                         ? "bg-gray-700 text-white"
//                         : "text-gray-300"
//                     }`}
//                     onClick={() => window.innerWidth < 768 && setIsOpen(false)}
//                   >
//                     <span className="text-gray-300">{item.icon}</span>
//                     {!collapsed && (
//                       <span className="text-gray-100">{item.title}</span>
//                     )}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>

//           {/* User info */}
//           <div className="border-t border-gray-700 px-3 py-3 bg-gray-750 flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
//               {user?.name?.charAt(0).toUpperCase() || "?"}
//             </div>
//             {!collapsed && (
//               <div className="flex flex-col overflow-hidden">
//                 <span className="text-xs font-medium text-white truncate">
//                   {user?.name || "Unknown User"}
//                 </span>
//                 <span className="text-xs text-gray-400 truncate">
//                   {user?.email || "No email"}
//                 </span>
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

/** @format */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaTimes,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  Contact,
  FolderOpenDot,
  Home,
  Megaphone,
  PlusSquare,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import { IoMdSearch } from "react-icons/io";

const Sidebar = ({ isOpen, setIsOpen, collapsed, setCollapsed }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen && window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    { title: "Teams", path: "/teams", icon: <Users className="h-4 w-4" /> },
    {
      title: "Search",
      path: "/search",
      icon: <IoMdSearch className="h-4 w-4" />,
    },
    {
      title: "Leads",
      icon: <UserPlus className="h-4 w-4" />,
      dropdown: true,
      items: [
        {
          title: "Add Single Leads",
          path: "/leads",
          icon: <Contact className="h-3.5 w-3.5" />,
        },
        {
          title: "Add Bulk Leads",
          path: "/leads/add",
          icon: <Upload className="h-3.5 w-3.5" />,
        },
      ],
    },
    {
      title: "Campaigns",
      icon: <Megaphone className="h-4 w-4" />,
      dropdown: true,
      items: [
        {
          title: "Create Campaign",
          path: "/campaign/createCampaign",
          icon: <PlusSquare className="h-3.5 w-3.5" />,
        },
        {
          title: "All Campaigns",
          path: "/campaign/allCampaigns",
          icon: <FolderOpenDot className="h-3.5 w-3.5" />,
        },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-xl z-30 transition-all duration-300 ease-in-out ${
          collapsed ? "w-16" : "w-64"
        } max-w-[80vw] md:relative`}
      >
        {/* Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-200 relative h-20">
          {!collapsed ? (
            <div className="flex flex-col items-center justify-center w-full px-2">
              <div className="text-xl font-bold text-gray-800 tracking-wide">
                CONNEXIFY
              </div>
              <div className="text-xs text-gray-500 mt-1">
                LEAD MANAGEMENT SYSTEM
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div className="text-xl font-bold text-gray-800">C</div>
            </div>
          )}
          <button
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-600 rounded-full p-1 shadow-md border border-gray-200"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <FaAngleDoubleRight className="h-3 w-3" />
            ) : (
              <FaAngleDoubleLeft className="h-3 w-3" />
            )}
          </button>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 absolute right-2 top-2"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col h-[calc(100%-5rem)]">
          <ul className="flex-1 overflow-y-auto space-y-1 mt-2 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-100 rounded transition ${
                        item.items.some((i) => location.pathname === i.path)
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
                        {!collapsed && (
                          <span className="text-gray-800">{item.title}</span>
                        )}
                      </div>
                      {!collapsed && (
                        <FaChevronDown
                          className={`h-2.5 w-2.5 text-gray-500 transition-transform ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {!collapsed && openDropdown === index && (
                      <ul className="bg-gray-50 pl-8 rounded-b">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`flex items-center gap-2 pl-3 pr-3 py-2 text-xs hover:bg-gray-100 rounded transition ${
                                location.pathname === subItem.path
                                  ? "bg-gray-100 text-gray-800 font-medium"
                                  : "text-gray-600"
                              }`}
                              onClick={() =>
                                window.innerWidth < 768 && setIsOpen(false)
                              }
                            >
                              {subItem.icon}
                              {!collapsed && <span>{subItem.title}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 rounded transition ${
                      location.pathname === item.path
                        ? "bg-gray-100 text-gray-800 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                  >
                    <span className="text-gray-600">{item.icon}</span>
                    {!collapsed && (
                      <span className="text-gray-800">{item.title}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* User info */}
          <div className="border-t border-gray-200 px-3 py-3 bg-gray-50 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-medium text-gray-800 truncate">
                  {user?.name || "Unknown User"}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {user?.email || "No email"}
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
