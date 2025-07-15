import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

export const errorHandlerMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.status || 500)
    .json({ error: { message: error.message } });
};
