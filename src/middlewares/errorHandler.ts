import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(`[Error] ${statusCode} - ${message}`);
  if (err.stack) console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
