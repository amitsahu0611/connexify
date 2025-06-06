/** @format */

import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLeadsByWorkspace} from "../redux/slice/Lead.slice";
import DataTable from "../components/Datagrid";
import moment from "moment/moment";
import TeamProfile from "./TeamProfile";
import {
  X,
  Filter,
  Plus,
  Users,
  Check,
  Search,
  Download,
  Trash2,
} from "lucide-react";
import {Modal} from "@mui/material";
import {createCampaign} from "../redux/slice/Campaign.slice";
import {showSuccess} from "../utils/config";

const CreateCampaign = () => {
  const dispatch = useDispatch();
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
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // Mock assignees data - in real app you would fetch this
  const assignees = [
    {
      user_id: 6,
      workspace_id: 16,
      name: "Avinash",
      initials: "AT",
      email: "avinash@gmail.com",
      password:
        "49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c",
      role_id: 2,
      reporting_to: null,
      phone: "6386923506",
      active: true,
      is_deleted: false,
      createdAt: "2025-06-02T10:48:54.000Z",
      updatedAt: "2025-06-03T05:52:31.000Z",
    },
    // ... other assignees
  ];

  const {leads} = useSelector((state) => state.lead);

  useEffect(() => {
    if (workspaceId) {
      dispatch(getLeadsByWorkspace(workspaceId));
    }
  }, [workspaceId]);

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
      },
      {
        field: "checkbox",
        flex: 0.5,
        headerName: "select",
        renderCell: (params) => (
          <input
            type='checkbox'
            checked={selectedLeads.includes(params.row.id)}
            onChange={(e) =>
              handleCheckboxChange(params.row.id, e.target.checked)
            }
            className='cursor-pointer'
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => (
          <span
            onClick={() => setSelectedLead(params.row)}
            className='font-normal text-blue-600 cursor-pointer underline'
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
      },
      {
        field: "inhouse_division",
        headerName: "Division",
        flex: 1,
      },
      {
        field: "assignee",
        headerName: "Assignee",
        flex: 1,
        renderCell: (params) => {
          const creator = params.value;
          if (!creator)
            return <span className='text-gray-500'>Unassigned</span>;

          const initials = creator.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div className='flex flex-row items-center gap-2'>
              <div
                className='w-7 h-7 rounded-full bg-indigo-500 text-white font-semibold flex items-center justify-center text-sm'
                title={creator.name}
              >
                {initials}
              </div>
              {creator.name}
            </div>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created On",
        flex: 1,
        renderCell: (params) => moment(params.value).fromNow(),
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "source",
        headerName: "Source",
        flex: 1,
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

  const handleCreateCampaign = async () => {
    const selectedLeadDetails = filteredRows.filter((row) =>
      selectedLeads.includes(row.id)
    );

    console.log("workspace", workspaceId);

    console.log("✅ Selected Leads:", selectedLeadDetails);
    console.log("📣 Campaign Name:", campaignName);
    console.log("📣 Campaign Description:", campaignDescription);

    console.log("👤 Assignee:", selectedAssignee);
    console.log("startDate", startDate);
    console.log("emdDate", endDate);
    const leadIds = selectedLeadDetails?.map((lead) => lead.id);
    const assigneeIds = selectedAssignee?.map((user) => user.user_id);

    const data = {
      workspace_id: workspaceId,
      name: campaignName,
      description: campaignDescription,
      start_date: startDate,
      end_date: endDate,
      is_active: true,
      leadIds: leadIds,
      assigneeIds: assigneeIds,
    };

    console.log("data", data);

    const response = await dispatch(createCampaign(data));
    console.log("response", response);
    if (response.payload.status == 1) {
      showSuccess(response?.payload?.message);
      setShowCampaignModal(false);
      setCampaignName("");
      setSelectedAssignee([]);
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
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='relative p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Campaign Management</h1>

        <div className='flex gap-4'>
          {/* Search input */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='text-gray-400' size={18} />
            </div>
            <input
              type='text'
              placeholder='Search leads...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Column selector dropdown */}
          <div className='relative'>
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200'
            >
              <Filter size={18} />
              <span>Columns</span>
            </button>

            {showColumnSelector && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200'>
                <div className='p-2'>
                  <h3 className='font-medium text-gray-700 mb-2'>
                    Select Columns
                  </h3>
                  {allColumns
                    .filter((col) => col.field !== "checkbox")
                    .map((column) => (
                      <label
                        key={column.field}
                        className='flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          checked={visibleColumns.includes(column.field)}
                          onChange={() => toggleColumn(column.field)}
                          className='rounded text-indigo-600'
                        />
                        <span>{column.headerName}</span>
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
        <div className='bg-blue-50 p-3 rounded-lg mb-4 flex justify-between items-center'>
          <div className='text-blue-800 flex items-center gap-4'>
            <span>
              {selectedLeads.length} lead{selectedLeads.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedLeads([])}
              className='text-blue-600 hover:text-blue-800 text-sm'
            >
              Clear selection
            </button>
          </div>
          <button
            onClick={() => setShowCampaignModal(true)}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            <Plus size={18} />
            <span>Create Campaign</span>
          </button>
        </div>
      )}

      {/* Select all checkbox in header */}
      <div className='mb-7 flex justify-between items-center'>
        <div>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='cursor-pointer mr-2'
          />
          <span className='text-md text-gray-600'>
            {selectAll ? "Deselect all" : "Select all"} ({filteredRows.length}{" "}
            leads)
          </span>
        </div>

        <div className='relative inline-block text-left'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='inline-flex justify-center items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white border focus:outline-none focus:ring-2 focus:ring-purple-500'
          >
            More
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {isOpen && (
            <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
              <div className='py-1'>
                <button
                  onClick={downloadLeadsCSV}
                  className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                >
                  <Download className='mr-3 h-5 w-5 text-gray-400' />
                  Download {leads?.length || 0} Leads
                </button>
                {/* <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'>
                  <Download className='mr-3 h-5 w-5 text-gray-400' />
                  Download Action Report
                </button>
                <button className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'>
                  <Download className='mr-3 h-5 w-5 text-gray-400' />
                  Download Salesform Report
                </button> */}
                <button className='flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-800 w-full text-left'>
                  <Trash2 className='mr-3 h-5 w-5 text-red-400' />
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
            className='fixed inset-0 bg-black bg-opacity-30 z-40'
            onClick={() => setSelectedLead(null)}
          ></div>

          <div className='fixed top-0 right-0 h-full overflow-y-auto w-[70%] bg-white z-50 shadow-xl transition-transform duration-300 animate-slide-in'>
            <div className='flex justify-end p-4 border-b'>
              <button
                onClick={() => setSelectedLead(null)}
                className='text-gray-600 hover:text-red-600 text-xl'
              >
                <X />
              </button>
            </div>
            <div className='p-4'>
              <TeamProfile lead={selectedLead} />
            </div>
          </div>
        </>
      )}

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm'
          onClick={() => setShowCampaignModal(false)}
        >
          <div
            className='bg-white rounded-lg p-6 w-full max-w-xl shadow-lg animate-fadeIn'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-xl font-bold mb-4'>Create New Campaign</h2>
            <h2 className='text-sm pb-2 text-green-700 italic'>
              ( {selectedLeads?.length || "-"} leads selected )
            </h2>

            {/* Campaign Name */}
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Campaign Name</label>
              <input
                type='text'
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter campaign name'
              />
            </div>

            {/* Campaign Description */}
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>
                Campaign Description
              </label>
              <input
                type='text'
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter campaign description'
              />
            </div>

            {/* Start Date */}
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>Start Date</label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* End Date */}
            <div className='mb-4'>
              <label className='block text-gray-700 mb-2'>End Date</label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Assign To */}
            <div className='mb-6'>
              <label className='block text-gray-700 mb-2'>Assign To</label>
              <div className='relative'>
                <button
                  onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                  className='w-full flex flex-wrap gap-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {selectedAssignee?.length > 0 ? (
                    selectedAssignee.map((user) => (
                      <div
                        key={user.user_id}
                        className='flex items-center gap-1 bg-blue-100 text-sm text-blue-800 px-2 py-1 rounded'
                      >
                        <div className='w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center'>
                          {user.initials}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className='text-gray-500'>Select assignee(s)</span>
                  )}
                </button>

                {showAssigneeDropdown && (
                  <div className='absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto'>
                    {assignees.map((assignee) => {
                      const isSelected = selectedAssignee.some(
                        (s) => s.user_id === assignee.user_id
                      );

                      const toggleSelection = () => {
                        if (isSelected) {
                          setSelectedAssignee(
                            selectedAssignee.filter(
                              (s) => s.user_id !== assignee.user_id
                            )
                          );
                        } else {
                          setSelectedAssignee([...selectedAssignee, assignee]);
                        }
                      };

                      return (
                        <label
                          key={assignee.user_id}
                          className='flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            checked={isSelected}
                            onChange={toggleSelection}
                            className='form-checkbox accent-blue-600'
                          />
                          <div className='w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm'>
                            {assignee.initials}
                          </div>
                          <div>
                            <div className='font-medium'>{assignee.name}</div>
                            <div className='text-xs text-gray-500'>
                              {assignee.email}
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
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setShowCampaignModal(false)}
                className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!campaignName || !selectedAssignee}
                className={`px-4 py-2 rounded-md text-white ${
                  !campaignName || !selectedAssignee
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
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
