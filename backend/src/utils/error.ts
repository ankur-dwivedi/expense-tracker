import { Response } from "express";

export const generateError = (err: string = "Something went wrong"): never => {
  throw new Error(err);
};

export const handleErrorResponse = (
  res: Response,
  statusCode: number,
  err: unknown
) => {
  const { name, message } =
    err instanceof Error
      ? err
      : { name: "UnknownError", message: "An unknown error occurred." };

  return res.status(statusCode).json({
    status: "failed",
    message: `err.name: ${name}, err.message: ${message}`,
  });
};
