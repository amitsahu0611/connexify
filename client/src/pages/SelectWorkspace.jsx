

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkspaces } from "../redux/slice/Workspace.slice";
import { useNavigate } from "react-router-dom";

const SelectWorkspace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { workspaces, loading } = useSelector((state) => state.workspace);

  useEffect(() => {
    dispatch(getAllWorkspaces());
  }, [dispatch]);

  const handleSelect = (workspace) => {
    localStorage.setItem("selectedWorkspace", JSON.stringify(workspace));
    localStorage.setItem("workspace_id", workspace.workspace_id);
    navigate("/dashboard");
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg">Loading workspaces...</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Select a Workspace
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(workspaces) && workspaces.length > 0 ? (
            workspaces.map((ws) => (
              <div
                key={ws.workspace_id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition cursor-pointer border border-gray-200"
                onClick={() => handleSelect(ws)}
              >
                <h2 className="text-xl font-semibold">{ws.workspace_name}</h2>
                <p className="text-sm text-gray-600 mt-1">{ws.description}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Created: {new Date(ws.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-2">
              No workspaces found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectWorkspace;
