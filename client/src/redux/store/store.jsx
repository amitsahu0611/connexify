/** @format */

import {configureStore} from "@reduxjs/toolkit";
import Auth_slice from "../slice/Auth_slice";
import workspaceSlice from "../slice/Workspace.slice";
import leadSlice from "../slice/Lead.slice";
import dropdownSlice from "../slice/dropdownSlice";
import teamSlice from "../slice/TeamSlice";
import campaignSlice from "../slice/Campaign.slice";
import followSlice from "../slice/Followup.slice";
import callSlice from "../slice/call.slice";

export const Store = configureStore({
  reducer: {
    auth: Auth_slice,
    workspace: workspaceSlice,
    dropdown: dropdownSlice,
    lead: leadSlice,
    team: teamSlice,
    campaign: campaignSlice,
    followup: followSlice,
    call: callSlice,
  },
});
