import { Request, Response } from "express";
import {
  create,
  get,
  updateExpenseStatus,
} from "../../models/expense/services";
import { UserDocument } from "../../models/user";
import Expense from "../../models/expense";

interface AuthedRequest extends Request {
  user?: UserDocument;
}
export const createExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (req as AuthedRequest).user;
    await create({ ...req.body, userId: user?._id });
    return res.status(201).json({
      status: "success",
      message: "Successfully created an expense",
    });
  } catch (err: any) {
    return res.status(406).json({
      status: "failed",
      message: `err.name : ${err.name}, err.message:${err.message}`,
    });
  }
};

export const getExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (req as AuthedRequest).user;
    const { category, date } = req.query;

    let query: any = {};

    // If not admin, filter by userId
    if (user && user.role !== "admin") {
      query.userId = user._id;
    }

    // Apply category filter if present
    if (category) {
      query.category = category;
    }

    // Apply date filter if present
    if (date) {
      const start = new Date(date as string);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date as string);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    let expensesQuery = Expense.find(query);

    if (user && user.role === "admin") {
      expensesQuery = expensesQuery.populate({
        path: "userId",
        select: "name email",
      });
    }

    const expenses = await expensesQuery.lean();
    return res.status(200).json({
      status: "success",
      message: "Fetched expenses successfully",
      data: expenses,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: "failed",
      message: `err.name: ${err.name}, err.message: ${err.message}`,
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId, status } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      expenseId,
      { status },
      { new: true }
    ).populate("userId", "name email");

    if (!updated) {
      return res.status(404).json({
        status: "failed",
        message: "Expense not found",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Updated expense",
      data: updated,
    });
  } catch (err: any) {
    return res.status(406).json({
      status: "failed",
      message: `err.name: ${err.name}, err.message: ${err.message}`,
    });
  }
};
