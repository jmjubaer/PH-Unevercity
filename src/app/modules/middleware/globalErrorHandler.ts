/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import { TErrorSource } from '../../interfaces/error';
import handleZodError from '../../errors/handleZodError';
import handleValidationError from '../../errors/handleValidationError';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const formattedError = handleZodError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const formattedError = handleValidationError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack: config.NODE_ENV === 'Development' ? error?.stack : null,
  });
};
