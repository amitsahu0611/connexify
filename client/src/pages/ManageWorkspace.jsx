



import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import {
  getAllWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../redux/slice/Workspace.slice";
import Table from "../components/Table";
import TopLoader from "../components/TopLoader";

export default function ManageWorkspace() {
  const dispatch = useDispatch();
  const { workspaces, workspaceDetail, loading, error } = useSelector(
    (state) => state.workspace
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    workspace_name: "",
    description: "",
    workspace_type: "general",
  });

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    dispatch(getAllWorkspaces());
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
    const payload = {
      ...formData,
      createdById: user?.user_id,
      is_active: true,
    };

    if (editingId) {
      dispatch(updateWorkspace({ id: editingId, updatedData: payload }));
    } else {
      dispatch(createWorkspace(payload));
    }

    setIsCreateModalOpen(false);
    setFormData({
      workspace_name: "",
      description: "",
      workspace_type: "general",
    });
    setEditingId(null);
  };

  const openWorkspaceDetail = (id) => {
    dispatch(getWorkspaceById(id));
    setIsDetailModalOpen(true);
  };

  const handleEdit = (workspace) => {
    setFormData({
      workspace_name: workspace.workspace_name,
      description: workspace.description,
      workspace_type: workspace.workspace_type || "general",
    });
    setEditingId(workspace.workspace_id);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      dispatch(deleteWorkspace(id));
    }
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
      key: "workspace_name",
      label: "Workspace Name",
      sortable: true,
      render: (workspace) => (
        <div className="text-sm font-medium text-gray-900">
          {workspace.workspace_name}
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
      render: (workspace) => (
        <div className="text-sm font-normal text-gray-700">
          {workspace.description || "No description"}
        </div>
      ),
    },
    {
      key: "workspace_type",
      label: "Type",
      sortable: true,
      render: (workspace) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {workspace.workspace_type || "General"}
        </span>
      ),
    },
  ];

  // Table actions
  const tableActions = (workspace) => (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={() => openWorkspaceDetail(workspace.workspace_id)}
        className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition duration-150"
        title="View Details"
      >
        <FiEye className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleEdit(workspace)}
        className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700 transition duration-150"
        title="Edit Workspace"
      >
        <FiEdit2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(workspace.workspace_id)}
        className="p-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700 transition duration-150"
        title="Delete Workspace"
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
              Workspace Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your workspaces and their configurations
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                workspace_name: "",
                description: "",
                workspace_type: "general",
              });
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-[#1E75D3] hover:bg-[#1E75D3] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Workspace
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
              data={workspaces || []}
              itemsPerPage={10}
              actions={tableActions}
            />
          )}
        </div>
      </div>

      {/* Create/Edit Workspace Modal */}
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
                        {editingId ? "Edit Workspace" : "Create New Workspace"}
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
                          {/* Workspace Name */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="workspace_name"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Workspace Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="workspace_name"
                                id="workspace_name"
                                required
                                value={formData.workspace_name}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              />
                            </div>
                          </div>

                          {/* Workspace Type */}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="workspace_type"
                              className="block text-xs font-medium text-gray-700"
                            >
                              Workspace Type
                            </label>
                            <div className="mt-1">
                              <select
                                id="workspace_type"
                                name="workspace_type"
                                value={formData.workspace_type}
                                onChange={handleChange}
                                className="p-1 border border-[1px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xs"
                              >
                                <option value="general">General</option>
                                <option value="marketing">Marketing</option>
                                <option value="development">Development</option>
                                <option value="design">Design</option>
                                <option value="operations">Operations</option>
                              </select>
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
                            {loading ? "Saving..." : editingId ? "Update" : "Create"}
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

      {/* Workspace Detail Modal */}
      {isDetailModalOpen && workspaceDetail && (
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
                        Workspace Details
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
                        <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-800 text-2xl font-medium">
                            {workspaceDetail.workspace_name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Workspace Name</p>
                            <p className="font-medium">{workspaceDetail.workspace_name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="font-medium capitalize">
                              {workspaceDetail.workspace_type || "General"}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500">Description</p>
                            <p className="font-medium">
                              {workspaceDetail.description || "No description"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <p className="font-medium">
                              {workspaceDetail.is_active ? (
                                <span className="text-green-600">Active</span>
                              ) : (
                                <span className="text-red-600">Inactive</span>
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Created On</p>
                            <p className="font-medium">
                              {new Date(workspaceDetail.createdAt).toLocaleDateString()}
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
