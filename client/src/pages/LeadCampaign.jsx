/** @format */

// /** @format */

// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useLocation} from "react-router-dom";
// import {getCamapignByLeadId} from "../redux/slice/Campaign.slice";

// const LeadCampaign = () => {
//   const {search} = useLocation();
//   const dispatch = useDispatch();
//   const queryParams = new URLSearchParams(search);
//   const leadId = queryParams.get("lead_id");
//   const {leadAllCampaigns} = useSelector((state) => state.campaign);

//   console.log("leadAllCampaigns", leadAllCampaigns);

//   useEffect(() => {
//     if (leadId) {
//       dispatch(getCamapignByLeadId(leadId));
//     }
//   }, [leadId]);

//   return <div>LeadCampaign</div>;
// };

// export default LeadCampaign;

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {getCamapignByLeadId} from "../redux/slice/Campaign.slice";
import moment from "moment";
import {getLeadById} from "../redux/slice/Lead.slice";
import {
  BuildingIcon,
  CalendarIcon,
  Currency,
  Mail,
  MapPinIcon,
  PhoneIcon,
  SquareRoundCornerIcon,
  TagIcon,
} from "lucide-react";

const LeadCampaign = () => {
  const {search} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const leadId = queryParams.get("lead_id");
  const {leadAllCampaigns} = useSelector((state) => state.campaign);
  const {leadDetail} = useSelector((state) => state.lead);

  useEffect(() => {
    if (leadId) {
      dispatch(getCamapignByLeadId(leadId));
      dispatch(getLeadById(leadId));
    }
  }, [leadId]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMM DD, YYYY");
  };

  return (
    <>
      <span className='pl-7'>Lead Campaigns</span>
      <div className='p-6 mx-auto'>
        {/* Lead Details Section */}
        <div className='bg-white rounded-xl shadow-xs border border-gray-100 p-6 mb-8'>
          {/* Header with name and status */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-xl font-semibold text-blue-800 leading-tight underline'>
                {leadDetail?.name}
              </h1>
              {leadDetail?.company_name && (
                <p className='text-gray-500 mt-1'>{leadDetail.company_name}</p>
              )}
            </div>
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                leadDetail?.status === "New Lead"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-purple-50 text-purple-700"
              }`}
            >
              {leadDetail?.status}
            </span>
          </div>

          {/* Main details grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Contact Card */}
            <div className='space-y-1'>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Contact
              </h3>
              <div className='space-y-2'>
                <p className='text-gray-900 font-medium flex items-center gap-2'>
                  <PhoneIcon className='h-4 w-4 text-gray-400' />
                  <a
                    href={`tel:${leadDetail?.phone}`}
                    className='hover:text-blue-600 transition-colors'
                  >
                    {leadDetail?.phone}
                  </a>
                </p>
                <p className='text-gray-900 font-medium flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-gray-400' />
                  <a
                    href={`mailto:${leadDetail?.email}`}
                    className='hover:text-blue-600 text-blue-800 underline transition-colors'
                  >
                    {leadDetail?.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Location & Service Card */}
            <div className='space-y-1'>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Location & Service
              </h3>
              <div className='space-y-2'>
                <p className='text-gray-900 flex items-center gap-2'>
                  <MapPinIcon className='h-4 w-4 text-gray-400' />
                  {leadDetail?.city_name || "Not specified"}
                </p>
                <p className='text-gray-900 flex items-center gap-2'>
                  <TagIcon className='h-4 w-4 text-gray-400' />
                  {leadDetail?.service_categories || "Not specified"}
                </p>
              </div>
            </div>

            {/* Project Info Card */}
            <div className='space-y-1'>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Project Info
              </h3>
              <div className='space-y-2'>
                <p className='text-gray-900 flex items-center gap-2'>
                  <Currency className='h-4 w-4 text-gray-400' />
                  Budget: {leadDetail?.budget || "Not specified"}
                </p>
                <p className='text-gray-900 flex items-center gap-2'>
                  <SquareRoundCornerIcon className='h-4 w-4 text-gray-400' />
                  Source: {leadDetail?.source || "Not specified"}
                </p>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className='space-y-1'>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Additional Info
              </h3>
              <div className='space-y-2'>
                <p className='text-gray-900 flex items-center gap-2'>
                  <BuildingIcon className='h-4 w-4 text-gray-400' />
                  Division: {leadDetail?.inhouse_division || "Not specified"}
                </p>
                <p className='text-gray-900 flex items-center gap-2'>
                  <CalendarIcon className='h-4 w-4 text-gray-400' />
                  Created: {formatDate(leadDetail?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          {leadDetail?.requirements && (
            <div className='mt-8 pt-6 border-t border-gray-100'>
              <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-3'>
                Requirements
              </h3>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-700 whitespace-pre-line'>
                  {leadDetail.requirements}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Campaigns Section */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6'>
            Associated Campaigns ({leadAllCampaigns?.length})
          </h2>

          {leadAllCampaigns?.length > 0 ? (
            <div className='space-y-4'>
              {leadAllCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className='p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3
                        onClick={() => navigate(`/campaign/${campaign?.id}`)}
                        className='text-lg font-medium text-blue-800 cursor-pointer underline'
                      >
                        {campaign.name}
                      </h3>
                      {campaign.description && (
                        <p className='text-gray-600 mt-1 text-sm'>
                          {campaign.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        campaign.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campaign.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className='flex justify-between flex-wrap gap-x-4 gap-y-2 mt-3 text-sm'>
                    <p className='text-gray-700'>
                      <span className='font-medium'>Period:</span>{" "}
                      {formatDate(campaign.start_date)} -{" "}
                      {formatDate(campaign.end_date)}
                    </p>
                    <p className='text-gray-500 text-sm'>
                      Created: {formatDate(campaign.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <p className='text-gray-500'>
                No campaigns associated with this lead.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeadCampaign;
