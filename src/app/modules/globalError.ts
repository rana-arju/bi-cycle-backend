/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

// Generic error handler middleware
export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Determine the status code
  const statusCode = err.status || 500;

  // Build the error response
  const errorResponse = {
    message: err.message || 'Validation failed',
    success: false,
    error: processError(err),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Only include stack in development
  };

  // Send the response
  res.status(statusCode).json(errorResponse);
  
};

// Helper function to process error details
const processError = (err: any) => {
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    return {
      name: err.name,
      errors: Object.entries(err.errors).reduce(
        (acc, [key, value]: [string, any]) => {
          acc[key] = {
            message: value.message,
            name: value.name,
            properties: value.properties,
            kind: value.kind,
            path: value.path,
            value: value.value,
          };
          return acc;
        },
        {} as Record<string, any>,
      ),
    };
  } else if (err.name === 'CastError') {
    // Mongoose cast error
    return {
      name: err.name,
      path: err.path,
      value: err.value,
      kind: err.kind,
      reason: err.reason || 'Invalid data type',
    };
  }

  // Generic error
  return {
    name: err.name || 'Error',
    message: err.message || 'Something went wrong!',
  };
};


