// /** @format */

// import React, {useEffect, useState} from "react";
// import {
//   FiSearch,
//   FiPhone,
//   FiMail,
//   FiUser,
//   FiEye,
//   FiEdit2,
//   FiTrash2,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";
// import {useNavigate} from "react-router-dom";

// const LeadSearchComponent = ({
//   leads,
//   searchValue,
//   setSearchValue,
//   searchType,
//   setSearchType,
//   selectedLead,
//   setSelectedLead,
//   expandedRows,
//   toggleRowExpand,
//   formatDate,
// }) => {
//   const handlePhoneInput = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value) || value === "") {
//       setSearchValue(value);
//     }
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedLead) {
//       navigate(`/search?user_Id=${selectedLead.id}`);
//     }
//   }, [selectedLead]);

//   console.log("yesh wala", selectedLead);

//   return (
//     <div className='w-full lg:w-2/5 border-r overflow-y-auto'>
//       <div className='p-4 sticky top-0 '>
//         <h1 className='text-xl font-semibold text-gray-800 mb-2'>
//           Search leads
//         </h1>
//         <p className='text-sm text-gray-500 mb-4'>
//           Search for a lead's name, phone or other details
//         </p>

//         <div className='flex space-x-2 mb-4'>
//           <button
//             onClick={() => setSearchType("auto")}
//             className={`flex items-center px-3 py-1 text-sm rounded-md ${
//               searchType === "auto"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             <FiSearch className='mr-1' /> Auto
//           </button>
//           <button
//             onClick={() => setSearchType("phone")}
//             className={`flex items-center px-3 py-1 text-sm rounded-md ${
//               searchType === "phone"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             <FiPhone className='mr-1' /> Phone
//           </button>
//           <button
//             onClick={() => setSearchType("name")}
//             className={`flex items-center px-3 py-1 text-sm rounded-md ${
//               searchType === "name"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             <FiUser className='mr-1' /> Name
//           </button>
//           <button
//             onClick={() => setSearchType("email")}
//             className={`flex items-center px-3 py-1 text-sm rounded-md ${
//               searchType === "email"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             <FiMail className='mr-1' /> Email
//           </button>
//         </div>

//         <div className='relative'>
//           <input
//             type={searchType === "phone" ? "tel" : "text"}
//             placeholder={
//               searchType === "phone"
//                 ? "Enter phone number"
//                 : searchType === "email"
//                 ? "Enter email address"
//                 : searchType === "name"
//                 ? "Enter name"
//                 : "Enter search value"
//             }
//             className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
//             value={searchValue}
//             onChange={
//               searchType === "phone"
//                 ? handlePhoneInput
//                 : (e) => setSearchValue(e.target.value)
//             }
//           />
//           <div className={`absolute top-3 left-3`}>
//             {searchType === "phone" ? (
//               <FiPhone className='text-gray-400' />
//             ) : (
//               <FiSearch className='text-gray-400' />
//             )}
//           </div>
//           {searchValue && (
//             <button
//               onClick={() => setSearchValue("")}
//               className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Leads List */}
//       <div className='divide-y divide-gray-200'>
//         {leads.length > 0 ? (
//           leads.map((lead) => (
//             <div
//               key={lead.id}
//               className={`p-4 hover:bg-gray-50 cursor-pointer ${
//                 selectedLead?.id === lead.id ? "bg-blue-50" : ""
//               }`}
//               onClick={() => setSelectedLead(lead)}
//             >
//               <div className='flex justify-between items-start'>
//                 <div className='flex items-start space-x-3'>
//                   <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold'>
//                     {lead.name.charAt(0)}
//                   </div>
//                   <div>
//                     <div className='text-sm font-medium text-gray-900'>
//                       {lead.name}
//                     </div>
//                     <div className='text-sm text-gray-500'>
//                       {lead.company_name}
//                     </div>
//                     <div className='flex items-center mt-1 text-sm text-gray-500'>
//                       <FiPhone className='mr-1' size={12} /> {lead.phone}
//                     </div>
//                   </div>
//                 </div>
//                 <div className='text-xs text-gray-500'>
//                   {formatDate(lead.createdAt)}
//                 </div>
//               </div>

//               <div className='mt-2 flex justify-between items-center'>
//                 <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
//                   {lead.source}
//                 </span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleRowExpand(lead.id);
//                   }}
//                   className='text-blue-500 text-sm flex items-center'
//                 >
//                   {expandedRows[lead.id] ? (
//                     <>
//                       <span>Less info</span> <FiChevronUp className='ml-1' />
//                     </>
//                   ) : (
//                     <>
//                       {/* <span>More info</span> <FiChevronDown className='ml-1' /> */}
//                     </>
//                   )}
//                 </button>
//               </div>

//               {expandedRows[lead.id] && (
//                 <div className='mt-3 pl-13 pt-2 border-t border-gray-100'>
//                   <div className='grid grid-cols-2 gap-2 text-sm'>
//                     <div>
//                       <span className='text-gray-500'>Email:</span> {lead.email}
//                     </div>
//                     <div>
//                       <span className='text-gray-500'>City:</span>{" "}
//                       {lead.city_name}
//                     </div>
//                     <div>
//                       <span className='text-gray-500'>Services:</span>{" "}
//                       {lead.service_categories}
//                     </div>
//                     <div>
//                       <span className='text-gray-500'>Budget:</span>{" "}
//                       {lead.budget}
//                     </div>
//                   </div>
//                   <div className='mt-2 flex space-x-2'>
//                     <button className='flex items-center text-blue-500 text-sm'>
//                       <FiEye className='mr-1' /> View
//                     </button>
//                     <button className='flex items-center text-green-500 text-sm'>
//                       <FiEdit2 className='mr-1' /> Edit
//                     </button>
//                     <button className='flex items-center text-red-500 text-sm'>
//                       <FiTrash2 className='mr-1' /> Delete
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className='p-8 text-center'>
//             <div className='text-gray-400 mb-2'>No leads found</div>
//             <div className='text-sm text-gray-500'>
//               Try changing your search criteria
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeadSearchComponent;



/** @format */
import React, { useEffect } from "react";
import {
  FiSearch,
  FiPhone,
  FiMail,
  FiUser,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LeadSearchComponent = ({
  leads,
  searchValue,
  setSearchValue,
  searchType,
  setSearchType,
  selectedLead,
  setSelectedLead,
  expandedRows,
  toggleRowExpand,
  formatDate,
}) => {
  const handlePhoneInput = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setSearchValue(value);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLead) {
      navigate(`/search?user_Id=${selectedLead.id}`);
    }
  }, [selectedLead]);

  return (
    <div className="w-full lg:w-2/5 border-r border-gray-200 overflow-y-auto ">
      {/* Search Header */}
      <div className="sticky top-0 p-3 border-b border-gray-200">
        <h1 className="text-lg font-medium text-gray-900">Search Leads</h1>
        <p className="text-xs text-gray-500 mt-1">
          Find leads by name, phone, or email
        </p>

        {/* Search Type Tabs */}
        <div className="flex space-x-1 mt-3">
          {[
            { type: "auto", icon: <FiSearch size={14} />, label: "Auto" },
            { type: "phone", icon: <FiPhone size={14} />, label: "Phone" },
            { type: "name", icon: <FiUser size={14} />, label: "Name" },
            { type: "email", icon: <FiMail size={14} />, label: "Email" },
          ].map((tab) => (
            <button
              key={tab.type}
              onClick={() => setSearchType(tab.type)}
              className={`flex items-center px-2.5 py-1.5 text-xs rounded ${
                searchType === tab.type
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              <span className="ml-1.5">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <input
            type={searchType === "phone" ? "tel" : "text"}
            placeholder={
              searchType === "phone"
                ? "Search by phone..."
                : searchType === "email"
                ? "Search by email..."
                : searchType === "name"
                ? "Search by name..."
                : "Search leads..."
            }
            className="w-full p-2 pl-8 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={searchValue}
            onChange={
              searchType === "phone"
                ? handlePhoneInput
                : (e) => setSearchValue(e.target.value)
            }
          />
          <div className="absolute left-2 top-2.5 text-gray-400">
            {searchType === "phone" ? (
              <FiPhone size={14} />
            ) : (
              <FiSearch size={14} />
            )}
          </div>
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Leads List */}
      <div className="divide-y divide-gray-200">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div
              key={lead.id}
              className={`p-2.5 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedLead?.id === lead.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium mr-2.5 mt-0.5">
                  {lead.name.charAt(0).toUpperCase()}
                </div>

                {/* Lead Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {lead.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {lead.company_name}
                  </p>
                  <div className="flex items-center mt-0.5 text-xs text-gray-500">
                    <FiPhone className="mr-1" size={12} />
                    <span>{lead.phone}</span>
                  </div>

                  {/* Tags and Actions */}
                  <div className="flex justify-between items-center mt-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {lead.source}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpand(lead.id);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {expandedRows[lead.id] ? (
                        <>
                          <span>Less</span>
                          <FiChevronUp className="ml-0.5" size={14} />
                        </>
                      ) : (
                        <>
                          <span>More</span>
                          <FiChevronDown className="ml-0.5" size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Info */}
                  {expandedRows[lead.id] && (
                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs">
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                        <div className="truncate">
                          <span className="text-gray-500">Email:</span>{" "}
                          <span className="text-gray-700">{lead.email}</span>
                        </div>
                        <div className="truncate">
                          <span className="text-gray-500">City:</span>{" "}
                          <span className="text-gray-700">{lead.city_name}</span>
                        </div>
                        <div className="truncate">
                          <span className="text-gray-500">Services:</span>{" "}
                          <span className="text-gray-700">
                            {lead.service_categories}
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-gray-500">Budget:</span>{" "}
                          <span className="text-gray-700">{lead.budget}</span>
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-2">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center text-xs">
                          <FiEye className="mr-1" size={12} /> View
                        </button>
                        <button className="text-green-600 hover:text-green-800 flex items-center text-xs">
                          <FiEdit2 className="mr-1" size={12} /> Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 flex items-center text-xs">
                          <FiTrash2 className="mr-1" size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <div className="text-gray-400 text-sm mb-1">No leads found</div>
            <div className="text-xs text-gray-500">
              Adjust your search criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadSearchComponent;