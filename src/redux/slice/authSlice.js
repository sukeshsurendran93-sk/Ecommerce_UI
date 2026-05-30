import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../thunks/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role")
      ? JSON.parse(localStorage.getItem("role"))
      : null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;

        localStorage.setItem("token", action.payload.token);
        if (action.payload.role) {
          localStorage.setItem("role", JSON.stringify(action.payload.role));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;

        localStorage.setItem("token", action.payload.token);
        if (action.payload.role) {
          localStorage.setItem("role", JSON.stringify(action.payload.role));
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
