import { generateError } from "../../utils/error";
import Expense, { ExpenseDocument } from ".";
import { STATUS_ENUM } from "./constants";

interface Query {
  userId?: string;
}

interface UpdateData {
  status: (typeof STATUS_ENUM)[number];
  expenseId: string;
}

export const create = async (expenseData: ExpenseDocument) => {
  return Expense.create({ ...expenseData }).then((response) => response);
};

export const get = async (query: Query) => {
  return Expense.find({ userId: query.userId })
    .then((response) => (response ? response : generateError()))
    .catch((error) => error);
};

export const updateExpense = async (data: UpdateData) => {
  return Expense.findOne({ _id: data.expenseId })
    .then((response) => (response ? response : generateError()))
    .catch((error) => error);
};

export const updateExpenseStatus = async (data: UpdateData) => {
  try {
    const expense: ExpenseDocument | null = await Expense.findById(
      data.expenseId
    );
    if (!expense) throw generateError("Expense not found");

    expense.status = data.status;
    await expense.save();

    return expense;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw generateError(err.message || "Failed to update expense status");
    }
    throw generateError("Failed to update expense status");
  }
};
