import { createSlice } from "@reduxjs/toolkit";
import { ExpenseState } from "./expenseTypes";
import { createExpenseThunk, fetchExpensesThunk, updateExpenseStatusThunk } from "./expenseThunks";

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
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
        state.expenses = action.payload;
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })
      .addCase(updateExpenseStatusThunk.fulfilled, (state, action) => {
        const updatedExpense = action.payload;
        const index = state.expenses.findIndex(e => e._id === updatedExpense._id);
        if (index !== -1) {
          state.expenses[index] = { ...state.expenses[index], ...updatedExpense };
        }
      });
  },
});

export default expenseSlice.reducer;
