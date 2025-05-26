import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, showToast } from "../../utils/config";

const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
};

export const loginApi = createAsyncThunk(
  "auth/login",
  async ({ newData, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}user/login`, newData);
      const { status, message, result } = response.data || {};

      // ✅ If login failed
      if (status !== 1 || !result) {
        showToast(message || "Login failed", "error");
        return thunkAPI.rejectWithValue({
          error: message || "Login failed. Please check your credentials.",
        });
      }

      const { token, user } = result;

      // ✅ Store token and user info in localStorage
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("workspace_id", user.workspace_id);

        console.log("Logged-in user:", user);

        // ✅ Navigate based on role
        if (typeof navigate === "function") {
          if (user.role_id === 0) {
            navigate("/workspace");
          } else {
            navigate("/dashboard");
          }
        }

        showToast(message || "Login successful", "success");
        return { token, user };
      } else {
        showToast("Invalid login response. Please try again.", "error");
        return thunkAPI.rejectWithValue({
          error: "Invalid login response. Please try again.",
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      showToast(errorMsg, "error");
      return thunkAPI.rejectWithValue({ error: errorMsg });
    }
  }
);

const Auth_slice = createSlice({
  name: "Auth_slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logout } = Auth_slice.actions;

export default Auth_slice.reducer;
