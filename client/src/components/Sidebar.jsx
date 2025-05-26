import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaTasks,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaPlus,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isOpen && window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, setIsOpen]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="h-5 w-5" />,
    },
        {
      title: "Teams",
      path: "/teams",
      icon: <FaUserPlus className="h-5 w-5" />,
    },
    {
      title: "Leads",
      icon: <FaUserPlus className="h-5 w-5" />,
      dropdown: true,
      items: [
        { title: "Add Single Leads", path: "/leads" },
        { title: "Add Bulk Leads", path: "/leads/add" },
      ],
    },

  ];

  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-[#FBFAFB] shadow-lg z-30 transition-all duration-300 ease-in-out w-72 max-w-[80vw] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 lg:w-72`}
      >
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-full  ">
            <img
              src="/newlogo.png"
              alt="Logo"
              className="h-24 w-auto max-w-full object-contain rounded-full"
            />
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none absolute right-4"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <nav className="flex-1 py-4">
            <div className="px-4 py-2">
              <h2 className="text-xs uppercase text-gray-500 font-semibold">
                Main
              </h2>
            </div>

            <ul className="mt-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                          item.items.some((i) => location.pathname === i.path)
                            ? "bg-gray-100 border-l-4 border-blue-500 font-medium"
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-gray-600">
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        <FaChevronDown
                          className={`h-3 w-3 transform transition-transform ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === index && (
                        <ul className="bg-gray-50">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center pl-14 pr-6 py-2 text-sm text-gray-600 hover:bg-gray-100 ${
                                  location.pathname === subItem.path
                                    ? "bg-gray-100 font-medium text-gray-900"
                                    : ""
                                }`}
                                onClick={() =>
                                  window.innerWidth < 768 && setIsOpen(false)
                                }
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                        location.pathname === item.path
                          ? "bg-gray-100 border-l-4 border-blue-500 font-medium"
                          : ""
                      }`}
                      onClick={() =>
                        window.innerWidth < 768 && setIsOpen(false)
                      }
                    >
                      <span className="mr-3 text-gray-600">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t p-4 mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700 font-semibold">
                  {user?.name?.charAt(0) || "?"}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "No email available"}
                </p>
              </div>
              {/* Uncomment if you want a settings icon */}
              {/* <button className="text-gray-400 hover:text-gray-600">
      <FaCog className="h-5 w-5" />
    </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
