/** @format */

// src/redux/slices/TeamSlice.jsx
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {API_URL, showError, showToast} from "../../utils/config";

const initialState = {
  allCalls: [],
  allCallsByLead: [],
  allCallsByCampaign: [],
  allCallsByUser: [],
  callsByLeadAndCampaign: [],
  error: null,
  loading: false,
};

export const createCall = createAsyncThunk(
  "createCall",
  async (callData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API_URL}callhistory/createCall`,
        callData
      );

      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "User creation failed";
      showError(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getAllCalls = createAsyncThunk("getAllCalls", async (thunkAPI) => {
  try {
    const res = await axios.get(`${API_URL}callhistory/getAllCalls`);
    return res.data.result;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch users";
    showError(msg, "error");
    return thunkAPI.rejectWithValue(msg);
  }
});

export const getCallsByLead = createAsyncThunk(
  "getCallsByLead",
  async (leadId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}callhistory/getCallsByLead/${leadId}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "User update failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getCallsByCampaign = createAsyncThunk(
  "getCallsByCampaign",
  async (campaignId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}callhistory/getCallsByCampaign/${campaignId}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch user";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getCallsByUser = createAsyncThunk(
  "getCallsByUser",
  async (user_id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}callhistory/getCallsByUser/${user_id}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch managers";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getCallsByLeadAndCampaign = createAsyncThunk(
  "getCallsByLeadAndCampaign",
  async ({lead_id, campaign_id}, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}callhistory/getCallsByLeadAndCampaign/${lead_id}/${campaign_id}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch managers";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateCall = createAsyncThunk(
  "updateCall",
  async (call_id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}callhistory/updateCall/${call_id}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch managers";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const callSlice = createSlice({
  name: "callHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCalls.fulfilled, (state, action) => {
        state.loading = false;
        state.allCalls = action.payload;
      })
      .addCase(getAllCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCallsByLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCallsByLead.fulfilled, (state, action) => {
        state.loading = false;
        state.allCallsByLead = action.payload;
      })
      .addCase(getCallsByLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCallsByCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCallsByCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.allCallsByCampaign = action.payload;
      })
      .addCase(getCallsByCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCallsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCallsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allCallsByUser = action.payload;
      })
      .addCase(getCallsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCallsByLeadAndCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCallsByLeadAndCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.callsByLeadAndCampaign = action.payload;
      })
      .addCase(getCallsByLeadAndCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default callSlice.reducer;
