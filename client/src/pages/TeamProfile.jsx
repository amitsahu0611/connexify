/** @format */

// /** @format */

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
//   console.log("users_id", users_id);
//   const {leadDetail, leadLoading} = useSelector((state) => state.lead);
//   const [open, setOpen] = useState(false);
//   const [showMore, setShowMore] = useState(false);
//   const [selectTab, setSelectTab] = useState();
//   const [selected, setSelected] = useState("5m");
//   const [customDate, setCustomDate] = useState("");
//   const [isEdit, setIsEdit] = useState(false);

//   console.log("selected", selected);

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
//   console.log("leadDetail", leadDetail);

//   useEffect(() => {
//     if (leadDetail) {
//       setFormData({
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
//       });
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
//       // console.log("createFollowup", data);
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

//   const InputItem = ({icon, label, value, onChange}) => (
//     <div className='flex flex-col'>
//       <label className='text-sm text-gray-500 mb-1 flex flex-row gap-2 items-center'>
//         {icon} {label}
//       </label>
//       <input
//         type='text'
//         value={value}
//         onChange={onChange}
//         className=' border-b-2 border-r-2 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-300'
//       />
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

//   console.log("isEdit", isEdit);

//   return (
//     <>
//       {users_id ? (
//         <div style={{backgroundColor: "#F7F7F7"}} className={container}>
//           <div className='flex flex-row justify-between'>
//             <div>
//               <div className='font-[12px]'>{formData?.name}</div>
//               <span className='text-green-600 text-sm'>{formData?.status}</span>
//               {/* <div className='text-sm mt-2'>
//               <span className=' bg-green-600 px-2 mr-2 py-[1.5px] text-white'>
//                 Won
//               </span>
//             </div> */}
//             </div>
//             <div>
//               <div className='flex flex-row gap-2'>
//                 {/* <button className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-blue-600 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'>
//                   <MessageCircle />
//                 </button> */}
//                 {isEdit && <button>Update Lead</button>}

//                 <button
//                   onClick={() =>
//                     navigate(`/lead/campaigns?lead_id=${leadDetail?.id}`)
//                   }
//                   className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-green-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
//                 >
//                   <AtSign />
//                 </button>
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
//                       onClick={() => {
//                         setIsEdit(true), setOpen(false);
//                       }}
//                       className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
//                     >
//                       <Pencil className='w-4 h-4 mr-2' /> Edit Lead
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
//                   value={formData.phone}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                 />
//                 <InputItem
//                   icon={<LandmarkIcon size={15} />}
//                   label='Source'
//                   value={formData.source}
//                   onChange={(e) => handleChange("source", e.target.value)}
//                 />
//                 <InputItem
//                   icon={<ListChecksIcon size={15} />}
//                   label='Service Categories'
//                   value={formData.serviceCategories}
//                   onChange={(e) =>
//                     handleChange("serviceCategories", e.target.value)
//                   }
//                 />
//                 <InputItem
//                   icon={<DollarSignIcon size={15} />}
//                   label='Budget'
//                   value={formData.budget}
//                   onChange={(e) => handleChange("budget", e.target.value)}
//                 />
//                 <InputItem
//                   icon={<AtSignIcon size={15} />}
//                   label='Email'
//                   value={formData.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                 />
//                 <InputItem
//                   icon={<SmartphoneIcon size={15} />}
//                   label='Alternate Phone'
//                   value={formData.alternatePhone}
//                   onChange={(e) =>
//                     handleChange("alternatePhone", e.target.value)
//                   }
//                 />
//               </div>
//               {/* Expandable Fields */}
//               {showMore && (
//                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
//                   <InputItem
//                     icon={<UserIcon size={15} />}
//                     label='Name'
//                     value={formData.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                   />
//                   <InputItem
//                     icon={<BuildingIcon size={15} />}
//                     label='Company Name'
//                     value={formData.companyName}
//                     onChange={(e) =>
//                       handleChange("companyName", e.target.value)
//                     }
//                   />
//                   <InputItem
//                     icon={<LandmarkIcon size={15} />}
//                     label='City'
//                     value={formData.city}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                   />
//                   <InputItem
//                     icon={<MessageSquareIcon size={15} />}
//                     label='Feedback'
//                     value={formData.feedback}
//                     onChange={(e) => handleChange("feedback", e.target.value)}
//                   />
//                   <InputItem
//                     icon={<CalendarIcon size={15} />}
//                     label='Created On'
//                     value={formData.createdOn}
//                     onChange={(e) => handleChange("createdOn", e.target.value)}
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
//             <div className='flex justify-around  mt-6 flex-wrap gap-2'>
//               <ActionButton
//                 disable={true}
//                 icon={<PhoneIcon size={15} />}
//                 text='CALL'
//               />
//               <ActionButton icon={<Timer size={15} />} text='CALL LATER' />
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
//               <ActionButton icon={<Notebook size={15} />} text='ADD NOTE' />
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
//                   className={`mt-3 ${bluebutton} `}
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
//             )}{" "}
//             <hr className='my-10' />
//             <HistoryAndTask />
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

/** @format */
import React, {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {getUserById} from "../redux/slice/TeamSlice";
import {
  AtSign,
  AtSignIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  Flag,
  HistoryIcon,
  LandmarkIcon,
  ListChecksIcon,
  MessageCircle,
  MessageCircleCode,
  MessageSquareIcon,
  Notebook,
  Pencil,
  PhoneCall,
  PhoneCallIcon,
  PhoneIcon,
  PhoneIncomingIcon,
  SmartphoneIcon,
  Timer,
  UserIcon,
  X,
  Save,
  XCircle,
} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {bluebutton, container} from "../styles/Csstyles";
import {
  Copy,
  MoreHorizontal,
  Slash,
  SlashIcon,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import {FaPhone, FaWhatsapp} from "react-icons/fa";
import HistoryAndTask from "../components/HistoryAndTask";
import {getLeadById} from "../redux/slice/Lead.slice";
import {
  createFollowup,
  getFollowupByLeadId,
} from "../redux/slice/Followup.slice";
import {showSuccess} from "../utils/config";
import moment from "moment/moment";

const TeamProfile = ({lead}) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user_id} = useParams();
  const users_id = user_id || searchParams.get("user_Id");
  const {leadDetail, leadLoading} = useSelector((state) => state.lead);
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
    CreatedAt: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({...prev, [field]: value}));
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
        CreatedAt: leadDetail?.createdAt || "-",
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

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    if (originalData) {
      setFormData(originalData);
    }
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
      return;
      showSuccess("Lead updated successfully");
      setIsEdit(false);
      dispatch(getLeadById(users_id)); // Refresh lead data
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
    if (Object.keys(followup).length == 3) {
      const data = await dispatch(createFollowup(followup));
      if (data?.payload?.status == 1) {
        showSuccess("Followup Created Successfully");
      }
    }
  };

  useEffect(() => {
    if (selected == "5m" || selected == "15min" || selected == "1h") {
      setCustomDate("");
    }
  }, [selected]);

  const InputItem = ({icon, label, value, onChange, fieldName, isEdit}) => (
    <div className='flex flex-col'>
      <label className='text-sm text-gray-500 mb-1 flex flex-row gap-2 items-center'>
        {icon} {label}
      </label>
      {isEdit ? (
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(fieldName, e.target.value)}
          className='border-b-2 border-r-2 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-300'
        />
      ) : (
        <div className='border-b-2 border-r-2 p-2 text-sm'>{value}</div>
      )}
    </div>
  );

  const ActionButton = ({disable = false, icon, text}) => {
    const isSelected = selectTab === text;

    return (
      <button
        disabled={disable}
        onClick={() => !disable && setSelectTab(text)}
        className={`flex flex-row items-center gap-3 justify-center w-[10rem] text-sm px-4 py-2 rounded-md transition
        ${
          disable
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSelected
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-300 text-gray-800"
        }`}
      >
        {icon}
        {text}
      </button>
    );
  };

  return (
    <>
      {users_id ? (
        <div style={{backgroundColor: "#F7F7F7"}} className={container}>
          <div className='flex flex-row justify-between'>
            <div>
              <div className='font-[12px]'>{formData?.name}</div>
              <span className='text-green-600 text-sm'>{formData?.status}</span>
            </div>
            <div>
              <div className='flex flex-row gap-2'>
                {isEdit ? (
                  <>
                    <button
                      onClick={handleSaveLead}
                      className='flex items-center justify-center p-2 text-white bg-green-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
                      title='Save Changes'
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className='flex items-center justify-center p-2 text-white bg-red-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
                      title='Cancel Edit'
                    >
                      <XCircle size={18} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      navigate(`/lead/campaigns?lead_id=${leadDetail?.id}`)
                    }
                    className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-green-500 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
                  >
                    <AtSign />
                  </button>
                )}

                <button
                  onClick={toggleDropdown}
                  className='flex items-center justify-center p-2 text-gray-600 hover:text-white hover:bg-gray-700 rounded-full transition duration-200 ease-in-out shadow hover:shadow-md focus:outline-none'
                >
                  {open ? <X /> : <MoreHorizontal />}
                </button>
              </div>

              {open && (
                <div className='absolute right-0 z-10 w-48 mt-2 bg-white border rounded shadow-lg'>
                  <ul className='py-1'>
                    <li
                      onClick={handleEditToggle}
                      className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
                    >
                      <Pencil className='w-4 h-4 mr-2' />{" "}
                      {isEdit ? "Cancel Edit" : "Edit Lead"}
                    </li>
                    <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
                      <Copy className='w-4 h-4 mr-2' /> Copy Lead Link
                    </li>
                    <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
                      <Trash2Icon className='w-4 h-4 mr-2' /> Delete lead
                    </li>
                    <li className='flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>
                      <SlashIcon className='w-4 h-4 mr-2' /> Block lead
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className='bg-white mx-auto mt-8 p-6 border-t'>
            <div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
                <InputItem
                  icon={<PhoneCallIcon size={15} />}
                  label='Phone'
                  value={formData?.phone}
                  onChange={handleChange}
                  fieldName='phone'
                />
                <InputItem
                  icon={<LandmarkIcon size={15} />}
                  label='Source'
                  value={formData.source}
                  onChange={handleChange}
                  fieldName='source'
                />
                <InputItem
                  icon={<ListChecksIcon size={15} />}
                  label='Service Categories'
                  value={formData.serviceCategories}
                  onChange={handleChange}
                  fieldName='serviceCategories'
                />
                <InputItem
                  icon={<DollarSignIcon size={15} />}
                  label='Budget'
                  value={formData.budget}
                  onChange={handleChange}
                  fieldName='budget'
                />
                <InputItem
                  icon={<AtSignIcon size={15} />}
                  label='Email'
                  value={formData.email}
                  onChange={handleChange}
                  fieldName='email'
                />
                <InputItem
                  icon={<SmartphoneIcon size={15} />}
                  label='Alternate Phone'
                  value={formData.alternatePhone}
                  onChange={handleChange}
                  fieldName='alternatePhone'
                />
              </div>
              {/* Expandable Fields */}
              {showMore && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                  <InputItem
                    icon={<UserIcon size={15} />}
                    label='Name'
                    value={formData.name}
                    onChange={handleChange}
                    fieldName='name'
                  />
                  <InputItem
                    icon={<BuildingIcon size={15} />}
                    label='Company Name'
                    value={formData.companyName}
                    onChange={handleChange}
                    fieldName='companyName'
                  />
                  <InputItem
                    icon={<LandmarkIcon size={15} />}
                    label='City'
                    value={formData.cityName}
                    onChange={handleChange}
                    fieldName='cityName'
                  />
                  <InputItem
                    icon={<MessageSquareIcon size={15} />}
                    label='Feedback'
                    value={formData.feedback}
                    onChange={handleChange}
                    fieldName='feedback'
                  />
                  <InputItem
                    icon={<CalendarIcon size={15} />}
                    label='Created On'
                    value={moment(formData?.CreatedAt).format("DD MMM YYYY")}
                    readOnly
                  />
                </div>
              )}
            </div>
            {/* Toggle Button */}
            <div className='text-center mt-4'>
              <button
                onClick={() => setShowMore(!showMore)}
                className='text-blue-600 hover:underline text-sm font-medium'
              >
                {showMore ? "Show Less" : "Show All Fields"}
              </button>
            </div>
            {/* Created Date */}
            <div className='text-right text-xs text-gray-500 mt-2'>
              Created: {moment(formData?.CreatedAt).fromNow()}
            </div>
            {/* Action Buttons */}
            <div className='flex justify-around mt-6 flex-wrap gap-2'>
              <ActionButton
                disable={true}
                icon={<PhoneIcon size={15} />}
                text='CALL'
              />
              <ActionButton
                disable={!isEdit}
                icon={<Timer size={15} />}
                text='CALL LATER'
              />
              <ActionButton
                disable={true}
                icon={<FaWhatsapp size={15} />}
                text='WHATSAPP'
              />
              <ActionButton
                disable={true}
                icon={<MessageCircleCode size={15} />}
                text='SMS'
              />
              <ActionButton
                disable={!isEdit}
                icon={<Notebook size={15} />}
                text='ADD NOTE'
              />
            </div>
            <hr className='my-10' />
            {selectTab == "CALL LATER" && (
              <div>
                <div className='flex flex-row items-center'>
                  Create Followup for: <Flag className='ml-3' />
                </div>
                <div className='flex flex-row mt-6 items-center gap-2'>
                  <span>In:</span>
                  <button
                    className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
                      selected === "5m" ? "bg-gray-600 text-white" : ""
                    }`}
                    onClick={() => setSelected("5m")}
                  >
                    5 min
                  </button>
                  <button
                    className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
                      selected === "15m" ? "bg-gray-600 text-white" : ""
                    }`}
                    onClick={() => setSelected("15m")}
                  >
                    15 min
                  </button>
                  <button
                    className={`border w-[4rem] ml-2 py-1 rounded text-sm ${
                      selected === "1h" ? "bg-gray-600 text-white" : ""
                    }`}
                    onClick={() => setSelected("1h")}
                  >
                    1 hr
                  </button>
                  <button
                    className={`border w-[6rem] ml-2 py-1 rounded text-sm ${
                      selected === "custom" ? "bg-gray-600 text-white" : ""
                    }`}
                    onClick={() => setSelected("custom")}
                  >
                    Custom
                  </button>
                  {selected === "custom" && (
                    <input
                      type='datetime-local'
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className='ml-2 border rounded py-1 px-2 text-sm'
                    />
                  )}
                </div>
                <button
                  onClick={createFollowupFunc}
                  className={`mt-3 ${bluebutton}`}
                >
                  Create
                </button>
              </div>
            )}
            {selectTab === "ADD NOTE" && (
              <textarea
                className='w-full p-2 border rounded-md mt-2'
                placeholder='Write your note here...'
                rows={4}
              />
            )}
            {selectTab && (
              <button
                onClick={() => setSelectTab()}
                className='border-b mt-3 text-sm text-blue-600'
              >
                Cancel
              </button>
            )}
            <hr className='my-10' />
            <HistoryAndTask id={users_id} />
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <div className='text-sm font-bold text-gray-400 mb-2'>
            No Lead Selected
          </div>
        </div>
      )}
    </>
  );
};

export default TeamProfile;
