/** @format */

// /** @format */

// import {useEffect} from "react";
// import {useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {getCallsByLead} from "../redux/slice/call.slice";

// const HistoryAndTask = ({id}) => {
//   const dispatch = useDispatch();

//   const [tabSelect, setTabSelect] = useState("history");
//   const [openNoteId, setOpenNoteId] = useState(null);

//   const toggleNote = (id) => {
//     setOpenNoteId(openNoteId === id ? null : id);
//   };

//   useEffect(() => {
//     if (id) {
//       dispatch(getCallsByLead(id));
//     }
//   }, [id]);

//   const {LeadFollowUps} = useSelector((state) => state.followup);
//   const {allCallsByLead} = useSelector((state) => state.call);
//   console.log("allCallsByLead", allCallsByLead);

//   const callLogs = [
//     {
//       id: 1,
//       call_type: "Incoming",
//       time: "2025-06-05 14:32",
//       name: "Akshay Mishra",
//       note: "Asked about service pricing",
//     },
//     {
//       id: 2,
//       call_type: "Missed",
//       time: "2025-06-05 11:10",
//       name: "Riya Sharma",
//       note: "No response, voicemail left",
//     },
//     {
//       id: 3,
//       call_type: "Outgoing",
//       time: "2025-06-04 17:45",
//       name: "Karan Verma",
//       note: "Follow-up regarding demo session",
//     },
//     {
//       id: 1,
//       call_type: "Incoming",
//       time: "2025-06-05 14:32",
//       name: "Akshay Mishra",
//       note: "Asked about service pricing",
//     },
//     {
//       id: 2,
//       call_type: "Missed",
//       time: "2025-06-05 11:10",
//       name: "Riya Sharma",
//       note: "No response, voicemail left",
//     },
//     {
//       id: 3,
//       call_type: "Outgoing",
//       time: "2025-06-04 17:45",
//       name: "Karan Verma",
//       note: "Follow-up regarding demo session",
//     },
//   ];

//   return (
//     <div className='p-4'>
//       <div className='flex gap-4 mb-4'>
//         <button
//           onClick={() => setTabSelect("history")}
//           className={`px-4 py-2 ${
//             tabSelect === "history" ? "border-b-2 border-blue-500" : ""
//           }`}
//         >
//           History
//         </button>
//         <button
//           onClick={() => setTabSelect("task")}
//           className={`px-4 py-2 ${
//             tabSelect === "task" ? "border-b-2 border-blue-500" : ""
//           }`}
//         >
//           Task
//         </button>
//         <button
//           onClick={() => setTabSelect("followup")}
//           className={`px-4 py-2 ${
//             tabSelect === "followup" ? "border-b-2 border-blue-500" : ""
//           }`}
//         >
//           Followups
//         </button>
//       </div>

//       <div>
//         {tabSelect === "history" && (
//           <div className='space-y-4'>
//             {callLogs.map((log) => (
//               <div key={log.id}>
//                 {/* Main Call Log Card */}
//                 <div
//                   className='flex justify-between items-center p-4 border rounded shadow bg-white cursor-pointer hover:bg-gray-50 transition'
//                   onClick={() => toggleNote(log.id)}
//                 >
//                   <div>
//                     <p className='font-semibold text-gray-800'>{log.name}</p>
//                     <p className='text-sm text-gray-500'>
//                       {log.call_type} • {log.time}
//                     </p>
//                   </div>
//                   <div className='text-xs text-purple-600 font-medium'>
//                     {openNoteId === log.id ? "Hide Note" : "View Note"}
//                   </div>
//                 </div>

//                 {/* Note Section */}
//                 {openNoteId === log.id && (
//                   <div className='mt-2 ml-4 mr-4 text-sm text-gray-600 bg-gray-100 rounded p-3 transition'>
//                     {log.note}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//         {tabSelect === "task" && <div>Showing Task Content</div>}
//         {tabSelect === "followup" && (
//           <div className='p-4 bg-white rounded-lg shadow-sm'>
//             <h3 className='text-lg font-semibold text-gray-800 mb-4'>
//               Followup History
//             </h3>

//             {LeadFollowUps.length > 0 ? (
//               <div className='space-y-3'>
//                 {LeadFollowUps.map((followup) => (
//                   <div
//                     key={followup.id}
//                     className='p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors'
//                   >
//                     <div className='flex items-center justify-between'>
//                       <div className='flex items-center space-x-2'>
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full ${
//                             followup.FollowupType === "15m"
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {followup.FollowupType}
//                         </span>
//                         <span className='text-sm text-gray-500'>
//                           {new Date(followup.createdAt).toLocaleString()}
//                         </span>
//                       </div>
//                       <span className='text-xs text-gray-400'>
//                         ID: {followup.id}
//                       </span>
//                     </div>
//                     <div className='mt-1 text-sm text-gray-600'>
//                       Created by: User {followup.createdBy}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className='text-gray-500 text-sm py-4'>
//                 No followups recorded yet
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HistoryAndTask;

/** @format */

import {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCallsByLead} from "../redux/slice/call.slice";

const HistoryAndTask = ({id}) => {
  const dispatch = useDispatch();

  const [tabSelect, setTabSelect] = useState("history");
  const [openNoteId, setOpenNoteId] = useState(null);

  const toggleNote = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  useEffect(() => {
    if (id) {
      dispatch(getCallsByLead(id));
    }
  }, [id]);

  const {LeadFollowUps} = useSelector((state) => state.followup);
  const {allCallsByLead} = useSelector((state) => state.call);
  console.log("allCallsByLead", allCallsByLead);

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
        <button
          onClick={() => setTabSelect("followup")}
          className={`px-4 py-2 ${
            tabSelect === "followup" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Followups
        </button>
      </div>

      <div>
        {tabSelect === "history" && (
          <div className='space-y-4'>
            {allCallsByLead?.map((call) => (
              <div key={call.id}>
                {/* Main Call Log Card */}
                <div
                  className='flex justify-between items-center p-4 border rounded shadow bg-white cursor-pointer hover:bg-gray-50 transition'
                  onClick={() => toggleNote(call.id)}
                >
                  <div>
                    <p className='font-semibold text-gray-800'>
                      {call.caller.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {call.status} •{" "}
                      {new Date(call.call_time).toLocaleString()}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      Campaign: {call.campaign.name}
                    </p>
                  </div>
                  <div className='text-xs text-purple-600 font-medium'>
                    {openNoteId === call.id ? "Hide Note" : "View Note"}
                  </div>
                </div>

                {/* Note Section */}
                {openNoteId === call.id && (
                  <div className='mt-2 ml-4 mr-4 text-sm text-gray-600 bg-gray-100 rounded p-3 transition'>
                    <p className='font-medium'>Call Notes:</p>
                    <p>{call.notes}</p>
                    <div className='mt-2 text-xs text-gray-500'>
                      <p>Start Time: {call.start_time}</p>
                      <p>Call ID: {call.id}</p>
                      <p>
                        Created: {new Date(call.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tabSelect === "task" && <div>Showing Task Content</div>}
        {tabSelect === "followup" && (
          <div className='p-4 bg-white rounded-lg shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Followup History
            </h3>

            {LeadFollowUps.length > 0 ? (
              <div className='space-y-3'>
                {LeadFollowUps.map((followup) => (
                  <div
                    key={followup.id}
                    className='p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            followup.FollowupType === "15m"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {followup.FollowupType}
                        </span>
                        <span className='text-sm text-gray-500'>
                          {new Date(followup.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <span className='text-xs text-gray-400'>
                        ID: {followup.id}
                      </span>
                    </div>
                    <div className='mt-1 text-sm text-gray-600'>
                      Created by: User {followup.createdBy}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-sm py-4'>
                No followups recorded yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryAndTask;
