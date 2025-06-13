/** @format */

// src/redux/slices/TeamSlice.jsx
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {API_URL, showToast} from "../../utils/config";

const initialState = {
  LeadFollowUps: [],
  AsigneeFollowUps: [],
  leadLoading: false,
  error: null,
  workspaceManagers: [],
};

export const createFollowup = createAsyncThunk(
  "leadFollowup/createFollowup",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API_URL}LeadFollowup/createFollowup`,
        userData
      );
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "User creation failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getFollowupByLeadId = createAsyncThunk(
  "getFollowupByLeadId",
  async (id, thunkAPI) => {
    console.log("iddsdfsd", id);
    try {
      const res = await axios.get(
        `${API_URL}LeadFollowup/getFollowupByLeadId/${id}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch users";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getByCreatedBy = createAsyncThunk(
  "getByCreatedBy",
  async (thunkAPI) => {
    const {user_id} = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await axios.get(
        `${API_URL}LeadFollowup/getByCreatedBy/${user_id}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "User update failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const followupSlice = createSlice({
  name: "followupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Team Member
      .addCase(getFollowupByLeadId.pending, (state) => {
        state.leadLoading = true;
        state.error = null;
      })
      .addCase(getFollowupByLeadId.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.LeadFollowUps = action.payload;
      })
      .addCase(getFollowupByLeadId.rejected, (state, action) => {
        state.leadLoading = false;
        state.error = action.payload;
      })

      // Get All Users
      .addCase(getByCreatedBy.pending, (state) => {
        state.leadLoading = true;
        state.error = null;
      })
      .addCase(getByCreatedBy.fulfilled, (state, action) => {
        state.leadLoading = false;
        state.AsigneeFollowUps = action.payload;
      })
      .addCase(getByCreatedBy.rejected, (state, action) => {
        state.leadLoading = false;
        state.error = action.payload;
      });
  },
});

export default followupSlice.reducer;
