/** @format */

import React, {useState} from "react";

const HistoryAndTask = () => {
  const [tabSelect, setTabSelect] = useState("history");
  const [openNoteId, setOpenNoteId] = useState(null);

  const toggleNote = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  const callLogs = [
    {
      id: 1,
      call_type: "Incoming",
      time: "2025-06-05 14:32",
      name: "Akshay Mishra",
      note: "Asked about service pricing",
    },
    {
      id: 2,
      call_type: "Missed",
      time: "2025-06-05 11:10",
      name: "Riya Sharma",
      note: "No response, voicemail left",
    },
    {
      id: 3,
      call_type: "Outgoing",
      time: "2025-06-04 17:45",
      name: "Karan Verma",
      note: "Follow-up regarding demo session",
    },
  ];

  return (
    <div className='p-4'>
      <div className='flex gap-4 mb-4'>
        <button
          onClick={() => setTabSelect("history")}
          className={`px-4 py-2 ${
            tabSelect === "history" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          History
        </button>
        <button
          onClick={() => setTabSelect("task")}
          className={`px-4 py-2 ${
            tabSelect === "task" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Task
        </button>
      </div>

      <div>
        {tabSelect === "history" && (
          <div className='space-y-4'>
            {callLogs.map((log) => (
              <div key={log.id}>
                {/* Main Call Log Card */}
                <div
                  className='flex justify-between items-center p-4 border rounded shadow bg-white cursor-pointer hover:bg-gray-50 transition'
                  onClick={() => toggleNote(log.id)}
                >
                  <div>
                    <p className='font-semibold text-gray-800'>{log.name}</p>
                    <p className='text-sm text-gray-500'>
                      {log.call_type} • {log.time}
                    </p>
                  </div>
                  <div className='text-xs text-purple-600 font-medium'>
                    {openNoteId === log.id ? "Hide Note" : "View Note"}
                  </div>
                </div>

                {/* Note Section */}
                {openNoteId === log.id && (
                  <div className='mt-2 ml-4 mr-4 text-sm text-gray-600 bg-gray-100 rounded p-3 transition'>
                    {log.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tabSelect === "task" && <div>Showing Task Content</div>}
      </div>
    </div>
  );
};

export default HistoryAndTask;
