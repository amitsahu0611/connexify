/** @format */

import React, {useState} from "react";

const dummyLeads = [
  {
    id: 8,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    source: "Website",
    division: "North",
    createdDate: "2025-05-01",
  },
  {
    id: 9,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "0987654321",
    source: "Referral",
    division: "South",
    createdDate: "2025-04-20",
  },
  {
    id: 10,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "1112223333",
    source: "Email",
    division: "East",
    createdDate: "2025-05-15",
  },
];

const dummyAssignees = [
  {id: 3, name: "Manager One", createdDate: "2025-04-15"},
  {id: 4, name: "Manager Two", createdDate: "2025-03-28"},
];

const CreateCampaign = () => {
  const [form, setForm] = useState({
    workspace_id: 1,
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_active: true,
    leadIds: [],
    assigneeIds: [],
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [assigneeModalOpen, setAssigneeModalOpen] = useState(false);
  const [leadDateFilter, setLeadDateFilter] = useState("");
  const [assigneeDateFilter, setAssigneeDateFilter] = useState("");

  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectLead = (id) => {
    setForm((prev) => ({
      ...prev,
      leadIds: prev.leadIds.includes(id)
        ? prev.leadIds.filter((lid) => lid !== id)
        : [...prev.leadIds, id],
    }));
  };

  const handleSelectAssignee = (id) => {
    setForm((prev) => ({
      ...prev,
      assigneeIds: prev.assigneeIds.includes(id)
        ? prev.assigneeIds.filter((aid) => aid !== id)
        : [...prev.assigneeIds, id],
    }));
  };

  const filteredLeads = dummyLeads.filter((lead) =>
    leadDateFilter ? lead.createdDate >= leadDateFilter : true
  );

  const filteredAssignees = dummyAssignees.filter((a) =>
    assigneeDateFilter ? a.createdDate >= assigneeDateFilter : true
  );

  return (
    <div className='w-full mx-auto p-6 bg-white rounded-xl shadow-sm'>
      <h2 className='text-2xl font-semibold mb-4'>Create Campaign</h2>
      <div className='space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Campaign Name'
          value={form.name}
          onChange={handleInputChange}
          className='w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400'
        />
        <textarea
          name='description'
          placeholder='Description'
          value={form.description}
          onChange={handleInputChange}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400'
        />
        <div className='flex gap-4'>
          <input
            type='date'
            name='start_date'
            value={form.start_date}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <input
            type='date'
            name='end_date'
            value={form.end_date}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
        </div>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            name='is_active'
            checked={form.is_active}
            onChange={handleInputChange}
            className='mr-2'
          />
          Active
        </label>
        <div className='flex gap-4'>
          <button
            onClick={() => setLeadModalOpen(true)}
            className='flex-1 border border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-900 hover:text-white'
          >
            Select Leads ({form.leadIds.length})
          </button>
          <button
            onClick={() => setAssigneeModalOpen(true)}
            className='flex-1 border border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-900 hover:text-white'
          >
            Select Assignees ({form.assigneeIds.length})
          </button>
        </div>
      </div>

      {/* Custom Lead Modal */}
      {leadModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-3xl p-6 rounded-lg shadow-xl'>
            <div className='text-xl font-semibold mb-4'>Select Leads</div>
            <input
              type='date'
              className='mb-4 border rounded px-3 py-2'
              value={leadDateFilter}
              onChange={(e) => setLeadDateFilter(e.target.value)}
            />
            <div className='space-y-2 max-h-80 overflow-y-auto'>
              {filteredLeads.map((lead) => (
                <label
                  key={lead.id}
                  className='flex items-center border p-2 rounded-lg cursor-pointer hover:bg-gray-50'
                >
                  <input
                    type='checkbox'
                    checked={form.leadIds.includes(lead.id)}
                    onChange={() => handleSelectLead(lead.id)}
                    className='mr-3'
                  />
                  <div>
                    <p className='font-medium'>{lead.name}</p>
                    <p className='text-sm text-gray-500'>
                      {lead.email} | {lead.phone}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {lead.source} - {lead.division}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <div className='mt-4 text-right'>
              <button
                onClick={() => setLeadModalOpen(false)}
                className='px-4 py-2 border rounded hover:bg-gray-100'
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Assignee Modal */}
      {assigneeModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-xl p-6 rounded-lg shadow-xl'>
            <div className='text-xl font-semibold mb-4'>Select Assignees</div>
            <input
              type='date'
              className='mb-4 border rounded px-3 py-2'
              value={assigneeDateFilter}
              onChange={(e) => setAssigneeDateFilter(e.target.value)}
            />
            <div className='space-y-2 max-h-64 overflow-y-auto'>
              {filteredAssignees.map((a) => (
                <label
                  key={a.id}
                  className='flex items-center border p-2 rounded-lg cursor-pointer hover:bg-gray-50'
                >
                  <input
                    type='checkbox'
                    checked={form.assigneeIds.includes(a.id)}
                    onChange={() => handleSelectAssignee(a.id)}
                    className='mr-3'
                  />
                  <div>
                    <p className='font-medium'>{a.name}</p>
                    <p className='text-sm text-gray-500'>
                      Created: {(new Date(a.createdDate), "yyyy-MM-dd")}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            <div className='mt-4 text-right'>
              <button
                onClick={() => setAssigneeModalOpen(false)}
                className='px-4 py-2 border rounded hover:bg-gray-100'
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
