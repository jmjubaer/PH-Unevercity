import mongoose from 'mongoose';
import { TErrorSource } from '../interfaces/error';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const message = 'Validation error';
  const errorSources: TErrorSource = Object.values(error.errors).map(
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