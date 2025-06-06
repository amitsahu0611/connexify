/** @format */

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllWorkspaces} from "../redux/slice/Workspace.slice";
import {useNavigate} from "react-router-dom";
import {LogOut} from "lucide-react";

const SelectWorkspace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {workspaces, loading} = useSelector((state) => state.workspace);
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData", userData);

  const userEmail = userData?.email; // Replace with dynamic email if available

  useEffect(() => {
    dispatch(getAllWorkspaces());
  }, [dispatch]);

  const handleSelect = (workspace) => {
    localStorage.setItem("selectedWorkspace", JSON.stringify(workspace));
    localStorage.setItem("workspace_id", workspace.workspace_id);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-8'>
      {/* Header Section */}
      <header className='flex justify-end mb-6'>
        <div className='flex items-center space-x-4'>
          <span className='font-semibold text-gray-800'>{userEmail}</span>
          <button
            onClick={handleLogout}
            className='px-5 py-3 bg-indigo-500 text-white font-semi hover:text-black rounded-md text-sm flex items-center'
          >
            <LogOut className='w-4 h-4 mr-1' />
            Logout
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className='bg-white p-6 rounded-lg shadow-md mx-auto'>
        <h1 className='text-xl text-indigo-500 underline font-semibold mb-4'>
          Existing Workspaces ({workspaces?.length || 0})
        </h1>

        <ul className='list-none p-0'>
          {loading ? (
            <li className='text-gray-500'>Loading workspaces...</li>
          ) : Array.isArray(workspaces) && workspaces.length > 0 ? (
            workspaces.map((ws) => (
              <li
                key={ws.workspace_id}
                onClick={() => handleSelect(ws)}
                className='py-3 uppercase font-bold text-indigo-500 hover:underline px-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
              >
                {ws.workspace_name}
              </li>
            ))
          ) : (
            <li className='text-gray-400'>No workspaces found.</li>
          )}
        </ul>
      </main>
    </div>
  );
};

export default SelectWorkspace;
