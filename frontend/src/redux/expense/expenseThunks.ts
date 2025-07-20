import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Expense } from "./expenseTypes";
import { RootState } from "../store";

const API_URL = `${process.env.REACT_APP_API_URL}/expense`; // adjust as needed

export const createExpenseThunk = createAsyncThunk<
  Expense,
  Expense,
  { state: RootState; rejectValue: string }
>("expenses/create", async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add expense"
    );
  }
});

export const fetchExpensesThunk = createAsyncThunk<
  { data: Expense[]; meta: { total: number; page: number } },
  {
    category?: string;
    date?: string;
    status?: string;
    page?: number;
    limit?: number;
  },
  { state: RootState; rejectValue: string }
>("expenses/fetch", async (filters, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(API_URL, {
      params: filters,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data.data, meta: response.data.meta };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch expenses"
    );
  }
});

export const updateExpenseStatusThunk = createAsyncThunk<
  Expense,
  { expenseId: string; status: string },
  { state: RootState; rejectValue: string }
>(
  "expenses/updateStatus",
  async ({ expenseId, status }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.patch(
        API_URL,
        { expenseId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);

export const fetchAnalyticsThunk = createAsyncThunk<
  Record<string, number>,
  void,
  { state: RootState; rejectValue: string }
>("expenses/fetchAnalytics", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`${API_URL}/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch analytics"
    );
  }
});
