import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';

/**
 * Handles errors that occur during the execution of the app.
 * If the error is an ApiError, it sends the error message and status code.
 * If the error is not an ApiError, it sends a default 'Internal server error' message with a 500 status code.
 * @param err The error that was thrown.
 * @param _req The express request object. Not used.
 * @param res The express response object.
 * @param _next The express next function. Not used.
 */

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = err instanceof ApiError ? err : new ApiError('Internal server error', 500);
  console.log('error:', error)

  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
  });
};

