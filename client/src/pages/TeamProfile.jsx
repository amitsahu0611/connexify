
// import React, {useEffect, useState} from "react";
// import {useNavigate, useParams, useSearchParams} from "react-router-dom";
// import {getUserById} from "../redux/slice/TeamSlice";
// import {
//   AtSign,
//   AtSignIcon,
//   BuildingIcon,
//   CalendarIcon,
//   DollarSignIcon,
//   Flag,
//   HistoryIcon,
//   LandmarkIcon,
//   ListChecksIcon,
//   MessageCircle,
//   MessageCircleCode,
//   MessageSquareIcon,
//   Notebook,
//   Pencil,
//   PhoneCall,
//   PhoneCallIcon,
//   PhoneIcon,
//   PhoneIncomingIcon,
//   SmartphoneIcon,
//   Timer,
//   UserIcon,
//   X,
//   Save,
//   XCircle,
// } from "lucide-react";
// import {useDispatch, useSelector} from "react-redux";
// import {bluebutton, container} from "../styles/Csstyles";
// import {
//   Copy,
//   MoreHorizontal,
//   Slash,
//   SlashIcon,
//   Trash2,
//   Trash2Icon,
// } from "lucide-react";
// import {FaPhone, FaWhatsapp} from "react-icons/fa";
// import HistoryAndTask from "../components/HistoryAndTask";
// import {getLeadById} from "../redux/slice/Lead.slice";
// import {
//   createFollowup,
//   getFollowupByLeadId,
// } from "../redux/slice/Followup.slice";
// import {showSuccess} from "../utils/config";
// import moment from "moment/moment";

// const TeamProfile = ({lead}) => {
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {user_id} = useParams();
//   const users_id = user_id || searchParams.get("user_Id");
//   const {leadDetail, leadLoading} = useSelector((state) => state.lead);
//   const [open, setOpen] = useState(false);
//   const [showMore, setShowMore] = useState(false);
//   const [selectTab, setSelectTab] = useState();
//   const [selected, setSelected] = useState("5m");
//   const [customDate, setCustomDate] = useState("");
//   const [isEdit, setIsEdit] = useState(false);
//   const [originalData, setOriginalData] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     source: "",
//     serviceCategories: "",
//     budget: "",
//     status: "",
//     email: "",
//     alternatePhone: "",
//     cityName: "",
//     companyName: "",
//     feedback: "",
//     requirements: "",
//     CreatedAt: null,
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({...prev, [field]: value}));
//   };

//   useEffect(() => {
//     if (leadDetail) {
//       const initialData = {
//         name: leadDetail?.name || "-",
//         phone: leadDetail?.phone || "-",
//         source: leadDetail?.source || "-",
//         serviceCategories: leadDetail?.service_categories || "-",
//         budget: leadDetail?.budget || "-",
//         email: leadDetail?.email || "-",
//         alternatePhone: leadDetail?.alternate_phone || "-",
//         cityName: leadDetail?.city_name || "-",
//         companyName: leadDetail?.company_name || "-",
//         feedback: leadDetail?.feedback || "-",
//         requirements: leadDetail?.requirements || "-",
//         CreatedAt: leadDetail?.createdAt || "-",
//         status: leadDetail?.status || "-",
//       };
//       setFormData(initialData);
//       setOriginalData(initialData);
//     }
//   }, [leadDetail]);

//   useEffect(() => {
//     if (users_id) {
//       dispatch(getLeadById(users_id));
//       dispatch(getFollowupByLeadId(users_id));
//     }
//   }, [users_id]);

//   const toggleDropdown = () => {
//     setOpen(!open);
//   };

//   const handleEditToggle = () => {
//     setIsEdit(!isEdit);
//     setOpen(false);
//   };

//   const handleCancelEdit = () => {
//     setIsEdit(false);
//     if (originalData) {
//       setFormData(originalData);
//     }
//   };

//   const handleSaveLead = async () => {
//     try {
//       const updatedData = {
//         id: users_id,
//         data: {
//           name: formData.name,
//           phone: formData.phone,
//           source: formData.source,
//           service_categories: formData.serviceCategories,
//           budget: formData.budget,
//           email: formData.email,
//           alternate_phone: formData.alternatePhone,
//           city_name: formData.cityName,
//           company_name: formData.companyName,
//           feedback: formData.feedback,
//           requirements: formData.requirements,
//           status: formData.status,
//         },
//       };

//       // await dispatch(updateLead(updatedData));
//       console.log("updatedData", updatedData);
//       return;
//       showSuccess("Lead updated successfully");
//       setIsEdit(false);
//       dispatch(getLeadById(users_id)); // Refresh lead data
//     } catch (error) {
//       console.error("Error updating lead:", error);
//     }
//   };

//   const createFollowupFunc = async () => {
//     const FollowupType = customDate ? JSON.stringify(customDate) : selected;
//     const Lead_id = users_id;
//     const createdBy = JSON.parse(localStorage.getItem("userData"))?.user_id;
//     const followup = {
//       FollowupType,
//       Lead_id: parseInt(Lead_id),
//       createdBy,
//     };
//     if (Object.keys(followup).length == 3) {
//       const data = await dispatch(createFollowup(followup));
//       if (data?.payload?.status == 1) {
//         showSuccess("Followup Created Successfully");
//       }
//     }
//   };

//   useEffect(() => {
//     if (selected == "5m" || selected == "15min" || selected == "1h") {
//       setCustomDate("");
//     }
//   }, [selected]);

//   const InputItem = ({icon, label, value, onChange, fieldName, isEdit}) => (
//     <div className='flex flex-col'>
//       <label className='text-sm text-gray-500 mb-1 flex flex-row gap-2 items-center'>
//         {icon} {label}
//       </label>
//       {isEdit ? (
//         <input
//           type='text'
//           value={value}
//           onChange={(e) => onChange(fieldName, e.target.value)}
//           className='border-b-2 border-r-2 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-300'
//         />
//       ) : (
//         <div className='border-b-2 border-r-2 p-2 text-sm'>{value}</div>
//       )}
//     </div>
//   );

//   const ActionButton = ({disable = false, icon, text}) => {
//     const isSelected = selectTab === text;

//     return (
//       <button
//         disabled={disable}
//         onClick={() => !disable && setSelectTab(text)}
//         className={`flex flex-row items-center gap-3 justify-center w-[10rem] text-sm px-4 py-2 rounded-md transition
//         ${
//           disable
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : isSelected
//             ? "bg-blue-600 text-white"
//             : "bg-gray-100 hover:bg-gray-300 text-gray-800"
//         }`}
//       >
//         {icon}
//         {text}
//       </button>
//     );
//   };

//   return (
//     <>
//       {users_id ? (
//         <div style={{backgroundColor: "#F7F7F7"}} className={container}>
//           <div className='flex flex-row justify-between'>
//             <div>
//               <div className='font-[12px]'>{formData?.name}</div>
//               <span className='text-green-600 text-sm'>{formData?.status}</span>
//             </div>
//             <div>
//               <div className='flex flex-row gap-2'>
//                 {isEdit ? (
//                   <>
//                     <button
//                       onClick={handleSaveLead}
//                       className='flex items-center justify-center p-2 text-white bg-green-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
//                       title='Save Changes'
//                     >
//                       <Save size={18} />
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className='flex items-center justify-center p-2 text-white bg-red-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
//                       title='Cancel Edit'
//                     >
//                       <XCircle size={18} />
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() =>
//                       navigate(`/lead/campaigns?lead_id=${leadDetail?.id}`)
//                     }
//                     className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-green-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
//                   >
//                     <AtSign />
//                   </button>
//                 )}

//                 <button
//                   onClick={toggleDropdown}
//                   className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-gray-700 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
//                 >
//                   {open ? <X /> : <MoreHorizontal />}
//                 </button>
//               </div>

//               {open && (
//                 <div className='absolute right-0 z-10 w-48 mt-2 bg-white border rounded shadow-lg'>
//                   <ul className='py-1'>
//                     <li
//                       onClick={handleEditToggle}
//                       className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
//                     >
//                       <Pencil className='w-4 h-4 mr-2' />{" "}
//                       {isEdit ? "Cancel Edit" : "Edit Lead"}
//                     </li>
//                     <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
//                       <Copy className='w-4 h-4 mr-2' /> Copy Lead Link
//                     </li>
//                     <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
//                       <Trash2Icon className='w-4 h-4 mr-2' /> Delete lead
//                     </li>
//                     <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
//                       <SlashIcon className='w-4 h-4 mr-2' /> Block lead
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className='bg-white mx-auto mt-8 p-6 border-t'>
//             <div>
//               <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
//                 <InputItem
//                   icon={<PhoneCallIcon size={15} />}
//                   label='Phone'
//                   value={formData?.phone}
//                   onChange={handleChange}
//                   fieldName='phone'
//                 />
//                 <InputItem
//                   icon={<LandmarkIcon size={15} />}
//                   label='Source'
//                   value={formData.source}
//                   onChange={handleChange}
//                   fieldName='source'
//                 />
//                 <InputItem
//                   icon={<ListChecksIcon size={15} />}
//                   label='Service Categories'
//                   value={formData.serviceCategories}
//                   onChange={handleChange}
//                   fieldName='serviceCategories'
//                 />
//                 <InputItem
//                   icon={<DollarSignIcon size={15} />}
//                   label='Budget'
//                   value={formData.budget}
//                   onChange={handleChange}
//                   fieldName='budget'
//                 />
//                 <InputItem
//                   icon={<AtSignIcon size={15} />}
//                   label='Email'
//                   value={formData.email}
//                   onChange={handleChange}
//                   fieldName='email'
//                 />
//                 <InputItem
//                   icon={<SmartphoneIcon size={15} />}
//                   label='Alternate Phone'
//                   value={formData.alternatePhone}
//                   onChange={handleChange}
//                   fieldName='alternatePhone'
//                 />
//               </div>
//               {/* Expandable Fields */}
//               {showMore && (
//                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
//                   <InputItem
//                     icon={<UserIcon size={15} />}
//                     label='Name'
//                     value={formData.name}
//                     onChange={handleChange}
//                     fieldName='name'
//                   />
//                   <InputItem
//                     icon={<BuildingIcon size={15} />}
//                     label='Company Name'
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     fieldName='companyName'
//                   />
//                   <InputItem
//                     icon={<LandmarkIcon size={15} />}
//                     label='City'
//                     value={formData.cityName}
//                     onChange={handleChange}
//                     fieldName='cityName'
//                   />
//                   <InputItem
//                     icon={<MessageSquareIcon size={15} />}
//                     label='Feedback'
//                     value={formData.feedback}
//                     onChange={handleChange}
//                     fieldName='feedback'
//                   />
//                   <InputItem
//                     icon={<CalendarIcon size={15} />}
//                     label='Created On'
//                     value={moment(formData?.CreatedAt).format("DD MMM YYYY")}
//                     readOnly
//                   />
//                 </div>
//               )}
//             </div>
//             {/* Toggle Button */}
//             <div className='text-center mt-4'>
//               <button
//                 onClick={() => setShowMore(!showMore)}
//                 className='text-blue-600 hover:underline text-sm font-medium'
//               >
//                 {showMore ? "Show Less" : "Show All Fields"}
//               </button>
//             </div>
//             {/* Created Date */}
//             <div className='text-right text-xs text-gray-500 mt-2'>
//               Created: {moment(formData?.CreatedAt).fromNow()}
//             </div>
//             {/* Action Buttons */}
//             <div className='flex justify-around mt-6 flex-wrap gap-2'>
//               <ActionButton
//                 disable={true}
//                 icon={<PhoneIcon size={15} />}
//                 text='CALL'
//               />
//               <ActionButton
//                 disable={!isEdit}
//                 icon={<Timer size={15} />}
//                 text='CALL LATER'
//               />
//               <ActionButton
//                 disable={true}
//                 icon={<FaWhatsapp size={15} />}
//                 text='WHATSAPP'
//               />
//               <ActionButton
//                 disable={true}
//                 icon={<MessageCircleCode size={15} />}
//                 text='SMS'
//               />
//               <ActionButton
//                 disable={!isEdit}
//                 icon={<Notebook size={15} />}
//                 text='ADD NOTE'
//               />
//             </div>
//             <hr className='my-10' />
//             {selectTab == "CALL LATER" && (
//               <div>
//                 <div className='flex flex-row items-center'>
//                   Create Followup for: <Flag className='ml-3' />
//                 </div>
//                 <div className='flex flex-row mt-6 items-center gap-2'>
//                   <span>In:</span>
//                   <button
//                     className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
//                       selected === "5m" ? "bg-gray-600 text-white" : ""
//                     }`}
//                     onClick={() => setSelected("5m")}
//                   >
//                     5 min
//                   </button>
//                   <button
//                     className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
//                       selected === "15m" ? "bg-gray-600 text-white" : ""
//                     }`}
//                     onClick={() => setSelected("15m")}
//                   >
//                     15 min
//                   </button>
//                   <button
//                     className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
//                       selected === "1h" ? "bg-gray-600 text-white" : ""
//                     }`}
//                     onClick={() => setSelected("1h")}
//                   >
//                     1 hr
//                   </button>
//                   <button
//                     className={`border w-[6rem] ml-2 py-1 rounded text-sm ${
//                       selected === "custom" ? "bg-gray-600 text-white" : ""
//                     }`}
//                     onClick={() => setSelected("custom")}
//                   >
//                     Custom
//                   </button>
//                   {selected === "custom" && (
//                     <input
//                       type='datetime-local'
//                       value={customDate}
//                       onChange={(e) => setCustomDate(e.target.value)}
//                       className='ml-2 border rounded py-1 px-2 text-sm'
//                     />
//                   )}
//                 </div>
//                 <button
//                   onClick={createFollowupFunc}
//                   className={`mt-3 ${bluebutton}`}
//                 >
//                   Create
//                 </button>
//               </div>
//             )}
//             {selectTab === "ADD NOTE" && (
//               <textarea
//                 className='w-full p-2 border rounded-md mt-2'
//                 placeholder='Write your note here...'
//                 rows={4}
//               />
//             )}
//             {selectTab && (
//               <button
//                 onClick={() => setSelectTab()}
//                 className='border-b mt-3 text-sm text-blue-600'
//               >
//                 Cancel
//               </button>
//             )}
//             <hr className='my-10' />
//             <HistoryAndTask id={users_id} />
//           </div>
//         </div>
//       ) : (
//         <div className='text-center'>
//           <div className='text-sm font-bold text-gray-400 mb-2'>
//             No Lead Selected
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TeamProfile;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AtSign,
  Building,
  Calendar,
  DollarSign,
  Flag,
  ListChecks,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Notebook,
  Phone,
  PhoneCall,
  Smartphone,
  Timer,
  User,
  X,
  Save,
  XCircle,
  Copy,
  Trash2,
  Slash,
  Pencil,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import HistoryAndTask from "../components/HistoryAndTask";
import { getLeadById } from "../redux/slice/Lead.slice";
import { createFollowup, getFollowupByLeadId } from "../redux/slice/Followup.slice";
import { showSuccess } from "../utils/config";
import moment from "moment";

const TeamProfile = ({ lead }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const users_id = user_id || searchParams.get("user_Id");
  const { leadDetail } = useSelector((state) => state.lead);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectTab, setSelectTab] = useState();
  const [selected, setSelected] = useState("5m");
  const [customDate, setCustomDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "",
    serviceCategories: "",
    budget: "",
    status: "",
    email: "",
    alternatePhone: "",
    cityName: "",
    companyName: "",
    feedback: "",
    requirements: "",
    createdAt: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (leadDetail) {
      const initialData = {
        name: leadDetail?.name || "-",
        phone: leadDetail?.phone || "-",
        source: leadDetail?.source || "-",
        serviceCategories: leadDetail?.service_categories || "-",
        budget: leadDetail?.budget || "-",
        email: leadDetail?.email || "-",
        alternatePhone: leadDetail?.alternate_phone || "-",
        cityName: leadDetail?.city_name || "-",
        companyName: leadDetail?.company_name || "-",
        feedback: leadDetail?.feedback || "-",
        requirements: leadDetail?.requirements || "-",
        createdAt: leadDetail?.createdAt || "-",
        status: leadDetail?.status || "-",
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [leadDetail]);

  useEffect(() => {
    if (users_id) {
      dispatch(getLeadById(users_id));
      dispatch(getFollowupByLeadId(users_id));
    }
  }, [users_id]);

  const toggleDropdown = () => setOpen(!open);
  const handleEditToggle = () => {
    setIsEdit(!isEdit);
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    originalData && setFormData(originalData);
  };

  const handleSaveLead = async () => {
    try {
      const updatedData = {
        id: users_id,
        data: {
          name: formData.name,
          phone: formData.phone,
          source: formData.source,
          service_categories: formData.serviceCategories,
          budget: formData.budget,
          email: formData.email,
          alternate_phone: formData.alternatePhone,
          city_name: formData.cityName,
          company_name: formData.companyName,
          feedback: formData.feedback,
          requirements: formData.requirements,
          status: formData.status,
        },
      };

      // await dispatch(updateLead(updatedData));
      console.log("updatedData", updatedData);
      showSuccess("Lead updated successfully");
      setIsEdit(false);
      dispatch(getLeadById(users_id));
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const createFollowupFunc = async () => {
    const FollowupType = customDate ? JSON.stringify(customDate) : selected;
    const Lead_id = users_id;
    const createdBy = JSON.parse(localStorage.getItem("userData"))?.user_id;
    const followup = {
      FollowupType,
      Lead_id: parseInt(Lead_id),
      createdBy,
    };
    
    if (Object.keys(followup).length === 3) {
      const data = await dispatch(createFollowup(followup));
      if (data?.payload?.status === 1) {
        showSuccess("Followup Created Successfully");
      }
    }
  };

  useEffect(() => {
    if (["5m", "15m", "1h"].includes(selected)) {
      setCustomDate("");
    }
  }, [selected]);

  const InputItem = ({ icon, label, value, name, isEdit }) => (
    <div className="mb-4">
      <label className="flex items-center text-xs text-gray-500 mb-1">
        <span className="mr-2">{icon}</span>
        {label}
      </label>
      {isEdit ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        />
      ) : (
        <div className="w-full p-2 text-sm text-gray-800 bg-gray-50 rounded">
          {value}
        </div>
      )}
    </div>
  );

  const ActionButton = ({ disabled = false, icon, text }) => {
    const isSelected = selectTab === text;
    return (
      <button
        disabled={disabled}
        onClick={() => !disabled && setSelectTab(text)}
        className={`flex items-center justify-center px-3 py-2 text-xs rounded-md transition-colors ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-gray-700 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <span className="mr-1">{icon}</span>
        {text}
      </button>
    );
  };

  if (!users_id) {
    return (
      <div className="flex items-center justify-center p-4 text-sm text-gray-500">
        No Lead Selected
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {formData.name}
            </h1>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {formData.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEdit ? (
              <>
                <button
                  onClick={handleSaveLead}
                  className="p-2 text-white bg-green-600 rounded-full hover:bg-green-700 transition"
                  title="Save Changes"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition"
                  title="Cancel Edit"
                >
                  <XCircle size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(`/lead/campaigns?lead_id=${leadDetail?.id}`)}
                className="p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-full transition"
              >
                <AtSign size={16} />
              </button>
            )}

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 text-gray-600 hover:text-white hover:bg-gray-700 rounded-full transition"
              >
                {open ? <X size={16} /> : <MoreHorizontal size={16} />}
              </button>

              {open && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Pencil size={14} className="mr-2" />
                      {isEdit ? "Cancel Edit" : "Edit Lead"}
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Copy size={14} className="mr-2" />
                      Copy Lead Link
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Trash2 size={14} className="mr-2" />
                      Delete Lead
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Slash size={14} className="mr-2" />
                      Block Lead
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Lead Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputItem
            icon={<PhoneCall size={14} />}
            label="Phone"
            value={formData.phone}
            name="phone"
            isEdit={isEdit}
          />
          <InputItem
            icon={<Building size={14} />}
            label="Source"
            value={formData.source}
            name="source"
            isEdit={isEdit}
          />
          <InputItem
            icon={<ListChecks size={14} />}
            label="Service Categories"
            value={formData.serviceCategories}
            name="serviceCategories"
            isEdit={isEdit}
          />
          <InputItem
            icon={<DollarSign size={14} />}
            label="Budget"
            value={formData.budget}
            name="budget"
            isEdit={isEdit}
          />
          <InputItem
            icon={<Mail size={14} />}
            label="Email"
            value={formData.email}
            name="email"
            isEdit={isEdit}
          />
          <InputItem
            icon={<Smartphone size={14} />}
            label="Alternate Phone"
            value={formData.alternatePhone}
            name="alternatePhone"
            isEdit={isEdit}
          />

          {showMore && (
            <>
              <InputItem
                icon={<User size={14} />}
                label="Name"
                value={formData.name}
                name="name"
                isEdit={isEdit}
              />
              <InputItem
                icon={<Building size={14} />}
                label="Company Name"
                value={formData.companyName}
                name="companyName"
                isEdit={isEdit}
              />
              <InputItem
                icon={<Building size={14} />}
                label="City"
                value={formData.cityName}
                name="cityName"
                isEdit={isEdit}
              />
              <InputItem
                icon={<MessageSquare size={14} />}
                label="Feedback"
                value={formData.feedback}
                name="feedback"
                isEdit={isEdit}
              />
              <InputItem
                icon={<Calendar size={14} />}
                label="Created On"
                value={moment(formData.createdAt).format("DD MMM YYYY")}
                name="createdAt"
                isEdit={false}
              />
            </>
          )}
        </div>

        {/* Show More/Less Toggle */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            {showMore ? "Show Less" : "Show All Fields"}
          </button>
        </div>

        {/* Creation Date */}
        <div className="text-right text-xs text-gray-500 mt-4">
          Created: {moment(formData.createdAt).fromNow()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <ActionButton
            disabled={true}
            icon={<Phone size={14} />}
            text="CALL"
          />
          <ActionButton
            disabled={!isEdit}
            icon={<Timer size={14} />}
            text="CALL LATER"
          />
          <ActionButton
            disabled={true}
            icon={<FaWhatsapp size={14} />}
            text="WHATSAPP"
          />
          <ActionButton
            disabled={true}
            icon={<MessageSquare size={14} />}
            text="SMS"
          />
          <ActionButton
            disabled={!isEdit}
            icon={<Notebook size={14} />}
            text="ADD NOTE"
          />
        </div>

        {/* Followup Section */}
        {selectTab === "CALL LATER" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-700 mb-3">
              <Flag size={14} className="mr-2" />
              Create Followup for:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-600">In:</span>
              {["5m", "15m", "1h", "custom"].map((option) => (
                <button
                  key={option}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selected === option
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelected(option)}
                >
                  {option === "custom" ? "Custom" : option === "5m" ? "5 min" : option === "15m" ? "15 min" : "1 hr"}
                </button>
              ))}
              {selected === "custom" && (
                <input
                  type="datetime-local"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="ml-2 px-3 py-1 text-xs border border-gray-300 rounded-md"
                />
              )}
            </div>
            <button
              onClick={createFollowupFunc}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
            >
              Create Followup
            </button>
          </div>
        )}

        {/* Note Section */}
        {selectTab === "ADD NOTE" && (
          <div className="mt-6">
            <textarea
              className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              placeholder="Write your note here..."
              rows={4}
            />
            <button
              onClick={() => setSelectTab(null)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Cancel
            </button>
          </div>
        )}

        {/* History & Tasks Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <HistoryAndTask id={users_id} />
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;