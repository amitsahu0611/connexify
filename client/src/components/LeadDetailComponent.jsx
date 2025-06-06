/** @format */

import React from "react";
import {FiEdit2, FiTrash2} from "react-icons/fi";

const LeadDetailComponent = ({selectedLead, formatDate, onUpdateLead}) => {
  if (!selectedLead) {
    return (
      <div className='hidden lg:flex lg:w-3/5 bg-white items-center justify-center'>
        <div className='text-center p-8'>
          <div className='text-gray-400 text-lg mb-2'>No lead selected</div>
          <div className='text-sm text-gray-500'>
            Select a lead from the list to view details
          </div>
        </div>
      </div>
    );
  }

  console.log("selectedLead", selectedLead);

  return (
    <div className='w-full lg:w-3/5 bg-white overflow-y-auto'>
      <div className='p-6'>
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>
              {selectedLead.name}
            </h2>
            <p className='text-gray-600'>{selectedLead.company_name}</p>
          </div>
          <div className='flex space-x-2'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
              <FiEdit2 className='inline mr-1' /> Edit
            </button>
            <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200'>
              <FiTrash2 className='inline mr-1' /> Delete
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h3 className='font-medium text-gray-700 mb-3'>
              Contact Information
            </h3>
            <div className='space-y-3'>
              <div>
                <div className='text-xs text-gray-500'>Primary Phone</div>
                <div className='font-medium'>{selectedLead.phone}</div>
              </div>
              {selectedLead.alternate_phone && (
                <div>
                  <div className='text-xs text-gray-500'>Alternate Phone</div>
                  <div className='font-medium'>
                    {selectedLead.alternate_phone}
                  </div>
                </div>
              )}
              <div>
                <div className='text-xs text-gray-500'>Email</div>
                <div className='font-medium'>{selectedLead.email}</div>
              </div>
              <div>
                <div className='text-xs text-gray-500'>City</div>
                <div className='font-medium'>{selectedLead.city_name}</div>
              </div>
            </div>
          </div>

          <div className='bg-gray-50 p-4 rounded-lg'>
            <h3 className='font-medium text-gray-700 mb-3'>Lead Details</h3>
            <div className='space-y-3'>
              <div>
                <div className='text-xs text-gray-500'>Source</div>
                <div className='font-medium'>
                  <span className='px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'>
                    {selectedLead.source}
                  </span>
                </div>
              </div>
              <div>
                <div className='text-xs text-gray-500'>Service Categories</div>
                <div className='font-medium'>
                  {selectedLead.service_categories}
                </div>
              </div>
              <div>
                <div className='text-xs text-gray-500'>Budget</div>
                <div className='font-medium'>{selectedLead.budget}</div>
              </div>
              <div>
                <div className='text-xs text-gray-500'>Division</div>
                <div className='font-medium'>
                  {selectedLead.inhouse_division}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='font-medium text-gray-700 mb-3'>Requirements</h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='whitespace-pre-line'>{selectedLead.requirements}</p>
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='font-medium text-gray-700 mb-3'>Feedback</h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='whitespace-pre-line'>{selectedLead.feedback}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div>
            <div className='text-xs text-gray-500'>Created At</div>
            <div className='font-medium'>
              {formatDate(selectedLead.createdAt)}
            </div>
          </div>
          <div>
            <div className='text-xs text-gray-500'>Updated At</div>
            <div className='font-medium'>
              {formatDate(selectedLead.updatedAt)}
            </div>
          </div>
          <div>
            <div className='text-xs text-gray-500'>Sheet Name</div>
            <div className='font-medium'>
              {selectedLead.sheet_name || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailComponent;
