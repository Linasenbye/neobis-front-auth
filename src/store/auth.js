import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";


export const setEmail = createAction('auth/setEmail'); 


const initialState = {
  currentUser: undefined,
  isLoading: false,
  email: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, username, password, confirmPassword }, thunkAPI) => {
    try {
      const response = await axios.post("http://165.22.72.60:8080/api/user/register", {
        email,
        username,
        password,
        confirmPassword,
      });
      thunkAPI.dispatch(setEmail(email)); 
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password}, thunkAPI) => {
    try {
      const response = await axios.post("http://165.22.72.60:8080/api/user/login", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.tokens.access);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setEmail, (state, action) => {
        state.email = action.payload;
      });
  },
});


export default authSlice.reducer;
