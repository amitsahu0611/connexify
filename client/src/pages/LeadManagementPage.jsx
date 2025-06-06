/** @format */

import React, {useState, useEffect} from "react";
import axios from "axios";
import LeadSearchComponent from "../components/LeadSearchComponent";
import LeadDetailComponent from "../components/LeadDetailComponent";
import TeamProfile from "./TeamProfile";

const LeadManagementPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("auto");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const workspace_id = localStorage.getItem("workspace_id");
        const response = await axios.get(
          `http://localhost:8001/api/lead/getAllLeadByWorkspaceId/${workspace_id}`
        );
        if (response.data.success) {
          setLeads(response.data.result);
          setFilteredLeads(response.data.result);
        } else {
          setError("Failed to fetch leads");
        }
      } catch (err) {
        setError("Error fetching leads: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredLeads(leads);
      return;
    }

    const filtered = leads.filter((lead) => {
      const lowerSearch = searchValue.toLowerCase();

      if (searchType === "auto") {
        return (
          lead.name.toLowerCase().includes(lowerSearch) ||
          lead.phone.includes(searchValue) ||
          lead.email.toLowerCase().includes(lowerSearch) ||
          lead.company_name.toLowerCase().includes(lowerSearch) ||
          lead.city_name.toLowerCase().includes(lowerSearch)
        );
      } else if (searchType === "phone") {
        return (
          lead.phone.includes(searchValue) ||
          (lead.alternate_phone && lead.alternate_phone.includes(searchValue))
        );
      } else if (searchType === "email") {
        return lead.email.toLowerCase().includes(lowerSearch);
      } else if (searchType === "name") {
        return lead.name.toLowerCase().includes(lowerSearch);
      }
      return true;
    });

    setFilteredLeads(filtered);
  }, [searchValue, searchType, leads]);

  const toggleRowExpand = (leadId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [leadId]: !prev[leadId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdateLead = (updatedData) => {
    setLeads(
      leads.map((lead) => (lead.id === updatedData.id ? updatedData : lead))
    );
    setFilteredLeads(
      filteredLeads.map((lead) =>
        lead.id === updatedData.id ? updatedData : lead
      )
    );
    setSelectedLead(updatedData);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return <div className='p-4 text-red-500'>{error}</div>;
  }

  return (
    <div className='flex flex-col lg:flex-row h-screen bg-gray-50'>
      <LeadSearchComponent
        leads={filteredLeads}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchType={searchType}
        setSearchType={setSearchType}
        selectedLead={selectedLead}
        setSelectedLead={setSelectedLead}
        expandedRows={expandedRows}
        toggleRowExpand={toggleRowExpand}
        formatDate={formatDate}
      />

      {/* <LeadDetailComponent
        selectedLead={selectedLead}
        formatDate={formatDate}
        onUpdateLead={handleUpdateLead}
      /> */}
      <div className='w-full lg:w-3/5 bg-white overflow-y-auto'>
        <div className='p-6'>
          <TeamProfile />
        </div>
      </div>
    </div>
  );
};

export default LeadManagementPage;
