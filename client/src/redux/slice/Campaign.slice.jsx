/** @format */

import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../utils/config";

export const createCampaign = createAsyncThunk(
  "campaign/create",
  async (campaignData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${API_URL}campaign/createCampaign`,
        campaignData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Get All Campaigns
export const getAllCampaigns = createAsyncThunk(
  "campaign/getAll",
  async (workspaceId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_URL}campaign/getAllCampaigns/${workspaceId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3. Get Campaign By ID
export const getCampaignById = createAsyncThunk(
  "campaign/getById",
  async (campaignId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_URL}campaign/getCampaignById/${campaignId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4. Update Campaign
export const updateCampaign = createAsyncThunk(
  "campaign/update",
  async ({id, data}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${API_URL}campaign/updateCampaign/${id}`,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 5. Delete Campaign
export const deleteCampaign = createAsyncThunk(
  "campaign/delete",
  async (id, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${API_URL}campaign/deleteCampaign/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    allCampaigns: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        console.log("All Campaigns:", action.payload);
        state.allCampaigns = action.payload;
      })
      .addCase(getAllCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default campaignSlice.reducer;
