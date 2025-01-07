import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be a string' })
    .max(20, { message: 'password not be more than 20 characters' })
    .optional(),
});
const statusChangeValidationSchema = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked']),
  }),
});
export const userValidations = {
  userValidationSchema,
  statusChangeValidationSchema,
};
