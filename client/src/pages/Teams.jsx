/** @format */

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, X } from "lucide-react";
import { FiEdit2 } from "react-icons/fi";
import {
  createTeamMember,
  getAllManagersByWorkspaceId,
  getAllUsers,
  getUserById,
  updateUser,
} from "../redux/slice/TeamSlice";
import TopLoader from "../components/TopLoader";
import DataTable from "../components/Datagrid"; // Assuming this is your DataGrid component
import { showSuccess } from "../utils/config";
import { Navigate, useNavigate } from "react-router-dom";

export default function Teams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workspaceManagers, users, userDetail, loading, error } = useSelector(
    (state) => state.team
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [reporting_to, setReportingTo] = useState(null);
  const [formData, setFormData] = useState({
    user_id: null,
    name: "",
    initials: "",
    email: "",
    password: "",
    role_id: 0,
    workspace_id: null,
    phone: "",
  });
  const handleEdit = (userId) => {
    dispatch(getAllManagersByWorkspaceId());
    const userToEdit = users.find((user) => user.user_id === userId);
    if (userToEdit) {
      setFormData({
        user_id: userToEdit.user_id,
        name: userToEdit.name,
        initials: userToEdit.initials,
        email: userToEdit.email,
        password: userToEdit.password,
        role_id: userToEdit.role_id,
        workspace_id: userToEdit.workspace_id,
        phone: userToEdit.phone,
        reporting_to: userToEdit.reporting_to || "",
      });
      setReportingTo(userToEdit.reporting_to);
      setUpdateMode(true);
    }
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createTeamMember(formData));
    setIsCreateModalOpen(false);
    setFormData({
      user_id: null,
      name: "",
      initials: "",
      email: "",
      password: "",
      role_id: 0,
      workspace_id: 1,
      phone: "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...formData,
      reporting_to: reporting_to,
      user_id: formData?.user_id, // Assuming userDetail contains the user_id of the user being edited
    };
    console.log("Editing user with data:", data);
    const updatedData = await dispatch(updateUser(data));
    console.log("updatedData", updatedData);
    if (updatedData.payload.length > 0) {
      dispatch(getAllUsers());
      setIsCreateModalOpen(false);
      setUpdateMode(false);
      showSuccess(updatedData?.message);
      setFormData({
        user_id: null,
        name: "",
        initials: "",
        email: "",
        password: "",
        role_id: 0,
        workspace_id: null,
        phone: "",
      });
    } else {
    }
  };

  const roleMap = {
    0: "Admin",
    1: "Manager",
    2: "Member",
    3: "Caller",
  };

  const getRoleName = (roleId) => {
    console.log("getRoleName called with roleId:", roleId); // Debugging log
    console.log("roleMap:", roleMap[roleId]); // Debugging log
    return roleMap[roleId] || "Unknown";
  };

  const handleOpenProfile = (row) => {
    navigate(`/leads/profile/${row.id}`);
  };

  // Define columns using useMemo
  const columns = useMemo(
    () => [
      { field: "sno", headerName: "No", flex: 1 },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => (
          <span
            onClick={() => handleOpenProfile(params.row)}
            style={{
              color: "#1976d2",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {params.value}
          </span>
        ),
      },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "Phone", flex: 1 },
      {
        field: "role_id",
        headerName: "Role",
        flex: 1,
      },
      {
        field: "active",
        headerName: "Active",
        flex: 1,
        renderCell: (params) => (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              params.value
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {params.value ? "Yes" : "No"}
          </span>
        ),
      },
      {
        field: "action",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <button
            onClick={() => handleEdit(params.row.id)} // Call the edit function with the row id
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
        ),
      },
    ],
    []
  );

  // Filter and map rows using useMemo
  const filteredRows = useMemo(() => {
    if (!users) {
      return [];
    }
    return users.map((data, index) => ({
      sno: index + 1,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      role_id: getRoleName(Number(data.role_id)),
      active: data.active,
      id: data.user_id,
    }));
  }, [users]);

  return (
    <div className=" container mx-auto ">
      {loading && <TopLoader loading={loading} />}
      <div className=" px-4 sm:px-2 lg:px-2 py-2">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Team Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your team members and their access
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-[#1F2937] hover:bg-[#0a0e13] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <User Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : (
            <DataTable columns={columns} rows={filteredRows} />
          )}
        </div>
      </div>

      {/* Create Team Member Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0  z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {updateMode ? "Edit User" : "Create User"}
                      </h3>
                      <button
                        onClick={() => {
                          setIsCreateModalOpen(false), setUpdateMode(false);
                        }}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <form>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* Full Name */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="name"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Full Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter user's full name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Initials */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="initials"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Initials
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="initials"
                                id="initials"
                                required
                                placeholder="Enter user's initials"
                                value={formData.initials}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="email"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                                id="email"
                                name="email"
                                placeholder="Enter user's email address"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="password"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Password
                            </label>
                            <div className="mt-1">
                              <input
                                id="password"
                                name="password"
                                placeholder="Enter user's password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Role */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="role_id"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Role
                            </label>
                            <div className="mt-1">
                              <select
                                id="role_id"
                                name="role_id"
                                placeholder="Select role"
                                required
                                value={formData.role_id}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              >
                                <option value={1}>Manager</option>
                                <option value={2}>Admin</option>
                                <option value={3}>Caller</option>
                              </select>
                            </div>
                          </div>

                          {formData?.role_id == 3 && (
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="reporting_to"
                                className="block text-xs font-medium text-gray-700"
                              >
                                Reporting to
                              </label>
                              <div className="mt-1">
                                <select
                                  id="reporting_to"
                                  name="reporting_to"
                                  value={reporting_to || "-"}
                                  onChange={(e) =>
                                    setReportingTo(Number(e.target.value))
                                  }
                                  className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                                >
                                  <option value="-">Select Reporting to</option>
                                  {workspaceManagers?.map((manager) => (
                                    <option
                                      key={manager.user_id}
                                      value={manager.user_id}
                                    >
                                      {manager.name} ({manager.initials})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}

                          {/* Phone Number */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="phone"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Phone Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Enter user's phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          {updateMode ? (
                            <button
                              onClick={handleEditSubmit}
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1E75D3] text-base font-medium text-white hover:bg-[#1E75D3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E75D3] sm:col-start-2 sm:text-xs"
                            >
                              Update User
                            </button>
                          ) : (
                            <button
                              onClick={handleSubmit}
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1F2937] text-base font-medium text-white hover:bg-[#131922] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F2937] sm:col-start-2 sm:text-xs"
                            >
                              Add User
                            </button>
                          )}

                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E75D3] sm:mt-0 sm:col-start-1 sm:text-xs"
                            onClick={() => {
                              setIsCreateModalOpen(false), setUpdateMode(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
