// src/redux/slices/workspaceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, showToast } from "../../utils/config";

const initialState = {
  workspaces: [],
  loading: false,
  error: null,
};



// Get all workspaces
export const getAllWorkspaces = createAsyncThunk(
  "workspace/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}workspace/getAllWorkspaces`);
      return response.data.result;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch workspaces.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Create a workspace
export const createWorkspace = createAsyncThunk(
  "workspace/create",
  async ({ newWorkspace, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}workspace/createWorkspace`,
        newWorkspace
      );
      showToast("Workspace created successfully", "success");
      thunkAPI.dispatch(getAllWorkspaces());
      navigate("/select-workspace");
      return response.data.result;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Workspace creation failed.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Update a workspace
export const updateWorkspace = createAsyncThunk(
  "workspace/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}workspace/updateWorkspace/${id}`,
        updatedData
      );
      showToast("Workspace updated successfully", "success");
      thunkAPI.dispatch(getAllWorkspaces());
      return response.data.result;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Update failed.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// Delete a workspace
export const deleteWorkspace = createAsyncThunk(
  "workspace/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}workspace/deleteWorkspace/${id}`);
      showToast("Workspace deleted successfully", "success");
      thunkAPI.dispatch(getAllWorkspaces());
      return id;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Delete failed.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaces = action.payload;
      })
      .addCase(getAllWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workspaceSlice.reducer;
