/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import StatusBadge from "../components/StatusBadge";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // Mock data for dashboard
  const stats = [
    {
      name: "Total Leads",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: (
        <svg
          className="h-5 w-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Conversion Rate",
      value: "24%",
      change: "+4%",
      changeType: "increase",
      icon: (
        <svg
          className="h-5 w-5 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      name: "Active Deals",
      value: "38",
      change: "-2%",
      changeType: "decrease",
      icon: (
        <svg
          className="h-5 w-5 text-amber-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Revenue",
      value: "$24,500",
      change: "+18%",
      changeType: "increase",
      icon: (
        <svg
          className="h-5 w-5 text-purple-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const recentLeads = [
    {
      id: 1,
      name: "John Smith",
      company: "Acme Inc",
      status: "New",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "XYZ Corp",
      status: "Contacted",
      date: "5 hours ago",
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Tech Solutions",
      status: "Qualified",
      date: "1 day ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Global Services",
      status: "Negotiation",
      date: "2 days ago",
    },
    {
      id: 5,
      name: "Robert Wilson",
      company: "Innovative Systems",
      status: "New",
      date: "3 days ago",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Call with John Smith",
      date: "Today, 2:00 PM",
      priority: "High",
    },
    {
      id: 2,
      title: "Send proposal to XYZ Corp",
      date: "Tomorrow, 10:00 AM",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Follow up with Tech Solutions",
      date: "May 22, 11:30 AM",
      priority: "Low",
    },
    {
      id: 4,
      title: "Prepare presentation for Global Services",
      date: "May 23, 9:00 AM",
      priority: "High",
    },
  ];

  return (
    <div className="flex-1 overflow-auto ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Leads and Tasks */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 sm:px-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Recent Leads
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Most recent leads added to your account
                </p>
              </div>
              <button
                onClick={() => navigate("/leads")}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                View All
              </button>
            </div>
          </div>
          <ul className="divide-y divide-gray-100">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="hover:bg-gray-50 transition-colors">
                <div
                  className="px-4 py-3 sm:px-5 cursor-pointer"
                  onClick={() => navigate(`/clients/${lead.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </p>
                        <p className="text-xs text-gray-500">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={lead.status} type="lead" />
                      <span className="text-xs text-gray-400">{lead.date}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 sm:px-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  Upcoming Tasks
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Your scheduled tasks for the coming days
                </p>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                View All
              </button>
            </div>
          </div>
          <ul className="divide-y divide-gray-100">
            {upcomingTasks.map((task) => (
              <li key={task.id} className="hover:bg-gray-50 transition-colors">
                <div className="px-4 py-3 sm:px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {task.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{task.date}</p>
                    </div>
                    <StatusBadge status={task.priority} type="priority" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-lg bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 sm:px-5">
          <h3 className="text-base font-semibold text-gray-800">
            Recent Activity
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Latest actions across your workspace
          </p>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            <li className="relative pb-4">
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Call with John Smith
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    30 minutes ago
                  </p>
                  <div className="mt-2 text-xs text-gray-600">
                    Discussed product requirements and pricing options. Follow up
                    next week.
                  </div>
                </div>
              </div>
            </li>
            <li className="relative pb-4">
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Email sent to Sarah Johnson
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">2 hours ago</p>
                  <div className="mt-2 text-xs text-gray-600">
                    Sent proposal and pricing information.
                  </div>
                </div>
              </div>
            </li>
            <li className="relative">
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-purple-500 flex items-center justify-center ring-4 ring-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    Meeting scheduled with Tech Solutions
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">Yesterday</p>
                  <div className="mt-2 text-xs text-gray-600">
                    Product demo scheduled for next Tuesday at 10:00 AM.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;