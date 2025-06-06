/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCampaigns} from "../redux/slice/Campaign.slice";
import {container} from "../styles/Csstyles";
import {useMemo} from "react";
import {FiEye, FiRotateCw, FiTrash2} from "react-icons/fi";
import moment from "moment";
import {PlusIcon} from "lucide-react";
import DataTable from "../components/Datagrid";

const AllCampaigns = () => {
  const dispatch = useDispatch();
  const {allCampaigns} = useSelector((state) => state.campaign);
  const [campaigns, setAllCampaigns] = useState([]);
  const workspace_id = localStorage.getItem("workspace_id");

  console.log("Workspace ID:", workspace_id);

  useEffect(() => {
    if (workspace_id) {
      dispatch(getAllCampaigns(workspace_id));
    }
  }, [dispatch, workspace_id]);

  useEffect(() => {
    if (allCampaigns.length > 0) {
      setAllCampaigns(allCampaigns);
    }
  }, [allCampaigns]);

  console.log("All Campaigns:", campaigns);

  const columns = useMemo(
    () => [
      {field: "sno", headerName: "No", flex: 0.5},

      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => (
          <span className='font-normal text-blue-600 cursor-pointer underline'>
            {params.value}
          </span>
        ),
      },

      {
        field: "priority",
        headerName: "Priority",
        flex: 1,
        renderCell: () => (
          <span className='text-yellow-600 font-medium'>Medium</span>
        ),
      },

      {
        field: "assignee",
        headerName: "Assignee",
        flex: 1,
        renderCell: (params) => {
          const assignees = params.value || [];
          return assignees.length > 0 ? (
            <div className='flex gap-2 pt-3'>
              {assignees.map((a, idx) => {
                const initials = a.user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                return (
                  <div
                    key={idx}
                    className='w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm'
                    title={a.user?.name}
                  >
                    {initials}
                  </div>
                );
              })}
            </div>
          ) : (
            <span className='text-gray-500'>Unassigned</span>
          );
        },
      },

      {
        field: "totalLeads",
        headerName: "Total Leads",
        flex: 1,
      },

      {
        field: "progress",
        headerName: "Progress",
        flex: 1,
        renderCell: (params) => {
          const percentage = Math.min((params.value / 10) * 100, 100); // fake logic
          return (
            <div className='w-full bg-gray-200 rounded-full h-2.5 mt-5'>
              <div
                className='bg-green-500 h-2.5 rounded-full'
                style={{width: `${percentage}%`}}
              ></div>
            </div>
          );
        },
      },

      {
        field: "createdAt",
        headerName: "Created On",
        flex: 1,
        renderCell: (params) => moment(params.value).format("DD MMM YYYY"),
      },

      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <div className='flex gap-3 text-lg text-gray-600 mt-4'>
            <button title='View Report'>
              <FiEye />
            </button>
            <button title='Restart'>
              <FiRotateCw />
            </button>
            <button title='Delete' className='text-red-500'>
              <FiTrash2 />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const dummyCampaigns = [
    {
      id: 3,
      workspace_id: 1,
      name: "Summer Sale Campaign",
      description: "Discount offers for summer products",
      start_date: "2025-06-01T00:00:00.000Z",
      end_date: "2025-08-31T00:00:00.000Z",
      is_active: true,
      is_delete: false,
      createdAt: "2025-05-22T09:41:43.000Z",
      updatedAt: "2025-05-22T09:41:43.000Z",
      Leads: [
        {
          id: 8,
          workspace_id: 1,
          createdBy: 0,
          name: "John Doe2",
          phone: "919876543210",
          source: "Website",
          inhouse_division: "Sales",
          sheet_name: null,
          service_categories: "Consulting",
          requirements: "Looking for expert advice on marketing strategy.",
          budget: "#1500",
          email: "john.doe2@example.com",
          alternate_phone: "919812345678",
          city_name: "New York",
          feedback: "Very interested in premium services.",
          company_name: "Doe Enterprises",
          createdAt: "2025-05-21T06:24:50.000Z",
          updatedAt: "2025-05-21T06:24:50.000Z",
        },
        {
          id: 9,
          workspace_id: 1,
          createdBy: 0,
          name: "Alice Johnson",
          phone: "919876543210",
          source: "LinkedIn",
          inhouse_division: "Marketing",
          sheet_name: "leads-1747894541382",
          service_categories: "SEO",
          requirements: "Looking for SEO optimization for her business site",
          budget: "₹5000",
          email: "alice.johnson@example.com",
          alternate_phone: "911234567890",
          city_name: "Delhi",
          feedback: "Very interested in our SEO packages",
          company_name: "Alice Solutions",
          createdAt: "2025-05-22T06:15:41.000Z",
          updatedAt: "2025-05-22T06:15:41.000Z",
        },
        {
          id: 10,
          workspace_id: 1,
          createdBy: 0,
          name: "Bob Smith",
          phone: "918765432109",
          source: "Website",
          inhouse_division: "Sales",
          sheet_name: "leads-1747894541382",
          service_categories: "Web Development",
          requirements: "Needs a responsive business website",
          budget: "₹15000",
          email: "bob.smith@example.com",
          alternate_phone: "919876543219",
          city_name: "Mumbai",
          feedback: "Requested a callback for quote",
          company_name: "Bob Tech Pvt Ltd",
          createdAt: "2025-05-22T06:15:41.000Z",
          updatedAt: "2025-05-22T06:15:41.000Z",
        },
      ],
      assignees: [],
    },
    {
      id: 4,
      workspace_id: 1,
      name: "Summer Sale Campaign",
      description: "Discount offers for summer products",
      start_date: "2025-06-01T00:00:00.000Z",
      end_date: "2025-08-31T00:00:00.000Z",
      is_active: true,
      is_delete: false,
      createdAt: "2025-05-22T09:42:53.000Z",
      updatedAt: "2025-05-22T09:42:53.000Z",
      Leads: [
        {
          id: 8,
          workspace_id: 1,
          createdBy: 0,
          name: "John Doe2",
          phone: "919876543210",
          source: "Website",
          inhouse_division: "Sales",
          sheet_name: null,
          service_categories: "Consulting",
          requirements: "Looking for expert advice on marketing strategy.",
          budget: "#1500",
          email: "john.doe2@example.com",
          alternate_phone: "919812345678",
          city_name: "New York",
          feedback: "Very interested in premium services.",
          company_name: "Doe Enterprises",
          createdAt: "2025-05-21T06:24:50.000Z",
          updatedAt: "2025-05-21T06:24:50.000Z",
        },
        {
          id: 9,
          workspace_id: 1,
          createdBy: 0,
          name: "Alice Johnson",
          phone: "919876543210",
          source: "LinkedIn",
          inhouse_division: "Marketing",
          sheet_name: "leads-1747894541382",
          service_categories: "SEO",
          requirements: "Looking for SEO optimization for her business site",
          budget: "₹5000",
          email: "alice.johnson@example.com",
          alternate_phone: "911234567890",
          city_name: "Delhi",
          feedback: "Very interested in our SEO packages",
          company_name: "Alice Solutions",
          createdAt: "2025-05-22T06:15:41.000Z",
          updatedAt: "2025-05-22T06:15:41.000Z",
        },
        {
          id: 10,
          workspace_id: 1,
          createdBy: 0,
          name: "Bob Smith",
          phone: "918765432109",
          source: "Website",
          inhouse_division: "Sales",
          sheet_name: "leads-1747894541382",
          service_categories: "Web Development",
          requirements: "Needs a responsive business website",
          budget: "₹15000",
          email: "bob.smith@example.com",
          alternate_phone: "919876543219",
          city_name: "Mumbai",
          feedback: "Requested a callback for quote",
          company_name: "Bob Tech Pvt Ltd",
          createdAt: "2025-05-22T06:15:41.000Z",
          updatedAt: "2025-05-22T06:15:41.000Z",
        },
      ],
      assignees: [
        {
          id: 1,
          campaign_id: 4,
          user_id: 3,
          assigned_at: "2025-05-22T09:42:54.000Z",
          is_active: true,
          is_delete: false,
          createdAt: "2025-05-22T09:42:54.000Z",
          updatedAt: "2025-05-22T09:42:54.000Z",
          user: {
            user_id: 3,
            name: "Amit Sahu",
            email: "sahuamit00786@gmail.com",
          },
        },
      ],
    },
  ];

  const filteredRows = useMemo(() => {
    return dummyCampaigns.map((data, index) => ({
      sno: index + 1,
      id: data.id,
      name: data.name,
      priority: "Medium", // static
      assignee: data.assignees,
      totalLeads: data.Leads.length,
      progress: data.Leads.length, // pass count to calc progress
      createdAt: data.createdAt,
    }));
  }, []);

  return (
    <div className={`${container} min-h-screen`}>
      <div className='p-5 flex flex-row justify-between'>
        <div className='flex flex-col'>
          <span className='text-xl'>Campaigns</span>
          <span className='text-sm text-gray-600 mt-1'>
            Your campaign list sorted
          </span>
        </div>
        <div>
          <button className='flex flex-row items-center gap-2 border px-3 text-sm bg-[#7B68EE] hover:bg-[#5b4ab8] text-white py-2'>
            <PlusIcon size={18} /> Create New
          </button>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 p-4'>
        {/* Search Input - 40% */}
        <input
          type='text'
          placeholder='Search Campaign...'
          className='w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        {/* Dropdown - 15% */}
        <select className='w-[15%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Priority</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Low</option>
          <option>Normal</option>
          <option>None</option>
        </select>

        {/* Date Picker - 15% */}
        <select className='w-[15%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>All </option>
          <option>Today</option>
          <option>This day</option>
          <option>Yesterday</option>
          <option>This week</option>
          <option>Last week</option>
          <option>This month</option>
          <option>Last month</option>
        </select>

        {/* Select Assignee - 15% */}
        <select className='w-[15%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Assignee</option>
          <option>Riya</option>
          <option>John</option>
        </select>

        {/* Select Created By - 15% */}
        <select className='w-[15%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option>Created By</option>
          <option>Riya</option>
          <option>Admin</option>
        </select>
      </div>
      <div className='p-4'>
        <DataTable columns={columns} rows={filteredRows} />
      </div>
    </div>
  );
};

export default AllCampaigns;
