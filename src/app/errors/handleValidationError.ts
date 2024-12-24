import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation error';
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (value) => {
      return {
        path: value.path,
        message: value.message,
      };
    },
  );
  return { statusCode, message, errorSources };
};
export default handleValidationError;
