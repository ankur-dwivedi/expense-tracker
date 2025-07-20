import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '7d',
  });

export const createUnauthorizedError = (error: string = 'Unauthorized') => createError(401, error);