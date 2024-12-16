import { z } from 'zod';
import { Months } from './academicsemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Name is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }),
    year: z.string({ required_error: 'Year is required' }),
    startMonth: z.enum([...Months] as [string], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...Months] as [string], {
      required_error: 'End Month is required',
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(['Autumn', 'Summer', 'Fall'], {
        required_error: 'Name is required',
      })
      .optional(),
    code: z
      .enum(['01', '02', '03'], {
        required_error: 'Code is required',
      })
      .optional(),
    year: z.string({ required_error: 'Year is required' }).optional(),
    startMonth: z
      .enum([...Months] as [string], {
        required_error: 'Start Month is required',
      })
      .optional(),
    endMonth: z
      .enum([...Months] as [string], {
        required_error: 'End Month is required',
      })
      .optional(),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
