import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import expenseReducer from "./expense/expenseSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
});

export default rootReducer;
