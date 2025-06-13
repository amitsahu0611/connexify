/** @format */

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getCampaignById} from "../redux/slice/Campaign.slice";
import {useDispatch, useSelector} from "react-redux";

const CampaignDashboard = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {singleCampaign} = useSelector((state) => state.campaign);
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

  const logCampaignData = () => {
    console.log("Current Campaign Data:", {
      ...singleCampaign,
      selectedLeads,
      selectedAssignees,
    });
  };

  if (!singleCampaign) return <div>Loading campaign data...</div>;

  return (
    <>
      <div className='pl-1 text-gray-600 text-xl mt-2 mb-4'>
        Campaign Details
      </div>
      <div className=' bg-gray-50 p-6'>
        <header className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='text-xl font-bold text-indigo-800'>
              {singleCampaign.name} Campaign
            </h1>
            <p className='text-gray-600'>{singleCampaign.description}</p>
          </div>
          <div className='flex space-x-2 text-sm'>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-md ${
                isEditing
                  ? "bg-gray-200 text-gray-800"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {isEditing ? "Cancel Editing" : "Edit Campaign"}
            </button>
            <button
              onClick={logCampaignData}
              className='px-4 py-2 bg-blue-600 text-white rounded-md'
            >
              Log Data
            </button>
            {isEditing && (
              <button
                onClick={handleSaveChanges}
                className='px-4 py-2 bg-green-600 text-white rounded-md'
              >
                Save Changes
              </button>
            )}
          </div>
        </header>

        {/* Campaign Summary */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='text-sm font-medium text-gray-500'>Date Range</h3>
            <p className='mt-1 text-gray-900'>
              {new Date(singleCampaign.start_date).toLocaleDateString()} -{" "}
              {new Date(singleCampaign.end_date).toLocaleDateString()}
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='text-sm font-medium text-gray-500'>Total Leads</h3>
            <p className='mt-1 text-gray-900'>
              {singleCampaign?.Leads?.length}
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg shadow'>
            <h3 className='text-sm font-medium text-gray-500'>Assigned To</h3>
            <div className='mt-1 space-y-2'>
              {singleCampaign?.assignees?.map((assignee) => (
                <div key={assignee.id} className='flex items-center'>
                  {isEditing && (
                    <input
                      type='checkbox'
                      checked={selectedAssignees.includes(assignee.id)}
                      onChange={() => toggleAssigneeSelection(assignee.id)}
                      className='mr-2 h-4 w-4'
                    />
                  )}
                  <div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium'>
                    {assignee.user.name.charAt(0)}
                  </div>
                  <span className='ml-2 text-gray-900'>
                    {assignee.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Section */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>
              Leads ({singleCampaign?.Leads?.length})
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  {isEditing && (
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Select
                    </th>
                  )}
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Company
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Service
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Budget
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {singleCampaign?.Leads?.map((lead) => (
                  <tr
                    key={lead.id}
                    className={
                      !selectedLeads?.includes(lead.id) && isEditing
                        ? "opacity-50"
                        : ""
                    }
                  >
                    {isEditing && (
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={selectedLeads?.includes(lead.id)}
                          onChange={() => toggleLeadSelection(lead.id)}
                          className='h-4 w-4'
                        />
                      </td>
                    )}
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium'>
                          {lead?.name?.charAt(0)}
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            <span
                              className='text-blue-800 font-semibold underline cursor-pointer hover:text-blue-600'
                              onClick={() =>
                                navigate(`/leads/profile/${lead?.id}`)
                              }
                            >
                              {lead?.name}
                            </span>
                          </div>
                          <div className='text-sm text-gray-500'>
                            {lead?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {lead.company_name}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {lead.city_name}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-green-100 text-green-800'>
                        {lead.service_categories}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {lead.budget}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-blue-100 text-blue-800'>
                        {lead.feedback.length > 30
                          ? `${lead.feedback.substring(0, 30)}...`
                          : lead.feedback}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDashboard;
