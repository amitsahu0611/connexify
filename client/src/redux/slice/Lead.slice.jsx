// src/redux/slices/leadSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, showToast } from "../../utils/config";

const initialState = {
  leads: [],
  importedLeads: [],
  leadDetail: null,
  loading: false,
  error: null,
};

export const createLead = createAsyncThunk(
  "lead/create",
  async (leadData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}lead/createLead`, leadData);
      showToast("Lead created successfully", "success");
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Create lead failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getLeadsByWorkspace = createAsyncThunk(
  "lead/getByWorkspace",
  async (workspaceId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}lead/getAllLeadByWorkspaceId/${workspaceId}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch leads";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getLeadById = createAsyncThunk(
  "lead/getById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}lead/getLeadById/${id}`);
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch lead";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getImportedLeads = createAsyncThunk(
  "lead/getImported",
  async (workspaceId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}lead/getallImportedLeads/${workspaceId}`
      );
      
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to fetch imported leads";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);



export const uploadBulkLeads = createAsyncThunk(
  "lead/bulkUpload",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}lead/bulk-upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Bulk leads uploaded successfully", "success");
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Bulk upload failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const addAttachment = createAsyncThunk(
  "lead/addAttachment",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}lead/addAttachment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Attachment uploaded successfully", "success");
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Attachment upload failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Lead
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.push(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Leads By Workspace
      .addCase(getLeadsByWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadsByWorkspace.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(getLeadsByWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Lead By ID
      .addCase(getLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.leadDetail = action.payload;
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Imported Leads
      .addCase(getImportedLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImportedLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.importedLeads = action.payload;
      })
      .addCase(getImportedLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Bulk Leads
      .addCase(uploadBulkLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBulkLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = [...state.leads, ...action.payload];
      })
      .addCase(uploadBulkLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Attachment
      .addCase(addAttachment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAttachment.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming you want to update leadDetail with new attachment (adjust as needed)
        state.leadDetail = {
          ...state.leadDetail,
          attachments: [
            ...(state.leadDetail?.attachments || []),
            action.payload,
          ],
        };
      })
      .addCase(addAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
