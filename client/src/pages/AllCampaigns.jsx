import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampaigns } from "../redux/slice/Campaign.slice";
import { FiEye, FiRotateCw, FiTrash2 } from "react-icons/fi";
import moment from "moment";
import { PlusIcon } from "lucide-react";
import DataTable from "../components/Datagrid";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../redux/slice/TeamSlice";
import { IoIosRefresh } from "react-icons/io";

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCampaigns, loading } = useSelector((state) => state.campaign);
  const workspace_id = localStorage.getItem("workspace_id");
  const { users } = useSelector((state) => state.team);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("");

  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    if (workspace_id) {
      dispatch(getAllCampaigns(workspace_id));
    }
  }, [dispatch, workspace_id]);

  const handleCampaignClick = (id) => {
    navigate(`/campaign/${id}`);
  };

  const columns = useMemo(
    () => [
      {
        field: "sno",
        headerName: "No",
        flex: 0.5,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => (
          <span
            className="text-xs font-medium text-gray-700 cursor-pointer hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              handleCampaignClick(params.row.id);
            }}
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "priority",
        headerName: "Priority",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "assignee",
        headerName: "Assignee",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => {
          const assignees = params.value || [];
          return assignees.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {assignees.map((a, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-700"
                  title={a.user?.name || "Unknown"}
                >
                  {a.user?.name || "Unknown"}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-500">Unassigned</span>
          );
        },
      },
      {
        field: "totalLeads",
        headerName: "Total Leads",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "progress",
        headerName: "Progress",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => {
          const percentage = Math.min((params.value / 10) * 100, 100);
          return (
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div
                className="bg-gray-700 h-1.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created On",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => (
          <span className="text-xs">
            {moment(params.value).format("DD MMM YYYY")}
          </span>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => (
          <div className="flex gap-2 text-sm text-gray-600">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCampaignClick(params.row.id);
              }}
              title="View Report"
              className="hover:text-gray-800"
            >
              <FiEye size={14} />
            </button>
           
            <button title="Delete" className="text-red-500 hover:text-red-700">
              <FiTrash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const filterCampaigns = useMemo(() => {
    if (!allCampaigns) return [];

    let filtered = allCampaigns;

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (priorityFilter) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.priority?.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    // Filter by date range
    if (dateFilter !== "all") {
      const now = moment();
      filtered = filtered.filter((campaign) => {
        const createdAt = moment(campaign.createdAt);

        switch (dateFilter) {
          case "today":
            return createdAt.isSame(now, "day");
          case "yesterday":
            return createdAt.isSame(now.clone().subtract(1, "day"), "day");
          case "this week":
            return createdAt.isSame(now, "week");
          case "last week":
            return createdAt.isSame(now.clone().subtract(1, "week"), "week");
          case "this month":
            return createdAt.isSame(now, "month");
          case "last month":
            return createdAt.isSame(now.clone().subtract(1, "month"), "month");
          default:
            return true;
        }
      });
    }

    // Filter by assignee
    if (assigneeFilter) {
      filtered = filtered.filter((campaign) => {
        if (!campaign.assignees || campaign.assignees.length === 0)
          return false;
        return campaign.assignees.some(
          (assignee) => assignee.user?.name === assigneeFilter
        );
      });
    }

    return filtered.map((data, index) => ({
      sno: index + 1,
      id: data?.id,
      name: data?.name || "-",
      priority: data.priority || "-",
      assignee: data?.assignees || [],
      totalLeads: data?.Leads?.length || 0,
      progress: data?.Leads?.length || 0,
      createdAt: data?.createdAt || new Date().toISOString(),
    }));
  }, [allCampaigns, searchTerm, priorityFilter, dateFilter, assigneeFilter]);

  const Refresh = () => {
    dispatch(getAllCampaigns(workspace_id));
    dispatch(getAllUsers());
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-2 md:mb-0">
          <h1 className="text-sm font-semibold text-gray-800">Campaigns</h1>
          <p className="text-xs text-gray-600 mt-1">
            Your campaign list sorted
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/campaign/createCampaign")}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-800 text-white rounded shadow-sm"
          >
            <PlusIcon size={14} /> Create New
          </button>
          <button
            onClick={Refresh}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-800 text-white rounded shadow-sm"
          >
            <IoIosRefresh size={14} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-4 text-center text-xs text-gray-600">
          Loading campaigns...
        </div>
      )}

      {!loading && (!allCampaigns || allCampaigns.length === 0) && (
        <div className="p-4 text-center text-xs text-gray-600">
          No campaigns found. Create your first campaign!
        </div>
      )}

      {!loading && allCampaigns && allCampaigns.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              type="text"
              placeholder="Search Campaign..."
              className="w-full md:w-1/3 px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full md:w-1/5 px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="w-full md:w-1/5 px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this week">This week</option>
              <option value="last week">Last week</option>
              <option value="this month">This month</option>
              <option value="last month">Last month</option>
            </select>
            <select
              className="w-full md:w-1/5 px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <option key={user.name} value={user.name}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option value="">Loading users...</option>
              )}
            </select>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <DataTable columns={columns} rows={filterCampaigns} />
          </div>
        </>
      )}
    </div>
  );
};

export default AllCampaigns;
