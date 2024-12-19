import { ZodError } from 'zod';
import { TErrorSource } from '../interfaces/error';

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const message = 'Validation error';
  const errorSources: TErrorSource = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return { statusCode, message, errorSources };
};

export default handleZodError;
