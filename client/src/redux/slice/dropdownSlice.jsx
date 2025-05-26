// src/redux/slices/dropdownSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, showToast } from "../../utils/config";

const initialState = {
  divisions: [],
  sources: [],
  categories: [],
  loading: false,
  error: null,
};

// Get all divisions by workspace ID
export const getDivisionsByWorkspace = createAsyncThunk(
  "dropdown/getDivisions",
  async (workspaceId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}inhouseDivision/getAllDivisionsByWorkspace/${workspaceId}`
      );
      console.log("Divisions response:", res.data);
      return res.data?.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch divisions";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// Get all sources by workspace ID
export const getSourcesByWorkspace = createAsyncThunk(
  "dropdown/getSources",
  async (workspaceId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}source/getAllSourcesByWorkspace/${workspaceId}`
      );
      console.log("Sources response:", res.data);
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch sources";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// Get all service categories (no workspace filter)
export const getAllCategories = createAsyncThunk(
  "dropdown/getCategories",
  async (workspaceId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}serviceCategory/getAllCategories/${workspaceId}`);

      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch categories";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const dropdownSlice = createSlice({
  name: "dropdownSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Divisions
      .addCase(getDivisionsByWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDivisionsByWorkspace.fulfilled, (state, action) => {
        state.loading = false;
        state.divisions = action.payload;
      })
      .addCase(getDivisionsByWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sources
      .addCase(getSourcesByWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSourcesByWorkspace.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
      })
      .addCase(getSourcesByWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dropdownSlice.reducer;
