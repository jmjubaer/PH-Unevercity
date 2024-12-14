import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Faculty Name is required' }),
  }),
});

export const academicFacultyValidations = {
  academicFacultyValidationSchema,
};
