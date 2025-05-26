import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/config";

const Header = ({ title, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const workspaceRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("userData"));
  const workspace = JSON.parse(localStorage.getItem("selectedWorkspace"));

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        workspaceRef.current &&
        !workspaceRef.current.contains(event.target)
      ) {
        setIsWorkspaceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New lead assigned",
      message: "Sarah Johnson has been assigned to you",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Meeting reminder",
      message: "Call with Acme Corp in 30 minutes",
      time: "30 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task completed",
      message: "Robert completed the proposal for XYZ Inc",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      title: "New comment",
      message: "Emily commented on the Global Services deal",
      time: "2 days ago",
      unread: false,
    },
  ];

  const onLogout = () => {
    localStorage.clear();
    navigate("login");
    showToast("Logged out successfully", "success");
  };

  return (
    <header className="bg-[#FBFAFB] shadow-sm h-16 flex items-center px-4 sticky top-0 z-10">
      <button
        className="md:hidden mr-4 text-gray-600 focus:outline-none hover:text-gray-900"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h1 className="text-xl font-semibold text-gray-800 truncate">{title}</h1>

      <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
        {user?.role_id === 0 && (
          <div className="relative" ref={workspaceRef}>
            {/* Main Button Showing Company Name */}
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md shadow-sm hover:shadow-md focus:outline-none"
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            >
              <div className="text-sm font-medium text-gray-800 hidden sm:block">
                {workspace?.workspace_name || "Your Company"}
              </div>
              <svg
                className="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isWorkspaceOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-20">
                {/* Menu Options */}

                <a
                  href="/manage-workspace"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Manage Workspace
                </a>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={notificationsRef}>
          <button
            className="relative p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 ${
                      notification.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                      </div>
                      {notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
  <span className="text-gray-700 font-semibold text-sm">
    {user?.name?.charAt(0) || "?"}
  </span>
</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 text-gray-500 hidden sm:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </a>

              <div className="border-t border-gray-200"></div>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
