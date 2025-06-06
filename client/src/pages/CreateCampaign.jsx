/** @format */

import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLeadsByWorkspace} from "../redux/slice/Lead.slice";
import DataTable from "../components/Datagrid";
import moment from "moment/moment";
import TeamProfile from "./TeamProfile";
import {X} from "lucide-react";

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const workspaceId = localStorage.getItem("workspace_id");
  const [selectedLead, setSelectedLead] = useState(null);

  const {leads} = useSelector((state) => state.lead);
  console.log("leads", leads);

  useEffect(() => {
    if (workspaceId) {
      dispatch(getLeadsByWorkspace(workspaceId));
    }
  }, [workspaceId]);

  const columns = useMemo(
    () => [
      {
        field: "sno",
        headerName: "S.No",
        flex: 0.5,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: (params) => (
          <span
            onClick={() => setSelectedLead(params.row)}
            className='font-normal text-blue-600 cursor-pointer underline'
          >
            {params.value}
          </span>
        ),
      },

      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
      },
      {
        field: "inhouse_division",
        headerName: "Division",
        flex: 1,
      },
      {
        field: "assignee",
        headerName: "Assignee",
        flex: 1,
        renderCell: (params) => {
          const creator = params.value;
          if (!creator)
            return <span className='text-gray-500'>Unassigned</span>;

          const initials = creator.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <div className='flex flex-row items-center  gap-2'>
              <div
                className='w-7 h-7 rounded-full bg-indigo-500 text-white font-semibold flex items-center justify-center text-sm'
                title={creator.name}
              >
                {initials}
              </div>
              {creator.name}
            </div>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created On",
        flex: 1,
        renderCell: (params) => moment(params.value).fromNow(),
      },
    ],
    []
  );

  const filteredRows = useMemo(() => {
    return leads?.map((lead, index) => ({
      id: lead.id,
      sno: index + 1,
      name: lead.name,
      phone: lead.phone,
      inhouse_division: lead.inhouse_division || "N/A",
      assignee: lead.creator,
      createdAt: lead.createdAt,
    }));
  }, [leads]);

  return (
    <div className='relative'>
      <DataTable rows={filteredRows} columns={columns} />

      {selectedLead && (
        <>
          {/* Dimmed background */}
          <div
            className='fixed inset-0 bg-black bg-opacity-30 z-40'
            onClick={() => setSelectedLead(null)}
          ></div>

          {/* Slide-in panel */}
          <div className='fixed top-0 right-0 h-full overflow-y-auto w-[70%] bg-white z-50 shadow-xl transition-transform duration-300 animate-slide-in'>
            <div className='flex justify-end p-4 border-b'>
              <button
                onClick={() => setSelectedLead(null)}
                className='text-gray-600 hover:text-red-600 text-xl'
              >
                <X />
              </button>
            </div>
            <div className='p-4'>
              <TeamProfile lead={selectedLead} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateCampaign;
