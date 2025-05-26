import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, UserPlus, X } from "lucide-react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import {
  createTeamMember,
  getAllUsers,
  getUserById,
} from "../redux/slice/TeamSlice";
import Table from "../components/Table";
import TopLoader from "../components/TopLoader";

export default function Teams() {
  const dispatch = useDispatch();
  const { users, userDetail, loading, error } = useSelector(
    (state) => state.team
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [workspaces, setWorkspaces] = useState([
    { id: 1, name: "Marketing" },
    { id: 2, name: "Development" },
    { id: 3, name: "Design" },
    { id: 4, name: "Operations" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    initials: "",
    email: "",
    password: "",
    role_id: 0,
    workspace_id: 1,
    phone: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-generate initials when name changes
    if (name === "name") {
      const nameParts = value.split(" ");
      const initials =
        nameParts.length > 1
          ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
          : value.substring(0, 2).toUpperCase();

      setFormData({
        ...formData,
        [name]: value,
        initials,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeamMember(formData));
    setIsCreateModalOpen(false);
    setFormData({
      name: "",
      initials: "",
      email: "",
      password: "",
      role_id: 0,
      workspace_id: 1,
      phone: "",
    });
  };

  const openUserDetail = (id) => {
    dispatch(getUserById(id));
    setIsDetailModalOpen(true);
  };

  const roleMap = {
    0: "Admin",
    1: "Manager",
    2: "Member",
    3: "Guest",
  };

  // Table columns configuration
const columns = [
  {
    key: "index",
    label: "ID",
    render: (_, index) => (
      <div className="text-sm font-medium text-gray-900">
        {index + 1}
      </div>
    ),
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
    render: (user) => (
      <div className="flex items-center">
        <div className="text-sm font-medium text-gray-900">
          {user.name}
        </div>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    render: (user) => (
      <div className="text-sm font-normal text-gray-700">
        {user.email}
      </div>
    ),
  },
  {
    key: "role_id",
    label: "Role",
    sortable: true,
    render: (user) => (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {roleMap[user.role_id] || "Unknown"}
      </span>
    ),
  },
  {
    key: "workspace_id",
    label: "Workspace",
    sortable: true,
    render: (user) => (
      <span className="text-sm font-normal text-gray-700">
        {workspaces.find((w) => w.id === user.workspace_id)?.name || "Unknown"}
      </span>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    sortable: true,
    render: (user) => (
      <div className="text-sm font-normal text-gray-700">
        {user.phone}
      </div>
    ),
  },
];

  // Table actions
  const tableActions = (user) => (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={() => openUserDetail(user.user_id)}
        className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition duration-150"
        title="View Details"
      >
        <FiEye className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Add edit functionality here
        }}
        className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700 transition duration-150"
        title="Edit Member"
      >
        <FiEdit2 className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Add delete functionality here
        }}
        className="p-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700 transition duration-150"
        title="Delete Member"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <TopLoader loading={loading} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-[#1E75D3] hover:bg-[#1E75D3] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : (
            <Table
              columns={columns}
              data={users || []}
              itemsPerPage={10}
              actions={tableActions}
            />
          )}
        </div>
      </div>

      {/* Create Team Member Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        Add Team Member
                      </h3>
                      <button
                        onClick={() => setIsCreateModalOpen(false)}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
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
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
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
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
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
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Role */}
                          <div className="sm:col-span-3">
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
                                value={formData.role_id}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              >
                                <option value={0}>Admin</option>
                                <option value={1}>Manager</option>
                                <option value={2}>Member</option>
                                <option value={3}>Guest</option>
                              </select>
                            </div>
                          </div>

                          {/* Workspace */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="workspace_id"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Workspace
                            </label>
                            <div className="mt-1">
                              <select
                                id="workspace_id"
                                name="workspace_id"
                                value={formData.workspace_id}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              >
                                {workspaces.map((workspace) => (
                                  <option
                                    key={workspace.id}
                                    value={workspace.id}
                                  >
                                    {workspace.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

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
                                value={formData.phone}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1E75D3] text-base font-medium text-white hover:bg-[#1E75D3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E75D3] sm:col-start-2 sm:text-xs"
                            disabled={loading}
                          >
                            {loading ? "Creating..." : "Create"}
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E75D3] sm:mt-0 sm:col-start-1 sm:text-xs"
                            onClick={() => setIsCreateModalOpen(false)}
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

      {/* User Detail Modal */}
      {isDetailModalOpen && userDetail && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        Team Member Details
                      </h3>
                      <button
                        onClick={() => setIsDetailModalOpen(false)}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-center mb-6">
                        <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-800 text-2xl font-medium">
                            {userDetail.initials}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Full Name</p>
                            <p className="font-medium">{userDetail.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{userDetail.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Role</p>
                            <p className="font-medium">
                              {roleMap[userDetail.role_id] || "Unknown"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Workspace</p>
                            <p className="font-medium">
                              {workspaces.find(
                                (w) => w.id === userDetail.workspace_id
                              )?.name || "Unknown"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">{userDetail.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Member Since
                            </p>
                            <p className="font-medium">
                              {new Date(
                                userDetail.created_at || Date.now()
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1E75D3] text-base font-medium text-white hover:bg-[#1E75D3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E75D3] sm:ml-3 sm:w-auto sm:text-xs"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
