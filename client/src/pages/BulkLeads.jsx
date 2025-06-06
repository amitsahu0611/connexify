/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getImportedLeads, uploadBulkLeads} from "../redux/slice/Lead.slice";
import {showToast} from "../utils/config";

const BulkLeads = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const {importedLeads, loading} = useSelector((state) => state.lead);
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  const user = JSON.parse(localStorage.getItem("userData"));
  const workspaceId = localStorage.getItem("workspace_id");
  const userId = user ? user.user_id : "0";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      showToast("Please upload a valid CSV file", "error");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return showToast("Please select a CSV file to upload", "warning");
    }

    if (!workspaceId || !userId) {
      return showToast("Missing workspace or user information", "error");
    }

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("workspace_id", workspaceId);
    formData.append("createdBy", userId);

    await dispatch(uploadBulkLeads(formData));
    setFile(null);
    dispatch(getImportedLeads(workspaceId));
  };

  useEffect(() => {
    if (workspaceId) {
      dispatch(getImportedLeads(workspaceId));
    }
  }, [dispatch, workspaceId]);

  const headers = [
    "name",
    "phone",
    "source",
    "inhouse_division",
    "service_categories",
    "requirements",
    "budget",
    "email",
    "alternate_phone",
    "city_name",
    "feedback",
    "company_name",
  ];

  const handleDownload = () => {
    const sampleRow = headers.reduce((acc, header) => {
      acc[header] = "";
      return acc;
    }, {});

    const csvRows = [
      headers.join(","),
      headers.map((field) => `"${sampleRow[field] ?? ""}"`).join(","),
    ];

    const blob = new Blob([csvRows.join("\n")], {type: "text/csv"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "lead_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      showToast("Please drop a valid CSV file", "error");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Bulk Leads Upload
        </h1>

        {showModal && (
          <div>
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white rounded-xl shadow-xl w-[60%] p-6 relative overflow-y-auto max-h-[90vh]'>
                {" "}
                {/* Changed max-w-6xl to w-full */}
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className='absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold'
                  aria-label='Close'
                >
                  &times;
                </button>
                &nbsp; &nbsp;
                {/* Sheet Name and Date Header */}
                <div className='mb-4'>
                  <h2 className='text-2xl font-semibold text-gray-800 mb-1'>
                    Lead Details
                  </h2>
                  <p className='text-sm text-gray-500'>
                    <span className='font-medium'>Sheet Name:</span>{" "}
                    {tableData?.sheetName || "N/A"} <br />
                    <span className='font-medium'>Created Date:</span>{" "}
                    {tableData?.createdAt
                      ? new Date(tableData?.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                &nbsp; &nbsp;
                {/* Table */}
                <div className='overflow-x-auto border rounded-lg'>
                  <table className='min-w-full text-sm text-left border-collapse'>
                    <thead className='bg-blue-100 text-blue-800'>
                      <tr>
                        <th className='px-4 py-2 border'>S.No</th>
                        <th className='px-4 py-2 border'>Name</th>
                        <th className='px-4 py-2 border'>Phone</th>
                        <th className='px-4 py-2 border'>Email</th>
                        <th className='px-4 py-2 border'>Source</th>
                        <th className='px-4 py-2 border'>Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData?.allLeads?.length > 0 ? (
                        tableData.allLeads.map((lead, index) => (
                          <tr
                            key={index}
                            className='odd:bg-white even:bg-gray-50'
                          >
                            <td className='px-4 py-2 border'>{index + 1}</td>
                            <td className='px-4 py-2 border'>{lead.name}</td>
                            <td className='px-4 py-2 border'>{lead.phone}</td>
                            <td className='px-4 py-2 border'>{lead.email}</td>
                            <td className='px-4 py-2 border'>{lead.source}</td>
                            <td className='px-4 py-2 border'>
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan='6'
                            className='px-4 py-4 text-center text-gray-500 italic'
                          >
                            No leads available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-center mb-6'>
          <button
            onClick={handleDownload}
            className='bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition'
          >
            Download CSV Template
          </button>
        </div>

        {/* Drag and drop zone */}
        <form
          onSubmit={handleUpload}
          className='bg-white p-6 rounded-xl shadow mb-10'
        >
          <p className='text-sm text-gray-500 mb-3'>
            Only upload <strong>.csv</strong> files
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className='border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-10 flex flex-col justify-center items-center text-center
            transition-colors hover:border-blue-500 hover:bg-blue-50'
            onClick={() => document.getElementById("fileInput").click()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 mb-3 text-blue-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7 16v-4m0 0V8m0 4h10m-5-5v10m5 4h-10a2 2 0 01-2-2v-4a2 2 0 012-2h3'
              />
            </svg>
            <p className='text-gray-600 mb-1'>
              {file ? (
                <span className='font-semibold'>{file.name}</span>
              ) : (
                "Drag and drop your CSV file here, or click to select"
              )}
            </p>
            <input
              id='fileInput'
              type='file'
              accept='.csv'
              onChange={handleFileChange}
              className='hidden'
            />
          </div>

          <div className='mt-6 flex justify-center'>
            <button
              type='submit'
              className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition'
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        <h2 className='text-2xl font-semibold mb-4 text-center'>
          Uploaded Lead Sheets
        </h2>

        <div className='overflow-x-auto rounded-xl shadow bg-white min-h-[150px] flex items-center justify-center'>
          {loading ? (
            <p className='p-10 text-gray-700'>Loading leads...</p>
          ) : Array.isArray(importedLeads) && importedLeads.length > 0 ? (
            <table className='min-w-full text-sm border-collapse border border-gray-200'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='p-3 text-left border border-gray-200'>
                    Uploaded File Name
                  </th>
                  <th className='p-3 text-left border border-gray-200'>
                    Leads
                  </th>
                  <th className='p-3 text-left border border-gray-200'>
                    Uploaded by
                  </th>
                  <th className='p-3 text-left border border-gray-200'>
                    Uploaded on
                  </th>
                  <th className='p-3 text-left border border-gray-200'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {importedLeads.map((sheet, i) => (
                  <tr
                    key={i}
                    className='odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition'
                  >
                    <td className='p-3 border border-gray-200'>
                      {sheet.sheetName}
                    </td>
                    <td className='p-3 text-indigo-600 font-medium border border-gray-200'>
                      {sheet.totalLeads}
                    </td>
                    <td className='p-3 flex items-center gap-2 border border-gray-200'>
                      <div className='bg-purple-200 text-purple-800 font-semibold rounded-full w-7 h-7 flex items-center justify-center text-xs'>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span>{user?.name}</span>
                    </td>
                    <td className='p-3 border border-gray-200'>
                      {new Date(sheet.createdAt).toLocaleDateString()}
                    </td>
                    <td className='p-3 flex items-center gap-3 border border-gray-200'>
                      <button
                        title='View'
                        onClick={() => {
                          setShowModal(true), setTableData(sheet);
                        }}
                        className='text-gray-700 hover:text-black text-lg transition'
                      >
                        📄
                      </button>
                      <button
                        title='Create Campaign'
                        className='text-blue-600 hover:text-blue-800 text-lg transition'
                      >
                        📣
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-gray-400 italic text-center p-10 w-full'>
              No sheets uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkLeads;
