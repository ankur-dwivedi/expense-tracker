import { Router } from "express";
import { createExpense, getAnalytics, getExpense, updateExpense } from "./controller";
const { validate } = require("../../middlewares/schema");
const {
  createExpenseContract,
  getExpenseContract,
  updateExpenseContract,
} = require("./contract");
import { requireAdmin, withAuthUser } from "../../middlewares/auth";

const expense: Router = Router();

expense.post(
  "/",
  withAuthUser,
  validate("body", createExpenseContract),
  createExpense
);
expense.get(
  "/",
  withAuthUser,
  validate("query", getExpenseContract),
  getExpense
);
expense.patch(
  "/",
  withAuthUser,
  requireAdmin,
  validate("body", updateExpenseContract),
  updateExpense
);

expense.get("/analytics", withAuthUser, getAnalytics);

export default expense;
