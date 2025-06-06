/** @format */

// src/redux/slices/TeamSlice.jsx
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {API_URL, showToast} from "../../utils/config";

const initialState = {
  users: [],
  userDetail: null,
  loading: false,
  error: null,
  workspaceManagers: [],
};

// Create new team member
export const createTeamMember = createAsyncThunk(
  "team/create",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}user/createUser`, userData);
      showToast("User created successfully", "success");
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "User creation failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// Get all team members
export const getAllUsers = createAsyncThunk(
  "team/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}user/getAllUsers`);
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch users";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "team/updateUser",
  async (userData, thunkAPI) => {
    const {user_id} = userData;
    console.log("Updating user with ID:", user_id);
    try {
      const res = await axios.post(
        `${API_URL}user/updateUser/${user_id}`,
        userData
      );
      showToast("User updated successfully", "success");
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "User update failed";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  "team/getById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}user/getUserById/${id}`);
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch user";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getAllManagersByWorkspaceId = createAsyncThunk(
  "team/getAllManagersByWorkspaceId",
  async (thunkAPI) => {
    try {
      const workspaceId = localStorage.getItem("workspace_id");
      const res = await axios.get(
        `${API_URL}user/getAllManager/${workspaceId}`
      );
      return res.data.result;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch managers";
      showToast(msg, "error");
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Team Member
      .addCase(createTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Workspace Managers
      .addCase(getAllManagersByWorkspaceId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllManagersByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceManagers = action.payload;
      })
      .addCase(getAllManagersByWorkspaceId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User by ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
