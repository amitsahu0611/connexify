import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeadsByWorkspace } from "../redux/slice/Lead.slice";
import DataTable from "../components/Datagrid";
import moment from "moment/moment";
import TeamProfile from "./TeamProfile";
import { X, Filter, Plus, Search, Download, Trash2 } from "lucide-react";
import { createCampaign } from "../redux/slice/Campaign.slice";
import { showError, showSuccess } from "../utils/config";
import { getAllUsers } from "../redux/slice/TeamSlice";

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const workspaceId = localStorage.getItem("workspace_id");
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([
    "sno",
    "name",
    "phone",
    "inhouse_division",
    "assignee",
    "createdAt",
    "checkbox",
  ]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    priority: "",
    startDate: "",
    endDate: "",
    assignees: [],
  });

  const { leads } = useSelector((state) => state.lead);
  const { users } = useSelector((state) => state.team);

  console.log("users in create", users);

  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    if (workspaceId) {
      dispatch(getLeadsByWorkspace(workspaceId));
    }
  }, [workspaceId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update select all state based on current selections
    if (
      filteredRows.length > 0 &&
      selectedLeads.length === filteredRows.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedLeads, leads]);

  const allColumns = useMemo(
    () => [
      {
        field: "sno",
        headerName: "S.No",
        flex: 0.5,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "checkbox",
        flex: 0.5,
        headerName: "Select",
        headerClassName: "text-xs font-medium text-gray-700",
        renderCell: (params) => (
          <input
            type="checkbox"
            checked={selectedLeads.includes(params.row.id)}
            onChange={(e) =>
              handleCheckboxChange(params.row.id, e.target.checked)
            }
            className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
        renderCell: (params) => (
          <span
            onClick={() => setSelectedLead(params.row)}
            className="cursor-pointer text-xs font-medium text-blue-600 hover:underline"
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "inhouse_division",
        headerName: "Division",
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
          const creator = params.value;
          if (!creator)
            return <span className="text-xs text-gray-500">Unassigned</span>;

          const initials = creator.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div className="flex items-center gap-2">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-gray-100"
                title={creator.name}
              >
                {initials}
              </div>
              <span className="text-xs">{creator.name}</span>
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
          <span className="text-xs">{moment(params.value).fromNow()}</span>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
      {
        field: "source",
        headerName: "Source",
        flex: 1,
        headerClassName: "text-xs font-medium text-gray-700",
        cellClassName: "text-xs text-gray-800",
      },
    ],
    [selectedLeads]
  );

  const filteredColumns = useMemo(
    () => allColumns.filter((col) => visibleColumns.includes(col.field)),
    [visibleColumns, allColumns]
  );

  const filteredRows = useMemo(() => {
    let rows = leads?.map((lead, index) => ({
      id: lead.id,
      sno: index + 1,
      name: lead.name || "-",
      phone: lead.phone || "-",
      email: lead.email || "-",
      source: lead.source || "-",
      inhouse_division: lead.inhouse_division || "N/A",
      assignee: lead.creator || "-",
      createdAt: lead.createdAt || "-",
    }));

    // Apply search filter if search term exists
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      rows = rows.filter(
        (row) =>
          row.name.toLowerCase().includes(term) ||
          row.phone.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term) ||
          row.inhouse_division.toLowerCase().includes(term)
      );
    }

    return rows;
  }, [leads, searchTerm]);

  const handleCheckboxChange = (id, checked) => {
    setSelectedLeads((prev) =>
      checked ? [...prev, id] : prev.filter((leadId) => leadId !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedLeads(filteredRows.map((row) => row.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const toggleColumn = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAssignee = (assignee) => {
    setFormState((prev) => {
      const isSelected = prev.assignees.some(
        (a) => a.user_id === assignee.user_id
      );
      return {
        ...prev,
        assignees: isSelected
          ? prev.assignees.filter((a) => a.user_id !== assignee.user_id)
          : [...prev.assignees, assignee],
      };
    });
  };

  const handleCreateCampaign = async () => {
    const { name, description, priority, startDate, endDate, assignees } =
      formState;
    const leadIds = selectedLeads;
    const assigneeIds = assignees.map((user) => user.user_id);

    if (leadIds.length === 0) {
      showError("Select Leads First");
      return;
    } else if (!name) {
      showError("Enter Campaign Name");
      return;
    } else if (!startDate || !endDate) {
      showError("Enter Start and End Date");
      return;
    } else if (assigneeIds.length === 0) {
      showError("No Assignees Selected");
      return;
    }

    const data = {
      workspace_id: workspaceId,
      name,
      description,
      priority,
      start_date: startDate,
      end_date: endDate,
      is_active: true,
      leadIds,
      assigneeIds,
    };

    const response = await dispatch(createCampaign(data));
    if (response.payload.status === 1) {
      showSuccess(response?.payload?.message);
      setShowCampaignModal(false);
      setFormState({
        name: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: "",
        assignees: [],
      });
      setSelectedLeads([]);
      setSelectAll(false);
    }
  };

  const downloadLeadsCSV = () => {
    if (!leads || leads.length === 0) return;

    // Use first item to get the keys, excluding nested objects like "creator"
    const csvHeader = Object.keys(leads[0]).filter(
      (key) => typeof leads[0][key] !== "object"
    );

    const csvRows = [
      csvHeader.join(","), // Header row
      ...leads.map((lead) =>
        csvHeader
          .map(
            (field) => `"${(lead[field] ?? "").toString().replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative p-4 bg-gray-100">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">
          Campaign Management
        </h1>

        <div className="flex gap-3">
          {/* Search input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded border border-gray-300 bg-gray-100 py-1.5 pl-9 pr-3 text-xs shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>

          {/* Column selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="flex items-center gap-1.5 rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs shadow-sm hover:bg-gray-300"
            >
              <Filter className="h-3.5 w-3.5 text-gray-700" />
              <span className="text-gray-700">Columns</span>
            </button>

            {showColumnSelector && (
              <div className="absolute right-0 z-10 mt-1 w-48 rounded border border-gray-300 bg-gray-100 shadow-lg">
                <div className="p-2">
                  <h3 className="mb-2 text-xs font-medium text-gray-700">
                    Select Columns
                  </h3>
                  {allColumns
                    .filter((col) => col.field !== "checkbox")
                    .map((column) => (
                      <label
                        key={column.field}
                        className="flex cursor-pointer items-center space-x-2 rounded p-2 text-xs hover:bg-gray-200"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(column.field)}
                          onChange={() => toggleColumn(column.field)}
                          className="h-3.5 w-3.5 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                        <span className="text-gray-700">
                          {column.headerName}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected leads action bar */}
      {selectedLeads.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded bg-gray-700 p-2">
          <div className="flex items-center gap-3 text-xs text-gray-100">
            <span>
              {selectedLeads.length} lead{selectedLeads.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedLeads([])}
              className="text-xs text-gray-300 hover:text-gray-100"
            >
              Clear selection
            </button>
          </div>
          <button
            onClick={() => setShowCampaignModal(true)}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>
      )}

      {/* Select all checkbox in header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-gray-700 focus:ring-gray-700"
          />
          <span className="ml-1.5 text-xs text-gray-700">
            {selectAll ? "Deselect all" : "Select all"} ({filteredRows.length}{" "}
            leads)
          </span>
        </div>

        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            More
            <svg
              className="-mr-1 ml-1.5 h-3.5 w-3.5 text-gray-700"
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

          {isOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded border border-gray-300 bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={downloadLeadsCSV}
                  className="flex w-full items-center px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                >
                  <Download className="mr-2 h-3.5 w-3.5 text-gray-700" />
                  Download {leads?.length || 0} Leads
                </button>
                <button className="flex w-full items-center px-3 py-1.5 text-left text-xs text-red-600 hover:bg-gray-200 hover:text-red-800">
                  <Trash2 className="mr-2 h-3.5 w-3.5 text-red-600" />
                  Delete {leads?.length || 0} leads
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DataTable rows={filteredRows} columns={filteredColumns} />

      {/* Lead detail panel */}
      {selectedLead && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30"
            onClick={() => setSelectedLead(null)}
          ></div>

          <div className="fixed right-0 top-0 z-50 h-full w-[70%] animate-slide-in overflow-y-auto bg-gray-100 shadow-xl transition-transform duration-300">
            <div className="flex justify-end border-b border-gray-300 p-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-600 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <TeamProfile lead={selectedLead} />
            </div>
          </div>
        </>
      )}

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={() => setShowCampaignModal(false)}
        >
          <div
            className="w-full max-w-md animate-fadeIn rounded-lg bg-gray-100 p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 text-base font-semibold text-gray-800">
              Create New Campaign
            </h2>
            <p className="mb-4 text-xs italic text-green-700">
              ( {selectedLeads?.length || "-"} leads selected )
            </p>

            {/* Campaign Name */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
                placeholder="Enter campaign name"
              />
            </div>

            {/* Campaign Description */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Campaign Description
              </label>
              <input
                type="text"
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
                placeholder="Enter campaign description"
              />
            </div>

            {/* Priority */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={formState.priority}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
              >
                <option value="">Select priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formState.startDate}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formState.endDate}
                onChange={handleInputChange}
                className="block w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
              />
            </div>

            {/* Assign To */}
            <div className="mb-4" ref={dropdownRef}>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Assign To
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full flex-wrap gap-1 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-left text-xs shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                >
                  {formState.assignees?.length > 0 ? (
                    formState.assignees.map((user) => (
                      <div
                        key={user.user_id}
                        className="flex items-center gap-1 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800"
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-[0.6rem] text-gray-100">
                          {user.initials}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      Select assignee(s)
                    </span>
                  )}
                </button>

                {isOpen && users && (
                  <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
                    {users.map((user) => {
                      const isSelected = formState.assignees.some(
                        (a) => a.user_id === user.user_id
                      );

                      return (
                        <label
                          key={user.user_id}
                          className="flex cursor-pointer items-center gap-2 p-2 text-xs hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAssignee(user)}
                            className="h-3 w-3 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                          />
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs text-gray-100">
                            {user.initials}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="text-[0.65rem] text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowCampaignModal(false);
                  setFormState({
                    name: "",
                    description: "",
                    priority: "",
                    startDate: "",
                    endDate: "",
                    assignees: [],
                  });
                }}
                className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="rounded bg-gray-700 px-3 py-1.5 text-xs text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
