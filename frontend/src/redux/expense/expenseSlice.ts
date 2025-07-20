import { createSlice } from "@reduxjs/toolkit";
import { ExpenseState } from "./expenseTypes";
import {
  createExpenseThunk,
  fetchAnalyticsThunk,
  fetchExpensesThunk,
  updateExpenseStatusThunk,
} from "./expenseThunks";

const initialState: ExpenseState = {
  expenses: [],
  meta: { total: 0, page: 1 },
  analytics: {},
  loading: false,
  error: null,
  analyticsLoading: false,
  analyticsError: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Expense
      .addCase(createExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      // Fetch Expenses
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })
      .addCase(updateExpenseStatusThunk.fulfilled, (state, action) => {
        const updatedExpense = action.payload;
        const index = state.expenses.findIndex(
          (e) => e._id === updatedExpense._id
        );
        if (index !== -1) {
          state.expenses[index] = {
            ...state.expenses[index],
            ...updatedExpense,
          };
        }
      })

      // fetch analytics
      .addCase(fetchAnalyticsThunk.pending, (state) => {
        state.analyticsLoading = true;
        state.analyticsError = null;
      })
      .addCase(fetchAnalyticsThunk.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalyticsThunk.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.analyticsError = action.payload || "Error";
      });
  },
});

export default expenseSlice.reducer;
