import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload } from "./authTypes";
import axios from "axios";

export const loginThunk = createAsyncThunk(
  "auth",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/auth`, { email, password });
      return {
        user: response.data.data,
        accessToken: response.data.data.accessToken,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
