import { Request, Response } from "express";

// Error response structure
function ErrorHandler(err: any) {
  return {
    message: err.message || 'An error occurred',
    success: false,
    error: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };
}
const ErrorHandlerdf = (err: any, req: Request, res: Response) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export default ErrorHandler;
