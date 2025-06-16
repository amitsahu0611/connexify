

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCampaignById } from "../redux/slice/Campaign.slice";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { FiEdit2, FiSave, FiX, FiPrinter, FiUsers } from "react-icons/fi";
import DataTable from "./Datagrid";

const CampaignDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCampaign } = useSelector((state) => state.campaign);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getCampaignById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleCampaign) {
      setSelectedLeads(singleCampaign?.Leads?.map((lead) => lead.id));
      setSelectedAssignees(
        singleCampaign?.assignees?.map((assignee) => assignee.id)
      );
    }
  }, [singleCampaign]);

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const toggleAssigneeSelection = (assigneeId) => {
    setSelectedAssignees((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  };

  const handleSaveChanges = () => {
    const updatedCampaign = {
      ...singleCampaign,
      Leads: singleCampaign.Leads.filter((lead) =>
        selectedLeads.includes(lead.id)
      ),
      assignees: singleCampaign.assignees.filter((assignee) =>
        selectedAssignees.includes(assignee.id)
      ),
    };

    console.log("Updated Campaign Data:", updatedCampaign);
    // Here you would typically dispatch an update action
    // dispatch(updateCampaign(updatedCampaign));
    setIsEditing(false);
  };

  const leadColumns = useMemo(() => [
    ...(isEditing ? [{
      field: "select",
      headerName: "Select",
      width: 80,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedLeads.includes(params.row.id)}
          onChange={() => toggleLeadSelection(params.row.id)}
          className="h-4 w-4"
        />
      )
    }] : []),
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium">
            {params.row.name?.charAt(0) || "?"}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              <span
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => navigate(`/leads/profile/${params.row.id}`)}
              >
                {params.row.name}
              </span>
            </div>
            <div className="text-xs text-gray-500">{params.row.email}</div>
          </div>
        </div>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params) => (
        <div>
          <div className="text-sm text-gray-900">{params.row.company_name}</div>
          <div className="text-xs text-gray-500">{params.row.city_name}</div>
        </div>
      ),
    },
    {
      field: "service",
      headerName: "Service",
      flex: 1,
      renderCell: (params) => (
        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
          {params.row.service_categories}
        </span>
      ),
    },
    {
      field: "budget",
      headerName: "Budget",
      width: 120,
      renderCell: (params) => (
        <div className="text-sm text-gray-900">{params.row.budget}</div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
          {params.row.feedback?.length > 30
            ? `${params.row.feedback.substring(0, 30)}...`
            : params.row.feedback}
        </span>
      ),
    }
  ], [isEditing, selectedLeads, navigate]);

  const leadRows = useMemo(() => {
    return singleCampaign?.Leads?.map(lead => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company_name: lead.company_name,
      city_name: lead.city_name,
      service_categories: lead.service_categories,
      budget: lead.budget,
      feedback: lead.feedback
    })) || [];
  }, [singleCampaign]);

  if (!singleCampaign) return <div className="p-4 text-sm text-gray-600">Loading campaign data...</div>;

  return (
    <div className="px-4">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {singleCampaign.name} Campaign
          </h1>
          <p className="text-sm text-gray-600">{singleCampaign.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center px-3 py-2 rounded-md text-sm ${
              isEditing
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            {isEditing ? (
              <>
                <FiX className="mr-1" /> Cancel
              </>
            ) : (
              <>
                <FiEdit2 className="mr-1" /> Edit
              </>
            )}
          </button>
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
            >
              <FiSave className="mr-1" /> Save
            </button>
          )}
          {/* <button className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            <FiPrinter className="mr-1" /> Print
          </button> */}
        </div>
      </div>

      {/* Campaign Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Range
          </h3>
          <p className="mt-1 text-sm text-gray-900">
            {moment(singleCampaign.start_date).format("DD MMM YYYY")} -{" "}
            {moment(singleCampaign.end_date).format("DD MMM YYYY")}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total Leads
          </h3>
          <p className="mt-1 text-sm text-gray-900">
            {singleCampaign?.Leads?.length || 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Assigned To
          </h3>
          <div className="space-y-2">
            {singleCampaign?.assignees?.map((assignee) => (
              <div key={assignee.id} className="flex items-center">
                {isEditing && (
                  <input
                    type="checkbox"
                    checked={selectedAssignees.includes(assignee.id)}
                    onChange={() => toggleAssigneeSelection(assignee.id)}
                    className="mr-2 h-4 w-4 text-gray-700"
                  />
                )}
                <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-medium">
                  {assignee.user.name.charAt(0)}
                </div>
                <span className="ml-2 text-sm text-gray-900">
                  {assignee.user.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">
            Leads ({singleCampaign?.Leads?.length || 0})
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <FiUsers className="mr-1" />
            <span>Showing all leads</span>
          </div>
        </div>
        <div className="p-2">
          <DataTable 
            columns={leadColumns} 
            rows={leadRows}
            sx={{
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(even)': {
                  backgroundColor: '#f9fafb',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e5e7eb !important',
                },
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;
