/** @format */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Add_singleLads from "./pages/Add_singleLads";

import BulkLeads from "./pages/BulkLeads";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import UserProfile from "./components/UserProfile";
import SelectWorkspace from "./pages/SelectWorkspace";
import ManageWorkspace from "./pages/ManageWorkspace";
import Teams from "./pages/Teams";
import CreateCampaign from "./pages/CreateCampaign";
import AllCampaigns from "./pages/AllCampaigns";
import TeamProfile from "./pages/TeamProfile";

import LeadManagementPage from "./pages/LeadManagementPage";
import CampaignDashboard from "./components/CampaignDashboard";
import LeadCampaign from "./pages/LeadCampaign";

function App() {
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />

        <Route path='/workspace' element={<SelectWorkspace />} />

        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path='leads/profile/:user_id' element={<TeamProfile />} />
          <Route path='campaign/:id' element={<CampaignDashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='leads' element={<Add_singleLads />} />
          <Route path='leads/add' element={<BulkLeads />} />
          <Route path='teams' element={<Teams />} />
          <Route path='search' element={<LeadManagementPage />} />
          <Route path='campaign/createCampaign' element={<CreateCampaign />} />
          <Route path='campaign/allCampaigns' element={<AllCampaigns />} />
          <Route path='lead/campaigns' element={<LeadCampaign />} />

          <Route path='/profile' element={<UserProfile />} />

          {user?.role_id === 0 && (
            <Route path='/manage-workspace' element={<ManageWorkspace />} />
          )}
          <Route index element={<Navigate to='/dashboard' />} />
        </Route>

        {/* Catch-all for unknown routes */}
        {/* <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
