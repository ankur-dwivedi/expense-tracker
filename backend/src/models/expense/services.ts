import Expense from ".";
import { generateError } from "../../utils/error";
import { ExpenseDocument, UpdateData } from "./types";
import { FilterQuery } from "mongoose";

export const create = async (expenseData: ExpenseDocument) => {
  return Expense.create({ ...expenseData });
};

export const get = async (
  query: FilterQuery<ExpenseDocument>,
  pageNum: number,
  limitNum: number,
  isAdmin = false
) => {
  const skip = (pageNum - 1) * limitNum;

  let expensesQuery = Expense.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  if (isAdmin) {
    expensesQuery = expensesQuery.populate({
      path: "userId",
      select: "name email",
    });
  }

  const [expenses, totalCount] = await Promise.all([
    expensesQuery.lean(),
    Expense.countDocuments(query),
  ]);

  return {
    expenses,
    totalCount,
  };
};

export const updateExpenseStatus = async (
  data: UpdateData
): Promise<ExpenseDocument> => {
  const updatedExpense = await Expense.findByIdAndUpdate(
    data.expenseId,
    { status: data.status },
    { new: true }
  ).populate("userId", "name email");

  if (!updatedExpense) {
    throw generateError("Expense not found");
  }

  return updatedExpense;
};

export const getAnalyticsService = async (userId?: string, isAdmin = false) => {
  const matchQuery: FilterQuery<ExpenseDocument> = { status: "approved" };

  if (!isAdmin && userId) {
    matchQuery.userId = userId;
  }

  const result = await Expense.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const formatted: Record<string, number> = {};
  for (const entry of result) {
    formatted[entry._id] = entry.totalAmount;
  }

  return formatted;
};
