/** @format */

import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {FaHome, FaUserPlus, FaChevronDown, FaTimes} from "react-icons/fa";
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

const Sidebar = ({isOpen, setIsOpen}) => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const user = JSON.parse(localStorage.getItem("userData"));

  // Auto-close on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname, setIsOpen]);

  // Outside click to close (mobile)
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
  }, [isOpen, setIsOpen]);

  // ESC key to close (mobile)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen && window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, setIsOpen]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className='h-5 w-5' />,
    },
    {
      title: "Teams",
      path: "/teams",
      icon: <Users className='h-5 w-5' />,
    },
    {
      title: "Leads",
      icon: <UserPlus className='h-5 w-5' />,
      dropdown: true,
      items: [
        {
          title: "Add Single Leads",
          path: "/leads",
          icon: <Contact className='h-4 w-4' />,
        },
        {
          title: "Add Bulk Leads",
          path: "/leads/add",
          icon: <Upload className='h-4 w-4' />,
        },
      ],
    },
    {
      title: "Campaigns",
      icon: <Megaphone className='h-5 w-5' />, // Loudspeaker for main Campaigns
      dropdown: true,
      items: [
        {
          title: "Create Campaign",
          path: "/campaign/createCampaign",
          icon: <PlusSquare className='h-4 w-4' />, // Plus box to signify creation
        },
        {
          title: "All Campaigns",
          path: "/campaign/allCampaigns",
          icon: <FolderOpenDot className='h-4 w-4' />, // Folder with dot for listing
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-transform duration-300 ease-in-out w-72 max-w-[80vw] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        {/* Logo + Close button */}
        <div className='flex items-center justify-between px-4 py-3 border-b'>
          <img
            src='/newlogo.png'
            alt='Logo'
            className='h-[110px] object-contain'
          />
          <button
            className='md:hidden text-gray-500 hover:text-gray-700'
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className='h-6 w-6' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex flex-col h-[calc(100%-5rem)]'>
          <div className='px-4 py-2'>
            <h2 className='text-xs uppercase text-gray-500 font-semibold'>
              Main
            </h2>
          </div>
          <ul className='flex-1 overflow-y-auto space-y-1'>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                        item.items.some((i) => location.pathname === i.path)
                          ? "bg-gray-100 border-l-4 border-blue-500 font-medium"
                          : ""
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <FaChevronDown
                        className={`h-3 w-3 transition-transform ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === index && (
                      <ul className='bg-gray-50 pl-4'>
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`block pl-10 pr-6 py-2 text-sm text-gray-600 hover:bg-gray-100 transition ${
                                location.pathname === subItem.path
                                  ? "bg-gray-100 font-medium text-gray-900"
                                  : ""
                              }`}
                              onClick={() =>
                                window.innerWidth < 768 && setIsOpen(false)
                              }
                            >
                              <div className='flex items-center gap-2'>
                                {subItem.icon}
                                <span>{subItem.title}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                      location.pathname === item.path
                        ? "bg-gray-100 border-l-4 border-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Footer user info */}
          <div className='border-t px-6 py-4 bg-gray-50 flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold'>
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-900'>
                {user?.name || "Unknown User"}
              </span>
              <span className='text-xs text-gray-500'>
                {user?.email || "No email"}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
