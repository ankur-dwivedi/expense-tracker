import { Request, Response } from "express";
import {
  create,
  get,
  updateExpenseStatus,
  getAnalyticsService,
} from "../../models/expense/services";
import { AuthedRequest } from "../../models/user/types";
import { handleErrorResponse } from "../../utils/error";

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
  } catch (err: unknown) {
    const { name, message } =
      err instanceof Error
        ? err
        : { name: "UnknownError", message: "An unknown error occurred." };

    return res.status(500).json({
      status: "failed",
      message: `err.name: ${name}, err.message: ${message}`,
    });
  }
};

export const getExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (req as AuthedRequest).user;
    const { category, date, status, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    let query: any = {};

    if (user && user.role !== "admin") {
      query.userId = user._id;
    }

    if (category) query.category = category;
    if (status) query.status = status;
    if (date) {
      const start = new Date(date as string);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date as string);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    const { expenses, totalCount } = await get(
      query,
      pageNum,
      limitNum,
      user?.role === "admin"
    );

    return res.status(200).json({
      status: "success",
      message: "Fetched expenses successfully",
      data: expenses,
      meta: {
        total: totalCount,
        page: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (err: unknown) {
    return handleErrorResponse(res, 500, err);
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId, status } = req.body;

    const updated = await updateExpenseStatus({ expenseId, status });

    return res.status(200).json({
      status: "success",
      message: "Updated expense",
      data: updated,
    });
  } catch (err: unknown) {
    return handleErrorResponse(res, 500, err);
  }
};

export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (req as AuthedRequest).user;
    const analytics = await getAnalyticsService(
      user?._id,
      user?.role === "admin"
    );

    return res.status(200).json({
      status: "success",
      message: "Fetched analytics successfully",
      data: analytics,
    });
  } catch (err: unknown) {
    return handleErrorResponse(res, 500, err);
  }
};
