import Expense, { ExpenseDocument } from ".";
import { STATUS_ENUM } from "./constants";
import { generateError } from "../../utils/error";

interface Query {
  userId?: string;
  date?: string;
  category?: string;
  status?: (typeof STATUS_ENUM)[number];
}

interface UpdateData {
  status: (typeof STATUS_ENUM)[number];
  expenseId: string;
}

export const create = async (expenseData: ExpenseDocument) => {
  return Expense.create({ ...expenseData });
};

export const get = async (
  query: any,
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

export const updateExpense = async (data: UpdateData) => {
  return Expense.findOne({ _id: data.expenseId })
    .then((response) => (response ? response : generateError()))
    .catch((error) => error);
};

export const updateExpenseStatus = async (data: UpdateData) => {
  const expense: ExpenseDocument | null = await Expense.findById(
    data.expenseId
  );
  if (!expense) throw generateError("Expense not found");

  expense.status = data.status;
  await expense.save();

  return expense;
};

export const getAnalyticsService = async (userId?: string, isAdmin = false) => {
  const matchQuery: any = { status: "approved" };

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
